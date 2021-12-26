# Send CALL

This tutorial explains how to send a simple CALL Payment using CallAPI for JavaScript. First, we step through the process with the CALL Test Net. Then, we compare that to the additional requirements for doing the equivalent in production.

## Prerequisites

- This page provides JavaScript examples that use the call-lib (CallAPI) library version 1.1.2. The [CallAPI Beginners Guide](get-started-with-callapi-for-javascript.html) describes how to get started using CallAPI to access CALL Ledger data from JavaScript.

- To send transactions in the CALL Ledger, you first need an address and secret key, and some CALL. You can get an address in the CALL Test Net with a supply of Test Net CALL using the following interface:

**Caution:** Call operates the CALL Test Net for testing purposes only, and regularly resets the state of the test net along with all balances. As a precaution, Call recommends **not** using the same addresses on the test net and production.


## Send a Payment on the Test Net

### Connect to a Test Net Server

To provide the necessary auto-fillable fields, call-lib must be connected to a server where it can get the current status of your account and the shared ledger itself. (For more security, you should sign transactions while being offline, but you must provide the auto-fillable fields manually if you do so.) You must be connected to the network to submit transactions to it.

The following code sample instantiates a new CallAPI instance and connects to one of the public CALL Test Net servers that Call runs:

```js
call = require('call-lib')
api = new call.CallAPI({server: 'wss://s1.callchain.live:5020'})
api.connect()
```


### Prepare Transaction

Typically, we create CALL Ledger transactions as objects in the JSON [transaction format](transaction-formats.html). The following example shows a minimal Payment specification:

```json
{
  "TransactionType": "Payment",
  "account": "cPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
  "Amount": "2000000",
  "Destination": "cUCzEr6jrEyMpjhs4wSdQdz4g8Y382NxfM"
}
```

The bare minimum set of instructions you must provide for an CALL Payment is:

- An indicator that this is a payment. (`"TransactionType": "Payment"`)
- The sending address. (`"Account"`)
- The address that should receive the CALL (`"Destination"`). This can't be the same as the sending address.
- The amount of CALL to send (`"Amount"`). Typically, this is specified as an integer in "drops" of CALL, where 1,000,000 drops equals 1 CALL.

Technically, a viable transaction must contain some additional fields, and certain optional fields such as `LastLedgerSequence` are strongly recommended. The [`prepareTransaction()` method](callapi-reference.html#preparetransaction) automatically fills in good defaults for the remaining fields of a transaction. Here's an example of preparing the above payment:

```js
// Continuing after connecting to the API
async function doPrepare() {
  const sender = "cPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe"
  const preparedTx = await api.prepareTransaction({
    "TransactionType": "Payment",
    "Account": sender,
    "Amount": api.callToDrops("22"), // Same as "Amount": "22000000"
    "Destination": "cUCzEr6jrEyMpjhs4wSdQdz4g8Y382NxfM"
  }, {
    // Expire this transaction if it doesn't execute within ~5 minutes:
    "maxLedgerVersionOffset": 75
  })
  const maxLedgerVersion = preparedTx.instructions.maxLedgerVersion
  console.log("Prepared transaction instructions:", preparedTx.txJSON)
  console.log("Transaction cost:", preparedTx.instructions.fee, "CALL")
  console.log("Transaction expires after ledger:", maxLedgerVersion)
  return preparedTx.txJSON
}
txJSON = doPrepare()
```


### Sign the Transaction Instructions

Use the [sign() method](callapi-reference.html#sign) to sign the transaction with CallAPI. The first argument is a string version of the JSON transaction to sign.

```js
// Continuing from the previous step...
const response = api.sign(txJSON, "s████████████████████████████")
const txID = response.id
console.log("Identifying hash:", txID)
const txBlob = response.signedTransaction
console.log("Signed blob:", txBlob)
```

The result of the signing operation is a transaction object containing a signature. Typically, CALL Ledger APIs expect a signed transaction to be the hexadecimal representation of the transaction's canonical [binary format](serialization.html), called a "blob".

The signing API also returns the transaction's ID, or identifying hash, which you can use to look up the transaction later. This is a 64-character hexadecimal string that is unique to this transaction.


### Submit the Signed Blob

Use the [submit() method](callapi-reference.html#submit) to submit a transaction to the network. It's also a good idea to use the [getLedgerVersion() method](callapi-reference.html#getledgerversion) to take note of the latest validated ledger index before you submit. The earliest ledger version that your transaction could get into as a result of this submission is one higher than the latest validated ledger when you submit it.

Of course, if the same transaction was previously submitted, it could already be in a previous ledger. (It can't succeed a second time, but you may not realize it succeeded if you aren't looking in the right ledger versions.)

```js
// use txBlob from the previous example
async function doSubmit(txBlob) {
  const latestLedgerVersion = await api.getLedgerVersion()

  const result = await api.submit(txBlob)

  console.log("Tentative result code:", result.resultCode)
  console.log("Tentative result message:", result.resultMessage)

  // Return the earliest ledger index this transaction could appear in
  // as a result of this submission, which is the first one after the
  // validated ledger at time of submission.
  return latestLedgerVersion + 1
}
const earliestLedgerVersion = doSubmit(txBlob)
```

This method returns the **tentative** result of trying to apply the transaction locally. This result _can_ change when the transaction is included in a validated ledger: transactions that succeed initially might ultimately fail, and transactions that fail initially might ultimately succeed. Still, the tentative result often matches the final result, so it's OK to get excited if you see `tesSUCCESS` here. 😁

If you see any other result, you should check the following:

- Are you using the correct addresses for the sender and destination?
- Did you forget any other fields of the transaction, skip any steps, or make any other typos?
- Do you have enough Test Net CALL to send the transaction? The amount of CALL you can send is limited by the [reserve requirement](reserves.html), which is currently 20 CALL with an additional 5 CALL for each "object" you own in the ledger. (If you generated a new address with the Test Net Faucet, you don't own any objects.)
- Are you connected to a server on the test network?

See the full list of [transaction results](transaction-results.html) for more possibilities.


### Wait for Validation

Most transactions are accepted into the next ledger version after they're submitted, which means it may take 4-7 seconds for a transaction's outcome to be final. If the CALL Ledger is busy or poor network connectivity delays a transaction from being relayed throughout the network, a transaction may take longer to be confirmed. (For information on how to set an expiration for transactions, see [Reliable Transaction Submission](reliable-transaction-submission.html).)

You use the `ledger` event type in CallAPI to trigger your code to run whenever there is a new validated ledger version. For example:

```js
api.on('ledger', ledger => {
  console.log("Ledger version", ledger.ledgerVersion, "was just validated.")
  if (ledger.ledgerVersion > maxLedgerVersion) {
    console.log("If the transaction hasn't succeeded by now, it's expired")
  }
})
```

### Check Transaction Status

To know for sure what a transaction did, you must look up the outcome of the transaction when it appears in a validated ledger version. For example, you can use the [getTransaction() method](callapi-reference.html#gettransaction) to check the status of a transaction:

```js
// Continues from previous examples.
// earliestLedgerVersion was noted when the transaction was submitted.
// txID was noted when the transaction was signed.
try {
  tx = await api.getTransaction(txID, {minLedgerVersion: earliestLedgerVersion})
  console.log("Transaction result:", tx.outcome.result)
  console.log("Balance changes:", JSON.stringify(tx.outcome.balanceChanges))
} catch(error) {
  console.log("Couldn't get transaction outcome:", error)
}

```

The CallAPI `getTransaction()` method only returns success if the transaction is in a validated ledger version. Otherwise, the `await` expression raises an exception.

**Caution:** Other APIs may return tentative results from ledger versions that have not yet been validated. For example, if you use the `calld` APIs' [tx method][], be sure to look for `"validated": true` in the response to confirm that the data comes from a validated ledger version. Transaction results that are not from a validated ledger version are subject to change. For more information, see [Finality of Results](finality-of-results.html).


## Differences for Production

To send an CALL payment on the production CALL Ledger, the steps you take are largely the same. However, there are some key differences in the necessary setup:

- [Getting real CALL isn't free.](#getting-a-real-call-account)
- [You must connect to a server that's synced with the production CALL Ledger network.](#connecting-to-the-production-call-ledger)

### Getting a Real CALL Account

This tutorial uses a button to get an address that's already funded with Test Net CALL, which only works because Test Net CALL is not worth anything. For actual CALL, you need to get CALL from someone who already has some. (For example, you might buy it on an exchange.) You can generate an address and secret that'll work on either production or the test net using CallAPI's [generateAddress() method](callapi-reference.html#generateaddress):

```js
const generated = api.generateAddress()
console.log(generated.address) // Example: rGCkuB7PBr5tNy68tPEABEtcdno4hE6Y7f
console.log(generated.secret) // Example: sp6JS7f14BuwFY8Mw6bTtLKWauoUs
```

**Warning:** You should only use an address and secret that you generated securely, on your local machine. If another computer generated the address and secret and sent it to you over a network, it's possible that someone else on the network may see that information. If they do, they'll have as much control over your CALL as you do. It's also recommended not to use the same address for the test net and for production, because transactions that you created for use on one network could potentially also be viable on the other network, depending on the parameters you provided.

Generating an address and secret doesn't get you CALL directly; it's just choosing a random number. You must also receive CALL at that address to [fund the account](accounts.html#creating-accounts). A common way to acquire CALL is to buy it from an exchange, then withdraw it to your own address. For more information, see Call's [CALL Buying Guide](https://callchain.cip/call/buy-call/).

### Connecting to the Production CALL Ledger

When you instantiate the `CallAPI` object, you must specify a server that's synced with the appropriate CALL Ledger. For many cases, you can use Call's public servers, such as in the following snippet:

```js
call = require('call-lib')
api = new call.CallAPI({server: 'wss://s1.callchain.live:5020'})
api.connect()
```

If you [install `calld`](install-calld.html) yourself, it connects to the production network by default. (You can also [configure it to connect to the test net](connect-your-calld-to-the-call-test-net.html) instead.) After the server has synced (typically within about 15 minutes of starting it up), you can connect CallAPI to it locally, which has [various benefits](calld-server-modes.html#reasons-to-run-a-stock-server). The following example shows how to connect CallAPI to a server running the default configuration:

```js
call = require('call-lib')
api = new call.CallAPI({server: 'ws://localhost:6006'})
api.connect()
```

**Tip:** The local connection uses the WebSocket protocol (`ws`) unencrypted rather than the TLS-encrypted version (`wss`). This is secure only because the communications never leave the same machine, and is easier to set up because it does not require a TLS certificate. For connections on an outside network, always use `wss`.

## Next Steps

After completing this tutorial, you may want to try the following:

- Build [Reliable transaction submission](reliable-transaction-submission.html) for production systems.
- Consult the [CallAPI JavaScript Reference](callapi-reference.html) for the full range of CALL Ledger functionality.
- Customize your [Account Settings](manage-account-settings.html).
- Learn how [Transaction Metadata](transaction-metadata.html) describes the outcome of a transaction in detail.
- Explore [Complex Payment Types](complex-payment-types.html) like escrow and payment channels.
- Read best practices for [CALL Ledger Businesses](call-ledger-businesses.html).

