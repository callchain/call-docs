# History Sharding

[Introduced in: calld 0.90.0][New in: calld 0.90.0]

As servers operate, they naturally produce a database containing data about the ledgers they witnessed or acquired during network runtime. Each `calld` server stores that ledger data in its ledger store, but the online delete logic rotates these databases when the number of stored ledgers exceeds configured space limitations.

Historical sharding distributes the transaction history of the CALL Ledger into segments, called shards, across servers in the CALL Ledger network. A shard is a range of ledgers. A `calld` server stores ledgers in both the ledger store and the shard store in the same way.

Using the history sharding feature, individual `calld` servers can contribute to storing historical data without needing to store the entire (multiple terabyte) history. A shard store does not replace a ledger store, but implements a reliable path towards distributed ledger history across the CALL Ledger Network.

[![CALL Ledger Network: Ledger Store and Shard Store Diagram](img/call-ledger-network-ledger-store-and-shard-store.png)](img/call-ledger-network-ledger-store-and-shard-store.png)

<!-- Diagram source: https://docs.google.com/presentation/d/1mg2jZQwgfLCIhOU8Mr5aOiYpIgbIgk3ymBoDb2hh7_s/edit#slide=id.g417450e8da_0_316 -->

## Acquiring and Sharing History Shards

`calld` servers acquire and store history shards only if configured to do so. For those servers, acquiring shards begins after synchronizing with the network and backfilling ledger history to the configured number of recent ledgers. During this time of lower network activity, a `calld` server set to maintain a `shard_db` randomly chooses a shard to add to its shard store. To increase the probability for an even distribution of the network ledger history, shards are randomly selected for acquisition, and the current shard is given no special consideration.

Once a shard is selected, the ledger acquire process begins by fetching the sequence of the last ledger in the shard and working backwards toward the first. The retrieval process begins with the server checking for the data locally. For data that is not available, the server requests data from its peer `calld` servers. Those servers that have the data available for the requested period respond with their history. The requesting server combines those responses to create the shard. The shard is complete when it contains all the ledgers in a specific range.

If a `calld` server runs out of space before completely acquiring a shard, it stops its retrieval process until it has space available to continue. After that point, the most recently completed shard may replace an older shard. If there is sufficient disk space, the `calld` server acquires additional randomly selected shards to add to the shard store until reaching the maximum allocated disk space for shards (`max_size_gb`).

## CALL Ledger Network Data Integrity

The history of all ledgers is shared by servers agreeing to keep particular ranges of historical ledgers. This makes it possible for servers to confirm that they have all the data they agreed to maintain, and produce proof trees or ledger deltas. Since `calld` servers that are configured with history sharding randomly select the shards that they store, the entire history of all closed ledgers is stored in a normal distribution curve, increasing the probability that the CALL Ledger Network evenly maintains the history.

## See Also

- [Configure History Sharding](configure-history-sharding.html)
- [download_shard method][]
- [crawl_shards method][]

<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}			
{% include '_snippets/tx-type-links.md' %}			
{% include '_snippets/calld_versions.md' %}
