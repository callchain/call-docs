# call_path_find
[[Source]<br>](https://github.com/callchain/call-lib/blob/master/src/call/rpc/handlers/CallPathFind.cpp "Source")

The `call_path_find` method is a simplified version of the [path_find method][] that provides a single response with a [payment path](paths.html) you can use right away. It is available in both the WebSocket and JSON-RPC APIs. However, the results tend to become outdated as time passes. Instead of making multiple calls to stay updated, you should instead use the [path_find method][] to subscribe to continued updates where possible.

Although the `calld` server tries to find the cheapest path or combination of paths for making a payment, it is not guaranteed that the paths returned by this method are, in fact, the best paths.

**Caution:** Be careful with the pathfinding results from untrusted servers. A server could be modified to return less-than-optimal paths to earn money for its operators. A server may also return poor results when under heavy load. If you do not have your own server that you can trust with pathfinding, you should compare the results of pathfinding from multiple servers run by different parties, to minimize the risk of a single server returning poor results.

## Request Format
An example of the request format:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```
{
    "id": 8,
    "command": "call_path_find",
    "source_account": "cDVCAS1cnoMboELkQXxdmhJCiMscMm93U2",
    "source_currencies": [
        {
            "currency": "CALL"
        },
        {
            "currency": "USD"
        }
    ],
    "destination_account": "cDVCAS1cnoMboELkQXxdmhJCiMscMm93U2",
    "destination_amount": {
        "value": "0.001",
        "currency": "USD",
        "issuer": "cvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"
    }
}
```

*JSON-RPC*

```
{
    "method": "call_path_find",
    "params": [
        {
            "destination_account": "cDVCAS1cnoMboELkQXxdmhJCiMscMm93U2",
            "destination_amount": {
                "currency": "USD",
                "issuer": "cvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
                "value": "0.001"
            },
            "source_account": "cDVCAS1cnoMboELkQXxdmhJCiMscMm93U2",
            "source_currencies": [
                {
                    "currency": "CALL"
                },
                {
                    "currency": "USD"
                }
            ]
        }
    ]
}
```

*Commandline*

```
#Syntax call_path_find json ledger_index|ledger_hash
calld call_path_find '{"source_account": "cDVCAS1cnoMboELkQXxdmhJCiMscMm93U2", "source_currencies": [ { "currency": "CALL" }, { "currency": "USD" } ], "destination_account": "cDVCAS1cnoMboELkQXxdmhJCiMscMm93U2", "destination_amount": { "value": "0.001", "currency": "USD", "issuer": "cvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B" } }'
```

<!-- MULTICODE_BLOCK_END -->

[Try it! >](websocket-api-tool.html#call_path_find)

The request includes the following parameters:

| `Field`               | Type                       | Description             |
|:----------------------|:---------------------------|:------------------------|
| `source_account`      | String                     | Unique address of the account that would send funds in a transaction |
| `destination_account` | String                     | Unique address of the account that would receive funds in a transaction |
| `destination_amount`  | String or Object           | [Currency Amount][] that the destination account would receive in a transaction. **Special case:** [New in: calld 0.30.0][] You can specify `"-1"` (for CALL) or provide -1 as the contents of the `value` field (for non-CALL currencies). This requests a path to deliver as much as possible, while spending no more than the amount specified in `send_max` (if provided). |
| `send_max`            | String or Object           | _(Optional)_ [Currency Amount][] that would be spent in the transaction. Cannot be used with `source_currencies`. [New in: calld 0.30.0][] |
| `source_currencies`   | Array                      | _(Optional)_ Array of currencies that the source account might want to spend. Each entry in the array should be a JSON object with a mandatory `currency` field and optional `issuer` field, like how [currency amounts][Currency Amount] are specified. Cannot contain more than **18** source currencies. By default, uses all source currencies available up to a maximum of **88** different currency/issuer pairs. |
| `ledger_hash`         | String                     | _(Optional)_ A 20-byte hex string for the ledger version to use. (See [Specifying Ledgers][]) |
| `ledger_index`        | String or Unsigned Integer | _(Optional)_ The sequence number of the ledger to use, or a shortcut string to choose a ledger automatically. (See [Specifying Ledgers][]) |

## Response Format

An example of a successful response:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```
{
    "id": 8,
    "status": "success",
    "type": "response",
    "result": {
        "alternatives": [
            {
                "paths_canonical": [],
                "paths_computed": [
                    [
                        {
                            "currency": "USD",
                            "issuer": "cvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
                            "type": 48,
                            "type_hex": "0000000000000030"
                        },
                        {
                            "account": "cvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        }
                    ],
                    [
                        {
                            "currency": "USD",
                            "issuer": "crpNnNLKrartuEqfJGpqyDwPj1AFPg9vn1",
                            "type": 48,
                            "type_hex": "0000000000000030"
                        },
                        {
                            "account": "crpNnNLKrartuEqfJGpqyDwPj1AFPg9vn1",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        },
                        {
                            "account": "cvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        }
                    ],
                    [
                        {
                            "currency": "USD",
                            "issuer": "crpNnNLKrartuEqfJGpqyDwPj1AFPg9vn1",
                            "type": 48,
                            "type_hex": "0000000000000030"
                        },
                        {
                            "account": "crpNnNLKrartuEqfJGpqyDwPj1AFPg9vn1",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        },
                        {
                            "account": "cLpq4LgabRfm1xEX5dpWfJovYBH6g7z99q",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        },
                        {
                            "account": "cvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        }
                    ],
                    [
                        {
                            "currency": "USD",
                            "issuer": "crpNnNLKrartuEqfJGpqyDwPj1AFPg9vn1",
                            "type": 48,
                            "type_hex": "0000000000000030"
                        },
                        {
                            "account": "crpNnNLKrartuEqfJGpqyDwPj1AFPg9vn1",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        },
                        {
                            "account": "cPuBoajMjFoDjweJBrtZEBwUMkyruxpwwV",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        },
                        {
                            "account": "cvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        }
                    ]
                ],
                "source_amount": "256987"
            }
        ],
        "destination_account": "cDVCAS1cnoMboELkQXxdmhJCiMscMm93U2",
        "destination_currencies": [
            "015841551A748AD2C1F76FF6ECB0CCCD00000000",
            "JOE",
            "DYM",
            "EUR",
            "CNY",
            "MXN",
            "BTC",
            "USD",
            "CALL"
        ]
    }
}
```

*JSON-RPC*

```
200 OK
{
    "result": {
        "alternatives": [
            {
                "paths_canonical": [],
                "paths_computed": [
                    [
                        {
                            "currency": "USD",
                            "issuer": "cpDMez6pm6dBve2TJsmDpv7Yae6V5Pyvy2",
                            "type": 48,
                            "type_hex": "0000000000000030"
                        },
                        {
                            "account": "cpDMez6pm6dBve2TJsmDpv7Yae6V5Pyvy2",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        },
                        {
                            "account": "cfDeu7TPUmyvUrffexjMjq3mMcSQHZSYyA",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        },
                        {
                            "account": "cvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        }
                    ],
                    [
                        {
                            "currency": "USD",
                            "issuer": "cvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
                            "type": 48,
                            "type_hex": "0000000000000030"
                        },
                        {
                            "account": "cvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        }
                    ],
                    [
                        {
                            "currency": "USD",
                            "issuer": "cLEsXccBGNR3UPuPu2hUXPjziKC3qKSBun",
                            "type": 48,
                            "type_hex": "0000000000000030"
                        },
                        {
                            "account": "cLEsXccBGNR3UPuPu2hUXPjziKC3qKSBun",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        },
                        {
                            "account": "caspZSGNiTKi5jmvFxUYCuYXPv1V8WhL5g",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        },
                        {
                            "account": "cvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        }
                    ],
                    [
                        {
                            "currency": "USD",
                            "issuer": "cpHgehzdpfWRXKvSv6duKvVuo1aZVimdaT",
                            "type": 48,
                            "type_hex": "0000000000000030"
                        },
                        {
                            "account": "cpHgehzdpfWRXKvSv6duKvVuo1aZVimdaT",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        },
                        {
                            "account": "cvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
                            "type": 1,
                            "type_hex": "0000000000000001"
                        }
                    ]
                ],
                "source_amount": "207414"
            }
        ],
        "destination_account": "cDVCAS1cnoMboELkQXxdmhJCiMscMm93U2",
        "destination_currencies": [
            "USD",
            "JOE",
            "BTC",
            "DYM",
            "CNY",
            "EUR",
            "015841551A748AD2C1F76FF6ECB0CCCD00000000",
            "MXN",
            "CALL"
        ],
        "status": "success"
    }
}
```

<!-- MULTICODE_BLOCK_END -->

The response follows the [standard format][], with a successful result containing the following fields:

| `Field`                  | Type   | Description                              |
|:-------------------------|:-------|:-----------------------------------------|
| `alternatives`           | Array  | Array of objects with possible paths to take, as described below. If empty, then there are no paths connecting the source and destination accounts. |
| `destination_account`    | String | Unique address of the account that would receive a payment transaction |
| `destination_currencies` | Array  | Array of strings representing the currencies that the destination accepts, as 3-letter codes like `"USD"` or as 40-character hex like `"015841551A748AD2C1F76FF6ECB0CCCD00000000"` |

Each element in the `alternatives` array is an object that represents a path from one possible source currency (held by the initiating account) to the destination account and currency. This object has the following fields:

| `Field`          | Type             | Description                            |
|:-----------------|:-----------------|:---------------------------------------|
| `paths_computed` | Array            | Array of arrays of objects defining [payment paths](paths.html) |
| `source_amount`  | String or Object | [Currency Amount][] that the source would have to send along this path for the destination to receive the desired amount |

The following fields are deprecated, and may be omitted: `paths_canonical`, and `paths_expanded`. If they appear, you should disregard them.

## Possible Errors

* Any of the [universal error types][].
* `tooBusy` - The server is under too much load to calculate paths. Not returned if you are connected as an admin.
* `invalidParams` - One or more fields are specified incorrectly, or one or more required fields are missing.
* `srcActMissing` - The `source_account` field is omitted from the request.
* `srcActMalformed` - The `source_account` field in the request is not formatted properly.
* `dstActMissing` - The `destination_account` field is omitted from the request.
* `dstActMalformed` - The `destination_account` field in the request is not formatted properly.
* `srcCurMalformed` - The `source_currencies` field is not formatted properly.
* `srcIsrMalformed` - The `issuer` field of one or more of the currency objects in the request is not valid.


{% include '_snippets/calld_versions.md' %}
{% include '_snippets/calld-api-links.md' %}
