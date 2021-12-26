# OfferCancel

[[Source]<br>](https://github.com/callchain/call-lib/blob/master/src/call/app/tx/impl/CancelOffer.cpp "Source")

An OfferCancel transaction removes an Offer object from the CALL Ledger.

## Example OfferCancel JSON

```json
{
    "TransactionType": "OfferCancel",
    "account": "ca5nK24KXen9AHvsdFTKHSANinZseWnPcX",
    "Fee": "12",
    "Flags": 0,
    "LastLedgerSequence": 7108629,
    "OfferSequence": 6,
    "Sequence": 7
}
```

{% include '_snippets/tx-fields-intro.md' %}
<!--{# fix md highlighting_ #}-->


| Field         | JSON Type | [Internal Type][] | Description                  |
|:--------------|:----------|:------------------|:-----------------------------|
| OfferSequence | Number    | UInt32            | The sequence number of a previous OfferCreate transaction. If specified, cancel any offer object in the ledger that was created by that transaction. It is not considered an error if the offer specified does not exist. |

*Tip:* To remove an old offer and replace it with a new one, you can use an [OfferCreate transaction][] with an `OfferSequence` parameter, instead of using OfferCancel and another OfferCreate.

The OfferCancel method returns [tesSUCCESS](tes-success.html) even if it did not find an offer with the matching sequence number.

<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/calld_versions.md' %}
