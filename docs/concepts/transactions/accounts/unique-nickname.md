# Unique Nickname

The CALL Ledger maintains one unique name for each account. In Bitcoin and others blockchain, users can only use tediously and senseless base58 encoded string. In EOS, it uses 12 characters to identify one account, but it's also limited. In blockchain times, user should be easily to use their account likely in the blockchain network. CALL Ledger provides one naming system. One account and be identified by one unique name, and name is limit to 256 visible characters.

The naming system works linke domain name system. Each nickname can be registered one. Later it can also be exchanged between users.


## Nickname Setting

Account's nickname can be set by [AccountSet](accountset.html) transaction with nickname fields. CALL Ledger uses `Niackname`to store data. Nickname can be set more than one time, but each name should be unique in Ledger. When you set another nickname for your account, your previous nickname will be lost.

## Nickname Search

User can use nickname to query account information as use account address in CALL Ledger. The command is [nickname_info](nickname_info.html).


<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/calld_versions.md' %}
