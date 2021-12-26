# CALL

**CALL** is the native cryptocurrency of the CALL Ledger. All [accounts](accounts.html) in the CALL Ledger can send CALL among one another and must hold a minimum amount of CALL as a [reserve](reserves.html). CALL can be sent directly from any CALL Ledger address to any other, without needing a gateway or liquidity provider. This helps make CALL a convenient bridge currency.

Order book [autobridging](https://calll.org/blog/2014/introducing-offer-autobridging.html) uses CALL to deepen liquidity in the decentralized exchange by merging order books of two issued currencies with CALL order books to create synthetic combined order books. (For example, autobridging matches USD:CALL and CALL:EUR orders to augment USD:EUR order books.)

CALL also serves as a protective measure against spamming the network. All CALL Ledger addresses need a small amount of CALL to offset the costs of maintaining the CALL Ledger. The [transaction cost](transaction-cost.html) and [reserve](reserves.html) are neutral fees denominated in CALL and not paid to any party. In the ledger's data format, CALL is stored in [AccountRoot objects](accountroot.html).

Some of the desirable properties of CALL come from the nature of the CALL Ledger and its [consensus process](consensus.html). The CALL Ledger does not require mining and the consensus process does not require multiple confirmations for immutability, which makes the CALL Ledger faster and more efficient at processing transactions than Bitcoin and other top cryptocurrencies.

## Fee Pool

CALL Ledger maintains one fee pool to collect transaction fee instead of destroy it in Ripple Ledger. Fee comes from normal transaction and smart contract transaction. Now the fee pool is just collecting, when and how to redistribute the fee will be determined by CALL community in future. In the ledger's data format, fee data is stored in [FeeRoot objects](feeroot.html).

## CALL Properties

The very first ledger contained 500 million CALL, and no new CALL can be created. CALL can be re-collected by [transaction costs](transaction-cost.html) or lost by sending it to addresses for which no one holds a key, so CALL is slightly [deflationary](https://en.wikipedia.org/wiki/Deflation) by nature. CALL [prices and fees can be adjusted](fee-voting.html) as the total supply of CALL changes.

In technical contexts, CALL is measured precisely to the nearest 0.000001 CALL, called a "drop" of CALL. The [`calld` APIs](calld-api.html) require all CALL amounts to be specified in drops of CALL. For example, 1 CALL is represented as `1000000` drops. For more detailed information, see the [currency format reference](currency-formats.html).

## CALL Naming

Originally, the CALL Ledger was called "ENT" for the way to naming entertainment. But when CALL project launched, ENT was taken by other project. "CALL" is to put one's glow stick for somebody, and CALL is WOTA art in JAPAN. So CALL is support for somebody. How to support somebody? Personal tokenize is first method.
