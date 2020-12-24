# Understanding Signatures

In the CALL Ledger, a digital signature proves that a transaction is authorized to do a specific set of actions. A digital signature is created based on a [key pair](cryptographic-keys.html) associated with the transaction's sending account.

Here's an overview of some of the more common signature-related fields used in the CALL Ledger.

## `SigningPubKey`

The public key of the sender in hex format. Empty in the case of a multi-signed transaction.

To verify whether a single-signed transaction is valid, a `calld` server checks that all of the following are true:

1. This key hashes to an address that's authorized by the transaction's sender.

    The default is that only the address of an account is authorized to send all transactions for that account. That address is [derived from](accounts.html#address-encoding) the public key from the master key pair that was generated during address creation. Regular keys add a different address (derived from a different key pair) that's authorized to send most transactions. And of course, you can also disable the [master key](cryptographic-keys.html) or add a [multi-signing list](reference-transaction-format.html#multi-signing). 

2. This key matches the signature on the transaction.

3. The signature matches the transaction instructions.


The validation process for multi-signed transactions is slightly different. For more information, see [`Signers[*].SigningPubKey`](#signerssigningpubkey).


## `TxnSignature`

The signature of the transaction instructions, in hex format.

Used with the `SigningPubKey` to verify that the sender did in fact approve the corresponding transaction instructions.
In transactions, we have two TxnSignature fields—one at the top level for single-signed transactions, and one in each member of the Signers array for multi-signed transactions. Any given transaction has either the top level TxnSignature or the members in the Signers array but not both.


## `Signers`

An array of signature data for a [multi-signed transaction](reference-transaction-format.html#multi-signing).

Used to verify that a quorum of signers approved a transaction.


### `Signers[*].AccountID`

The address of one signer, in base58.

Identifies which signer from the (predefined) [multi-signing list](reference-transaction-format.html#multi-signing) this portion of the multi-signature represents.


### `Signers[*].TxnSignature`

One signature, as hexadecimal.

Verifying a [multi-signed transaction](reference-transaction-format.html#multi-signing) involves making sure each such signature is valid for its `SigningPubKey` and the transaction instructions.


### `Signers[*].SigningPubKey`

The public key of one signer. Verifying a [multi-signed transaction](reference-transaction-format.html#multi-signing) involves making sure each such key is authorized to sign for the `AccountID` of the signer.

Multi-signature `AccountIDs` are a little special. If one is an address that doesn't exist in the ledger, then the `SigningPubKey` must hash to the `AccountID` value using the standard rules for [deriving an AccountID](accounts.html#address-encoding) from a public key. If the address does exist in the ledger, then either:

1. The `SigningPubKey` must hash to the `AccountID` and the address must not have the master key disabled.

    or

2. The `SigningPubKey` must hash to a regular key that the address has set in the ledger.


For more information about signing transactions, see [Signing and Submitting Transactions](reference-transaction-format.html#signing-and-submitting-transactions).

