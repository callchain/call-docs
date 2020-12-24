# Accounts

An "Account" in the CALL Ledger represents a holder of CALL and a sender of [transactions](transaction-formats.html). The core elements of an account are:

- An identifying **address**, such as `cJtexLRdChH7uYcFYMVQs4uRX7XxgVCkQX`
- An **CALL balance**. Some of this CALL is set aside for the [Reserve](reserves.html).
- A **sequence number**, starting at 1 and increasing with each transaction sent from this account. No transaction can be included in a ledger unless the transaction's sequence number matches its sender's next sequence number.
- A **history of transactions** that affected this account and its balances.
- One or more ways to [authorize transactions](transaction-basics.html#authorizing-transactions), possibly including:
    - A master key pair intrinsic to the account. (This can be [disabled](accountset.html) but not changed.)
    - A "regular" key pair that [can be rotated](setregularkey.html).
    - A signer list for [multi-signing](multi-signing.html). (Stored separately from the account's core data.)


In the ledger's data tree, an account's core data is stored in the [AccountRoot](accountroot.html) ledger object type. An account can also be the owner (or partial owner) of several other types of data.

**Tip:** An "Account" in the CALL Ledger is somewhere between the financial usage (like "bank account") and the computing usage (like "UNIX account"). Non-CALL currencies and assets aren't stored in an CALL Ledger Account itself; each such asset is stored in an accounting relationship called a "Trust Line" that connects two parties.

### Creating Accounts

There is not a dedicated "create account" transaction. The [Payment transaction][] automatically creates a new account if the payment sends CALL equal to or greater than the [account reserve](reserves.html) to a mathematically-valid address that does not already have an account. This is called _funding_ an account, and creates an [AccountRoot object](accountroot.html) in the ledger. No other transaction can create an account.

**Caution:** Funding an account **does not** give you any special privileges over that account. Whoever has the secret key corresponding to the account's address has full control over the account and all CALL it contains. For some addresses, it's possible that no one has the secret key, in which case the account is a [black hole](#special-addresses) and the CALL is lost forever.

The typical way to get an account in the CALL Ledger is as follows:

1. Generate a key pair from a strong source of randomness and calculate the address of that key pair. (For example, you can use the [wallet_propose method][] to do this.)

2. Have someone who already has an account in the CALL Ledger send CALL to the address you generated.

    - For example, you can purchase CALL in a private exchange, then withdraw CALL from the exchange to the address you specified.

        **Caution:** The first time you receive CALL at your own CALL Ledger address, you must pay the [account reserve](reserves.html) (currently 0.01 CALL), which locks up that amount of CALL indefinitely. In contrast, private exchanges usually hold all their customers' CALL in a few shared CALL Ledger accounts, so customers don't have to pay the reserve for individual accounts at the exchange. Before withdrawing, consider whether having your own account directly on the CALL Ledger is worth the price.

## Addresses

{% include '_snippets/data_types/address.md' %}

Any valid address can [become an account in the CALL Ledger](#creating-accounts) by being funded. You can also use an address that has not been funded to represent a [regular key](setregularkey.html) or a member of a [signer list](multi-signing.html). Only a funded account can be the sender of a transaction.

Creating a valid address is a strictly mathematical task starting with a key pair. You can generate a key pair and calculate its address entirely offline without communicating to the CALL Ledger or any other party. The conversion from a public key to an address involves a one-way hash function, so it is possible to confirm that a public key matches an address but it is impossible to derive the public key from the address alone. (This is part of the reason why signed transactions include the public key _and_ the address of the sender.)

For more technical details of how to calculate an CALL Ledger address, see [Address Encoding](#address-encoding).


### Special Addresses

Some addresses have special meaning, or historical uses, in the CALL Ledger. In many cases, these are "black hole" addresses, meaning the address is not derived from a known secret key. Since it is effectively impossible to guess a secret key from only an address, any CALL possessed by black hole addresses is lost forever.

| Address                     | Name | Meaning | Black Hole? |
|-----------------------------|------|---------|-------------|
| ccccccccccccccccccccchoLvTp | ACCOUNT\_ZERO | An address that is the CALL Ledger's [base58][] encoding of the value `0`. In peer-to-peer communications, `calld` uses this address as the issuer for CALL. | Yes |
| ccccccccccccccccccccBZbvji  | ACCOUNT\_ONE | An address that is the CALL Ledger's [base58][] encoding of the value `1`. In the ledger, [CallState entries](callstate.html) use this address as a placeholder for the issuer of a trust line balance. | Yes |
| cHb9CJAWyB4cj91VRWn96DkukG4bwdtyTh | The genesis account | When `calld` starts a new genesis ledger from scratch (for example, in stand-alone mode), this account holds all the CALL. This address is generated from the seed value "masterpassphrase" which is [hard-coded](https://github.com/callchain/call-lib/blob/94ed5b3a53077d815ad0dd65d490c8d37a147361/src/call/app/ledger/Ledger.cpp#L184). | No |
| cccccccccccccccccNAMEtxvNvQ | Call Name reservation black-hole | In the past, Call asked users to send CALL to this account to reserve Call Names.| Yes |
| cccccccccccccccccccn5RM1cHd | NaN Address | Previous versions of [call-lib](https://github.com/callchain/call-lib) generated this address when encoding the value [NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN) using the CALL Ledger's [base58][] string encoding format. | Yes |


## Permanence of Accounts

Once created, an account exists in the CALL Ledger's data tree forever. This is because the current sequence number for a transaction must be tracked forever, so that old transactions cannot be processed a second time.

Unlike Bitcoin and many other crypto-currencies, each new version of the CALL Ledger's public ledger chain contains the full state of the ledger, which increases in size with each new account. For that reason, Call discourages creating new accounts unless entirely necessary. Institutions who send and receive value on behalf of many users can use [**Source Tags** and **Destination Tags**](become-an-call-ledger-gateway.html#source-and-destination-tags) to distinguish payments from and to their customers while only using one (or a handful) of accounts in the CALL Ledger.

You cannot spend or transfer the [reserve requirement](reserves.html) of 0.01 CALL, so this amount is locked up with each new account. (This CALL _can_ be destroyed to pay for [transaction costs](transaction-cost.html) but cannot be sent to other accounts.) If the reserve requirement were to decrease, some of that CALL could become available again. For more information on how the reserve requirement could change, see [Fee Voting](fee-voting.html).


## Transaction History

In the CALL Ledger, transaction history is tracked by a "thread" of transactions linked by a transaction's identifying hash and the ledger index. The `AccountRoot` ledger object has the identifying hash and ledger of the transaction that most recently modified it; the metadata of that transaction includes the previous state of the `AccountRoot` node, so it is possible to iterate through the history of a single account this way. This transaction history includes any transactions that modify the `AccountRoot` node directly, including:

- Transactions sent by the account, because they modify the account's `Sequence` number. These transactions also modify the account's CALL balance because of the [transaction cost](transaction-cost.html).
- Transactions that modified the account's CALL balance, including incoming [Payment transactions][] and other types of transactions such as [OfferCreate][].

The _conceptual_ transaction history of an account also includes transactions that modified the account's owned objects and non-CALL balances. These objects are separate ledger objects, each with their own thread of transactions that affected them. If you have an account's full ledger history, you can follow it forward to find the ledger objects created or modified by it. A "complete" transaction history includes the history of objects owned by a transaction, such as:

- `IssueSet` objects (Issue Set) created by the account.
- `CallState` objects (Trust Lines) connected to the account.
- `Invoice` non fungible crypto assets created by the account.
- `DirectoryNode` objects, especially the owner directory tracking the account's owned objects.
- `SignerList` objects, representing lists of addresses that can authorize transactions for the account by [multi-signing](multi-signing.html).
- `Offer` objects, representing the account's outstanding currency-exchange orders in the decentralized exchange.
- `Param` objects created in account code execution.


For more information on each of these objects, see the [Ledger Format Reference](ledger-data-formats.html).


## Address Encoding

**Tip:** These technical details are only relevant for people building low-level library software for CALL Ledger compatibility!

[[Source]<br>](https://github.com/callchain/call-lib/blob/35fa20a110e3d43ffc1e9e664fc9017b6f2747ae/src/call/protocol/impl/AccountID.cpp#L109-L140 "Source")

CALL Ledger addresses are encoded using [base58](https://en.wikipedia.org/wiki/Base58) with the Call _dictionary_: `cpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2brdeCg65jkm8oFqi1tuvAxyz`. Since the CALL Ledger encodes several types of keys with base58, it prefixes the encoded data with a one-byte "type prefix" (also called a "version prefix") to distinguish them. The type prefix causes addresses to usually start with different letters in base58 format.

The following diagram shows the relationship between keys and addresses:

![Passphrase → Secret Key → Public Key + Type Prefix → Account ID + Checksum → Address](img/key-address-rels.png)

The formula for calculating an CALL Ledger address is as follows. For the complete example code, see [`encode_address.js`](https://github.com/callchain/call-dev-portal/blob/master/content/_code-samples/address_encoding/encode_address.js).

1. Import required algorithms: SHA-256, RIPEMD160, and base58. Set the dictionary for base58.

        'use strict';
        const assert = require('assert');
        const crypto = require('crypto');
        const R_B58_DICT = 'cpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2brdeCg65jkm8oFqi1tuvAxyz';
        const base58 = require('base-x')(R_B58_DICT);

        assert(crypto.getHashes().includes('sha256'));
        assert(crypto.getHashes().includes('ripemd160'));

2. Start with a 33-byte ECDSA secp256k1 public key, or a 32-byte Ed25519 public key. For Ed25519 keys, prefix the key with the byte `0xED`.

        const pubkey_hex =
          'ED9434799226374926EDA3B54B1B461B4ABF7237962EAE18528FEA67595397FA32';
        const pubkey = Buffer.from(pubkey_hex, 'hex');
        assert(pubkey.length == 33);

3. Calculate the [RIPEMD160](https://en.wikipedia.org/wiki/RIPEMD) hash of the SHA-256 hash of the public key. This value is the "Account ID".

        const pubkey_inner_hash = crypto.createHash('sha256').update(pubkey);
        const pubkey_outer_hash = crypto.createHash('ripemd160');
        pubkey_outer_hash.update(pubkey_inner_hash.digest());
        const account_id = pubkey_outer_hash.digest();

4. Calculate the SHA-256 hash of the SHA-256 hash of the Account ID; take the first 4 bytes. This value is the "checksum".

        const address_type_prefix = Buffer.from([0x00]);
        const payload = Buffer.concat([address_type_prefix, account_id]);
        const chksum_hash1 = crypto.createHash('sha256').update(payload).digest();
        const chksum_hash2 = crypto.createHash('sha256').update(chksum_hash1).digest();
        const checksum =  chksum_hash2.slice(0,4);

5. Concatenate the payload and the checksum. Calculate the base58 value of the concatenated buffer. The result is the address.

        const dataToEncode = Buffer.concat([payload, checksum]);
        const address = base58.encode(dataToEncode);
        console.log(address);
        // cDTXLQ7ZKZVKz33zJbHjgVShjsBnqMBhmN

<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}			
{% include '_snippets/tx-type-links.md' %}			
{% include '_snippets/calld_versions.md' %}
