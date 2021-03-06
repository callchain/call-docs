# Transaction Formats

A _Transaction_ is the only way to modify the CALL Ledger. Transactions are only final if signed, submitted, and accepted into a validated ledger version following the [consensus process](consensus.html). Some ledger rules also generate _[pseudo-transactions](pseudo-transaction-types.html)_, which aren't signed or submitted, but still must be accepted by consensus. Transactions that fail are also included in ledgers because they modify balances of CALL to pay for the anti-spam [transaction cost][].


<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/calld_versions.md' %}
