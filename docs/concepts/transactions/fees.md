# Fees

The CALL Ledger is a decentralized ledger, secured by cryptography and operated by a distributed peer-to-peer network of servers. This means that no one party, not even Call, can require a fee for access to the network.

However, the rules of the CALL Ledger include several types of fees, including neutral fees which protect the ledger against abuse. These neutral fees are not paid to anyone. There are also several optional ways that users can collect fees from each other, both inside and outside the CALL Ledger.

## Fee Pool

CALL Ledger collects transaction cost fee to fee pool. Now the fee pool is only collecting, and the fee will be used for blockchain development of next round. Public blockchain is not profitable, so it should find one way to survive, the transaction fee is the only way. Each ledger contains fee that is collected from startup, and stored in [FeeRoot](feeroot.html) ledger objects.


## In the Ledger

### Neutral Fees

The _**transaction cost**_ (sometimes called the transaction fee) is a miniscule amount of CALL paid to send a transaction. This cost scales with the load of the network, which protects the peer-to-peer network from spam. See [Transaction Cost](transaction-cost.html) for more information.

The _**reserve requirement**_ is a minimum amount of CALL that an account must hold. It increases with the number of objects the account owns in the ledger. This disincentivizes users from increasing the size of the ledger carelessly or maliciously. See [Reserves](reserves.html) for more information.

### Optional Fees

_**Transfer fees**_ are optional percentage fees that issuers can charge to transfer the currencies they issue to other addresses within the CALL Ledger. See [Transfer Fees](transfer-fees.html) for more information.

<!-- _**Trust line quality**_ is a setting that allows an account to value balances on a trust line at higher or lower than face value. This can lead to situations that are like charging a fee. Trust line quality does not apply to CALL, which is not tied to a trust line. -->


## Outside the Ledger

Although the fees described above are the only fees built into the CALL Ledger, people can still invent ways to charge fees associated with the ledger. For example, financial institutions commonly charge their customers to send money into and out of the CALL Ledger.

Many other fees are also possible. Businesses might charge for access to a client application, maintenance of non-CALL Ledger accounts, exchange services (especially when buying CALL on a private market instead of within the CALL Ledger's decentralized exchange) and any number of other services. Always be aware of the fee schedule before doing business with any financial institution.
