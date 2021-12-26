# Currency Formats

The CALL Ledger has two kinds of money: [CALL](call.html), and [issued currencies](issued-currencies.html). In the CALL Ledger, both types have high precision, although their formats are different.

## String Formatting

{% include '_snippets/string-number-formatting.md' %}
<!--{#_ #}-->

## CALL Precision

CALL has the same precision as a 64-bit unsigned integer where each unit is equivalent to 0.000001 CALL. Its properties are:

* Minimum value: `0`
* Maximum value: `100000000000` (10<sup>11</sup>) CALL
    - `"100000000000000000"` (10<sup>17</sup>) drops of CALL
* Precise to the nearest `0.000001` (10<sup>-6</sup>) CALL
    - `"1"` drop of CALL

## Issued Currency Precision

Issued currencies in the CALL Ledger are represented with a custom format with the following precision:

* Minimum nonzero absolute value: `1000000000000000e-96`
* Maximum value: `9999999999999999e80`
* Minimum value: `-9999999999999999e80`
* 15 decimal digits of precision

## Issued Currency Math
[[Source]<br>](https://github.com/callchain/call-lib/blob/35fa20a110e3d43ffc1e9e664fc9017b6f2747ae/src/call/protocol/impl/STAmount.cpp "Source")

![Issued Currency Amount Format diagram](img/currency-number-format.png)

Internally, `calld` represents numbers for issued currencies in a custom number format. This format can store a wide variety of assets, including those typically measured in very small or very large denominations. This format uses significant digits and a power-of-ten exponent in a similar way to scientific notation. The format supports positive and negative significant digits and exponents within the specified range. Unlike typical floating-point representations of non-whole numbers, this format uses integer math for all calculations, so it always maintains 15 decimal digits of precision. Multiplication and division have adjustments to compensate for over-rounding in the least significant digits.

Unlike "arbitrary precision" number formats, the custom format can be stored in a fixed size of 64 bits. When serialized this way, the format consists of a "not CALL" bit, a sign bit, significant digits, and an exponent. They are present in order:

1. The first (most significant) bit for an issued currency amount is `1` to indicate that it is not an CALL amount. (CALL amounts always have the most significant bit set to `0` to distinguish them from this format.)
2. The sign bit indicates whether the amount is positive or negative. Unlike standard [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) integers, `1` indicates **positive** in the CALL Ledger format, and `0` indicates negative.
3. The next 8 bits represent the exponent as an unsigned integer. The exponent indicates the scale (what power of 10 the significant digits should be multiplied by) in the range -96 to +80 (inclusive). However, when serializing, we add 97 to the exponent to make it possible to serialize as an unsigned integer. Thus, a serialized value of `1` indicates an exponent of `-96`, a serialized value of `177` indicates an exponent of 80, and so on.
4. The remaining 54 bits represent the significant digits as an unsigned integer. When serializing, this value is normalized to the range 10<sup>15</sup> (`1000000000000000`) to 10<sup>16</sup>-1 (`9999999999999999`) inclusive, except for the special case of the value 0. There is a special case for the value 0. In this case, the sign bit, exponent, and mantissa are all zeroes, so the 64-bit value is serialized as `0x8000000000000000000000000000000000000000`.


## Currency Codes

All non-CALL currencies in the CALL Ledger have a 160-bit currency code. The [`calld` APIs](calld-api.html) map 3-character ASCII strings (case-sensitive) to 160-bit currency codes using a standard mapping. The currency code `CALL` is disallowed for issued currencies. Currencies with the same code can [call](rippling.html) across connected trustlines. Currency codes have no other behavior built into the CALL Ledger.

### Standard Currency Codes

The standard currency mapping allocates the bits as follows:

![Standard Currency Code Format](img/currency-code-format.png)

1. The first 8 bits must be `0x00`.
2. The next 88 bits are reserved, and should be all `0`'s.
3. The next 24 bits represent 3 characters of ASCII.
    Call recommends using [ISO 4217](http://www.xe.com/iso4217.php) codes, or popular pseudo-ISO 4217 codes such as "BTC". However, any combination of the following characters is permitted: all uppercase and lowercase letters, digits, as well as the symbols `?`, `!`, `@`, `#`, `$`, `%`, `^`, `&`, `*`, `<`, `>`, `(`, `)`, `{`, `}`, `[`, `]`, and <code>&#124;</code>. The currency code `CALL` (all-uppercase) is reserved for CALL and cannot be used by issued currencies.
4. The next 40 bits are reserved and should be all `0`'s.

Usually, CALL amounts are not specified with currency codes. In the rare case that a field specifies a currency code for CALL, the currency code's binary format is all zeroes.

### Nonstandard Currency Codes

You can also issue currency of other types by using a 160-bit (40-character) hexadecimal string such as `015841551A748AD2C1F76FF6ECB0CCCD00000000` as the currency code. To prevent this from being treated as a different currency code type, the first 8 bits MUST NOT be `0x00`.

**Deprecated:** Some previous versions of [call-lib](https://github.com/callchain/call-lib) supported an "interest-bearing" or "demurraging" currency code type. These currencies have the first 8 bits `0x01`. Demurraging / interest-bearing currencies are no longer supported, but you may encounter them in ledger data. For more information, see [Demurrage](demurrage.html).
