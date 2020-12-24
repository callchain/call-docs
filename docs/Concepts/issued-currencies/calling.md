# Calling

In the CALL Ledger, "calling" describes a process of atomic net settlement between multiple connected parties who have [trust lines](trust-lines-and-issuing.html) for the same currency. It's original called rippling in Ripple, but for localization we rename it as calling. calling is an essential part of issued currencies, because it allows users who trust the same issuer to send issued balances to each other with the issuer as a passive intermediary. In a sense, calling is like a passive, two-way [currency exchange order](offers.html) with no limit and a 1:1 exchange rate for two currencies with the same currency code but different issuers.

calling only occurs along the [paths](paths.html) of a payment.

For non-issuing accounts, calling can be undesirable because it lets other users shift obligations between issuers of the same currency. Thus, the [NoCall Flag](#the-nocall-flag) disables calling on incoming trust lines by default, unless the account enables calling by default by enabling the [DefaultCall flag](#the-defaultcall-flag).

**Caution:** If you create a trust line to another address, you must explicitly enable the tfSetNoCall flag to block calling on your side of that trust line.

## Example of calling

"calling" occurs when more than one trust line is adjusted to make a payment. For example, if Alice owes Charlie money, and Alice also owes Bob money, then you could represent that in the CALL Ledger with trust lines like so:

![Charlie --($10)-- Alice -- ($20) -- Bob](img/nocall-01.png)

If Bob wants to pay $3 to Charlie, then he could say, "Alice, take $3 of the money you owe me, and pay it to Charlie." Alice transfers some of the debt from Bob to Charlie. In the end, the trust lines work out like so:

![Charlie --($13)-- Alice --($17)-- Bob](img/nocall-02.png)

We call this process, where two addresses pay each other by adjusting the balances of trust lines in between them, "calling". This is a useful and important feature of the CALL Ledger. calling occurs when addresses are linked by trust lines that use the same [currency code][]. The issuer does not need to be the same: in fact, larger chains always involve changing issuers.

## The NoCall Flag

Non-issuing accounts, especially liquidity providers who may hold balances from different issuers with different fees and policies, usually do not want their balances to call.

The "NoCall" flag is a setting on a trust line. When two trust lines both have NoCall enabled by the same address, payments from third parties cannot "call" through that address on those trust lines. This protects liquidity providers from having balances shift unexpectedly between different issuers of the same currency.

An account can disable NoCall on a single trust line, which can allow calling through any pair that includes that trust line. The account can also enable calling by default by enabling the [DefaultCall flag](#the-defaultcall-flag).

For example, imagine Emily has money issued by two different financial institutions, like so

![Charlie --($10)-- Institution A --($1)-- Emily --($100)-- Institution B --($2)-- Daniel](img/nocall-03.png)

Now Charlie can pay Daniel by calling through Emily's address. For example, if Charlie pays Daniel $10:

![Charlie --($0)-- Institution A --($11)-- Emily --($90)-- Institution B --($12)-- Daniel](img/nocall-04.png)

This may surprise Emily, who does not know Charlie or Daniel. Even worse, if Institution A charges her higher fees to withdraw her money than Institution B, this could cost Emily money. The NoCall flag exists to avoid this scenario. If Emily sets it on both trust lines, then payments cannot call through her address using those two trust lines.

For example:

![Charlie --($10)-- Institution A --($1, NoCall)-- Emily --($100,NoCall)-- Institution B --($2)-- Daniel](img/nocall-05.png)

Now the above scenario, where Charlie pays Daniel while calling through Emily's address, is no longer possible.

### Specifics

The NoCall flag makes certain paths invalid, so that they cannot be used to make payments. A path is considered invalid if and only if it enters **and** exits an address node through trust lines where NoCall has been enabled for that address.

![Diagram demonstrating that NoCall has to be set on both trust lines by the same address to do anything](img/nocall-06.png)


## The DefaultCall Flag

The DefaultCall flag is an account setting that enables calling on all incoming trust lines by default. Gateways and other currency issuers MUST enable this flag for their customers to be able to send those currencies to each other.

The DefaultCall setting of your account does not affect trust lines that you create; only trust lines that others open to you. If you change the DefaultCall setting of your account, trust lines that were created before the change keep their existing NoCall settings. You can use a [TrustSet transaction][] to change the NoCall setting of a trust line to match your address's new default.

For more information, see [DefaultCall in 'Becoming an CALL Ledger Gateway'](become-an-call-ledger-gateway.html#defaultcall).


## Using NoCall
<!--{# TODO: move these things into their own tutorials #}-->

### Enabling / Disabling NoCall

The NoCall flag can only be enabled on a trust line if the address has a positive or zero balance on that trust line. This is so that the feature cannot be abused to default on the obligation the trust line balance represents. (Of course, you can still default by abandoning the address.)

In the [`calld` APIs](calld-api.html), you can enable the NoCall flag by sending a [TrustSet transaction][] with the `tfSetNoCall` flag. You can disable NoCall (enable calling) with the `tfClearNoCall` flag.

In [CallAPI](callapi-reference.html), you can enable the NoCall flag by sending a [Trustline transaction](callapi-reference.html#preparetrustline) transaction with the `callingDisabled` field of the trust line set to `true`.


### Looking Up NoCall Status

In the case of two accounts that mutually trust each other, the NoCall flag is tracked separately for each account.

In the [`calld` APIs](calld-api.html), you can use the [account_lines method][] to look up the trust lines associated with an address. For each trust line, the `no_call` field shows whether the current address has enabled the NoCall flag on that trust line, and the `no_call_peer` field shows whether the counterparty has enabled the NoCall flag.

In [CallAPI](callapi-reference.html), you can use the [getTrustlines](callapi-reference.html#gettrustlines) method to look up the trust lines associated with an address. For each trust line, the `callingDisabled` field shows whether the current address has enabled the NoCall flag on that trust line, and the `counterparty.callingDisabled` field shows whether the counterparty has enabled the NoCall flag.

<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/calld_versions.md' %}
