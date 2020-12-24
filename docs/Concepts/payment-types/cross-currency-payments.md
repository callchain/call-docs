# Cross-Currency Payments

In the CALL Ledger, you can send cross-currency payments that exchange one or more issued currencies, CALL, or both. Like [direct CALL payments](use-simple-call-payments.html), these payments use the [Payment transaction type][Payment]. Cross-currency payments within the CALL Ledger are fully atomic, meaning that either the payment fully executes or no part of it executes.

By default, cross-currency payments deliver a fixed amount to their destination at a variable cost to their source. Cross-currency payments can also be [partial payments](partial-payments.html), which deliver a variable amount to the destination within a fixed sending limit.


## Prerequisites

- By definition, a cross-currency payment involves at least two currencies, which means that at least one currency involved must be a non-CALL issued currency.
    - Typically, this means using one or more currencies issued by an [CALL Ledger Gateway](become-an-call-ledger-gateway.html). Such currencies are backed by funds outside the CALL Ledger, and can be withdrawn through the gateway.
    - Issued currencies can also be digital tokens that are only issued within the CALL Ledger, with no outside backing. Of course, the parties involved must be willing to send or receive those tokens and treat them as something of value.
- There must be at least one [Path](paths.html) between the sender and receiver, and the total liquidity across all paths must be enough to facilitate the payment. Cross-currency payments convert from one currency to another by consuming [Offers](offers.html) in the CALL Ledger's decentralized exchange.


## Autobridging

Cross-currency payments that exchange two issued currencies automatically use CALL, when it decreases the cost of the payment, by connecting order books to deepen the pool of available liquidity. For example, a payment sending from USD to MXN automatically converts USD to CALL and then CALL to MXN if doing so is cheaper than converting USD to MXN directly.

For more information, see [Autobridging](autobridging.html).

<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}			
{% include '_snippets/tx-type-links.md' %}			
{% include '_snippets/calld_versions.md' %}
