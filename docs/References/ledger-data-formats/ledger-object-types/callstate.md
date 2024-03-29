# CallState
[[Source]<br>](https://github.com/callchain/call-lib/blob/5d2d88209f1732a0f8d592012094e345cbe3e675/src/call/protocol/impl/LedgerFormats.cpp#L70 "Source")

The `CallState` object type connects two accounts in a single currency. Conceptually, a `CallState` object represents two [trust lines](trust-lines-and-issuing.html) between the accounts, one from each side. Each account can change the settings for its side of the `CallState` object, but the balance is a single shared value. A trust line that is entirely in its default state is considered the same as a trust line that does not exist, so `calld` deletes `CallState` objects when their properties are entirely default.

## High vs. Low Account

There can only be one `CallState` object per currency for any given pair of accounts. Since no account is privileged in the CALL Ledger, a `CallState` object sorts account addresses numerically, to ensure a canonical form. Whichever address is numerically lower when [decoded](accounts.html#address-encoding) is deemed the "low account" and the other is the "high account". The net balance of the trust line is stored from the low account's perspective.

The ["issuer"](trust-lines-and-issuing.html) for the balance in a trust line depends on whether the balance is positive or negative. If a `CallState` object shows a positive balance, the high account is the issuer. If the balance is negative, the low account is the issuer. Frequently, the issuer has its limit set to 0 and the other account has a positive limit, but this is not reliable because limits can change without affecting an existing balance.


## Example CallState JSON

```json
{
    "Balance": {
        "currency": "USD",
        "issuer": "crrrrrrrrrrrrrrrrrrrBZbvji",
        "value": "-10"
    },
    "Flags": 393216,
    "HighLimit": {
        "currency": "USD",
        "issuer": "cf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
        "value": "110"
    },
    "HighNode": "0000000000000000",
    "LedgerEntryType": "CallState",
    "LowLimit": {
        "currency": "USD",
        "issuer": "csA2LpzuawewSBQXkiju3YQTMzW13pAAdW",
        "value": "0"
    },
    "LowNode": "0000000000000000",
    "PreviousTxnID": "E3FE6EA3D48F0C2B639448020EA4F03D4F4F8FFDB243A852A0F59177921B4879",
    "PreviousTxnLgrSeq": 14090896,
    "index": "9CA88CDEDFF9252B3DE183CE35B038F57282BC9503CDFA1923EF9A95DF0D6F7B"
}
```

## CallState Fields

A `CallState` object has the following fields:

| Name            | JSON Type | Internal Type | Description |
|-----------------|-----------|---------------|-------------|
| `LedgerEntryType` | String    | UInt16 | The value `0x0072`, mapped to the string `CallState`, indicates that this object is a CallState object. |
| `Flags`           | Number    | UInt32 | A bit-map of boolean options enabled for this object. |
| `Balance`         | Object    | Amount | The balance of the trust line, from the perspective of the low account. A negative balance indicates that the low account has issued currency to the high account. The issuer in this is always set to the neutral value [ACCOUNT_ONE](accounts.html#special-addresses). |
| `LowLimit`        | Object    | Amount | The limit that the low account has set on the trust line. The `issuer` is the address of the low account that set this limit. |
| `HighLimit`       | Object    | Amount | The limit that the high account has set on the trust line. The `issuer` is the address of the high account that set this limit. |
| `PreviousTxnID`   | String    | Hash256 | The identifying hash of the transaction that most recently modified this object. |
| `PreviousTxnLgrSeq` | Number  | UInt32 | The [index of the ledger][Ledger Index] that contains the transaction that most recently modified this object. |
| `LowNode`         | String    | UInt64 | (Omitted in some historical ledgers) A hint indicating which page of the low account's owner directory links to this object, in case the directory consists of multiple pages. |
| `HighNode`        | String    | UInt64 | (Omitted in some historical ledgers) A hint indicating which page of the high account's owner directory links to this object, in case the directory consists of multiple pages. |
| `LowQualityIn`    | Number    | UInt32 | (Optional) The inbound quality set by the low account, as an integer in the implied ratio LowQualityIn:1,000,000,000. The value 0 is equivalent to 1 billion, or face value. |
| `LowQualityOut`   | Number    | UInt32 | (Optional) The outbound quality set by the low account, as an integer in the implied ratio LowQualityOut:1,000,000,000. The value 0 is equivalent to 1 billion, or face value. |
| `HighQualityIn`   | Number    | UInt32 | (Optional) The inbound quality set by the high account, as an integer in the implied ratio HighQualityIn:1,000,000,000. The value 0 is equivalent to 1 billion, or face value. |
| `HighQualityOut`  | Number    | UInt32 | (Optional) The outbound quality set by the high account, as an integer in the implied ratio HighQualityOut:1,000,000,000. The value 0 is equivalent to 1 billion, or face value. |

## CallState Flags

There are several options which can be either enabled or disabled for a trust line. These options can be changed with a [TrustSet transaction][]. In the ledger, flags are represented as binary values that can be combined with bitwise-or operations. The bit values for the flags in the ledger are different than the values used to enable or disable those flags in a transaction. Ledger flags have names that begin with _lsf_.

CallState objects can have the following flag values:

| Flag Name | Hex Value | Decimal Value | Description | Corresponding [TrustSet Flag](trustset.html#trustset-flags) |
|-----------|-----------|---------------|-------------|------------------------|
| lsfLowReserve | 0x00010000 | 65536 | This CallState object [contributes to the low account's owner reserve](#contributing-to-the-owner-reserve). | (None) |
| lsfHighReserve | 0x00020000 |131072 | This CallState object [contributes to the high account's owner reserve](#contributing-to-the-owner-reserve). | (None) |
| lsfLowAuth | 0x00040000 | 262144 | The low account has authorized the high account to hold the low account's issuances. | tfSetAuth |
| lsfHighAuth | 0x00080000 | 524288 |  The high account has authorized the low account to hold the high account's issuances. | tfSetAuth |
| lsfLowNoCall | 0x00100000 | 1048576 | The low account [has disabled rippling](rippling.html) from this trust line to other trust lines with the same account's NoCall flag set. | tfSetNoCall |
| lsfHighNoCall | 0x00200000 | 2097152 | The high account [has disabled rippling](rippling.html) from this trust line to other trust lines with the same account's NoCall flag set. | tfSetNoCall |
| lsfLowFreeze | 0x00400000 | 4194304 | The low account has frozen the trust line, preventing the high account from transferring the asset. | tfSetFreeze |
| lsfHighFreeze | 0x00800000 | 8388608 | The high account has frozen the trust line, preventing the low account from transferring the asset. | tfSetFreeze |

## Contributing to the Owner Reserve

If an account modifies a trust line to put it in a non-default state, then that trust line counts towards the account's [owner reserve](reserves.html#owner-reserves). In a CallState object, the `lsfLowReserve` and `lsfHighReserve` flags indicate which account(s) are responsible for the owner reserve. The `calld` server automatically sets these flags when it modifies a trust line.

The values that count towards a trust line's non-default state are as follows:

| High account responsible if... | Low account responsible if... |
|-----------------------|----------------------|
| `Balance` is negative (the high account holds currency) | `Balance` is positive (the low account holds currency) |
| `HighLimit` is not `0` | `LowLimit` is not `0`  |
| `LowQualityIn` is not `0` and not `1000000000` | `HighQualityIn` is not `0` and not `1000000000` |
| `LowQualityOut` is not `0` and not `1000000000` | `HighQualityOut` is not `0` and not `1000000000` |
| **lsfHighNoCall** flag is not in its default state | **lsfLowNoCall** flag is not in its default state |
| **lsfHighFreeze** flag is enabled | **lsfLowFreeze** flag is enabled |

The **lsfLowAuth** and **lsfHighAuth** flags do not count against the default state, because they cannot be disabled.

The default state of the two NoCall flags depends on the state of the [lsfDefaultCall flag](accountroot.html#accountroot-flags) in their corresponding AccountRoot objects. If DefaultCall is disabled (the default), then the default state of the lsfNoCall flag is _enabled_ for all of an account's trust lines. If an account enables DefaultCall, then the lsfNoCall flag is _disabled_ (rippling is enabled) for an account's trust lines by default.

**Note:** Prior to the introduction of the DefaultCall flags in `calld` version 0.27.3 (March 10, 2015), the default state for all trust lines was with both NoCall flags disabled (rippling enabled).

Fortunately, `calld` uses lazy evaluation to calculate the owner reserve. This means that even if an account changes the default state of all its trust lines by changing the DefaultCall flag, that account's reserve stays the same initially. If an account modifies a trust line, `calld` re-evaluates whether that individual trust line is in its default state and should contribute to the owner reserve.

## CallState ID Format

The ID of a CallState object is the [SHA-512Half][] of the following values, concatenated in order:

* The CallState space key (`0x0072`)
* The AccountID of the low account
* The AccountID of the high account
* The 160-bit currency code of the trust line(s)

<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}			
{% include '_snippets/tx-type-links.md' %}			
{% include '_snippets/calld_versions.md' %}
