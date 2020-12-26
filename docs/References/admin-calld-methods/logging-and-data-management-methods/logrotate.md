# logrotate
[[Source]<br>](https://github.com/callchain/call-lib/blob/743bd6c9175c472814448ea889413be79dfd1c07/src/call/rpc/handlers/LogRotate.cpp "Source")

The `logrotate` command closes and reopens the log file. This is intended to help with log rotation on Linux file systems.

Most Linux systems come preinstalled with a [`logrotate`](https://linux.die.net/man/8/logrotate) program, which is separate from this command. Application specific log rotation scripts are placed in `/etc/logrotate.d`

The following script is a sample that can be created as `/etc/logrotate.d/calld`

```
/var/log/calld/*.log {
  daily
  minsize 200M
  rotate 7
  nocreate
  missingok
  notifempty
  compress
  compresscmd /usr/bin/nice
  compressoptions -n19 ionice -c3 gzip
  compressext .gz
  postrotate
    /opt/call/bin/calld --conf /opt/call/etc/calld.cfg logrotate
  endscript
}
```

You can configure parameters such as `minsize` and `rotate` depending on the amount of logs you keep. Use the `log_level` setting in your `calld.cfg` file to configure how verbose your server's logs are. This sample script is based on standard `log_level` and will store approximately 2 weeks worth of logs in a compressed format.

Starting with `calld` 1.3, the script `/etc/logrotate.d/calld` will be automatically installed by the DEB and RPM packages. You can make modifications to this as required. Your modifications will not be overwritten on package upgrades.

**Note:** You should have only one system logrotate script per application. Please ensure that you do not have any other log rotation that handles the same directory.

_The `logrotate` method is an [admin method](admin-calld-methods.html) that cannot be run by unprivileged users._

### Request Format
An example of the request format:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```
{
    "id": "lr1",
    "command": "logrotate"
}
```

*Commandline*

```
calld logrotate
```

<!-- MULTICODE_BLOCK_END -->

The request includes no parameters.

### Response Format

An example of a successful response:

<!-- MULTICODE_BLOCK_START -->

*JSON-RPC*

```
200 OK
{
   "result" : {
      "message" : "The log file was closed and reopened.",
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
      "message" : "The log file was closed and reopened.",
      "status" : "success"
   }
}

```

<!-- MULTICODE_BLOCK_END -->

The response follows the [standard format][], with a successful result containing the following fields:

| `Field`   | Type   | Description                                             |
|:----------|:-------|:--------------------------------------------------------|
| `message` | String | On success, contains the message `The log file was closed and reopened.` |

### Possible Errors

* Any of the [universal error types][].

<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/calld_versions.md' %}
