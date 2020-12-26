# connect
[[Source]<br>](https://github.com/callchain/call-lib/blob/a61ffab3f9010d8accfaa98aa3cacc7d38e74121/src/call/rpc/handlers/Connect.cpp "Source")

The `connect` command forces the `calld` server to connect to a specific peer `calld` server.

*The `connect` method is an [admin method](admin-calld-methods.html) that cannot be run by unprivileged users!*

### Request Format
An example of the request format:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```
{
    "command": "connect",
    "ip": "192.170.145.88",
    "port": 51235
}
```

*JSON-RPC*

```
{
    "method": "connect",
    "params": [
        {
            "ip": "192.170.145.88",
            "port": 51235
        }
    ]
}
```


*Commandline*

```
#Syntax: connect ip [port]
calld connect 192.170.145.88 51235
```

<!-- MULTICODE_BLOCK_END -->

The request includes the following parameters:

| `Field` | Type   | Description                                               |
|:--------|:-------|:----------------------------------------------------------|
| `ip`    | String | IP address of the server to connect to                    |
| `port`  | Number | _(Optional)_ Port number to use when connecting. Defaults to 6561. |

### Response Format

An example of a successful response:

<!-- MULTICODE_BLOCK_START -->

*JSON-RPC*

```
{
   "result" : {
      "message" : "connecting",
      "status" : "success"
   }
}
```

*Commandline*

```
Loading: "/etc/calld.cfg"
Connecting to 127.0.0.1:5005
{
   "result" : {
      "message" : "connecting",
      "status" : "success"
   }
}
```

<!-- MULTICODE_BLOCK_END -->

The response follows the [standard format][], with a successful result containing the following fields:

| `Field`   | Type   | Description                                            |
|:----------|:-------|:-------------------------------------------------------|
| `message` | String | The value `connecting`, if the command was successful. |

### Possible Errors

* Any of the [universal error types][].
* `invalidParams` - One or more fields are specified incorrectly, or one or more required fields are missing.
* Cannot connect in standalone mode - Network-related commands are disabled in stand-alone mode.

<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/calld_versions.md' %}
