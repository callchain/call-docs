# stop
[[Source]<br>](https://github.com/callchain/call-lib/blob/master/src/call/rpc/handlers/Stop.cpp "Source")

Gracefully shuts down the server.

*The `stop` method is an [admin method](admin-calld-methods.html) that cannot be run by unprivileged users!*

### Request Format
An example of the request format:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```
{
    "id": 0,
    "command": "stop"
}
```

*JSON-RPC*

```
{
    "method": "stop",
    "params": [
        {}
    ]
}
```

*Commandline*

```
calld stop
```

<!-- MULTICODE_BLOCK_END -->

The request includes no parameters.

### Response Format

An example of a successful response:

<!-- MULTICODE_BLOCK_START -->

*JSON-RPC*

```
{
   "result" : {
      "message" : "call server stopping",
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
      "message" : "call server stopping",
      "status" : "success"
   }
}
```

<!-- MULTICODE_BLOCK_END -->

The response follows the [standard format][], with a successful result containing the following fields:

| `Field`   | Type   | Description                          |
|:----------|:-------|:-------------------------------------|
| `message` | String | `call server stopping` on success. |

### Possible Errors

* Any of the [universal error types][].

<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/calld_versions.md' %}
