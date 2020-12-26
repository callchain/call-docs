# calld Server Won't Start

This page explains possible reasons the `calld` server does not start and how to fix them.

These instructions assume you have [installed `calld`](install-calld.html) on a supported platform.


## File Descriptors Limit

On some Linux variants, you may get an error message such as the following when trying to run `calld`:

```text
WARNING: There are only 1024 file descriptors (soft limit) available, which
limit the number of simultaneous connections.
```

This occurs because the system has a security limit on the number of files a single process may open, but the limit is set too low for `calld`. To fix the problem, **root access is required**. Increase the number of files `calld` is allowed to open with the following steps:

1. Add the following lines to the end of your `/etc/security/limits.conf` file:

        *                soft    nofile          65536
        *                hard    nofile          65536

2. Check that the [hard limit on number of files that can be opened](https://ss64.com/bash/ulimit.html) is now `65536`:

        ulimit -Hn

    The command should output `65536`.

3. Try starting `calld` again.

        systemctl start calld

4. If `calld` still does not start, open `/etc/sysctl.conf` and append the following kernel-level setting:

        fs.file-max = 65536


## Failed to open /etc/opt/call/calld.cfg

If `calld` crashes on startup with an error such as the following, it means that `calld` cannot read its config file:

```text
Loading: "/etc/opt/call/calld.cfg"
Failed to open '"/etc/opt/call/calld.cfg"'.
Terminating thread calld: main: unhandled St13runtime_error 'Can not create "/var/opt/call"'
Aborted (core dumped)
```

Possible solutions:

- Check that the config file exists (the default location is `/etc/opt/call/calld.cfg`) and the user that runs your `calld` process (usually `calld`) has read permissions to the file.

- Create a config file that can be read by the `calld` user at `$HOME/.config/call/calld.cfg` (where `$HOME` points to the `calld` user's home directory).

    **Tip:** The `calld` repository contains [an example `calld.cfg` file](https://github.com/callchain/call-lib/blob/master/cfg/calld-example.cfg) which is provided as the default config when you do an RPM installation. If you do not have the file, you can copy it from there.

- Specify the path to your preferred config file using the `--conf` [commandline option](commandline-usage.html).

## Failed to open validators file

If `calld` crashes on startup with an error such as the following, it means it can read its primary config file, but that config file specifies a separate validators config file (typically named `validators.txt`), which `calld` cannot read.

```text
Loading: "/home/calld/.config/call/calld.cfg"
Terminating thread calld: main: unhandled St13runtime_error 'The file specified in [validators_file] does not exist: /home/calld/.config/call/validators.txt'
Aborted (core dumped)
```

Possible solutions:

- Check that the `[validators.txt]` file exists and the `calld` user has permissions to read it.

    **Tip:** The `calld` repository contains [an example `validators.txt` file](https://github.com/callchain/call-lib/blob/master/cfg/validators-example.txt) which is provided as the default config when you do an RPM installation. If you do not have the file, you can copy it from there.

- Edit your `calld.cfg` file and modify the `[validators_file]` setting to have the correct path to your `validators.txt` (or equivalent) file. Check for extra whitespace before or after the filename.

- Edit your `calld.cfg` file and remove the `[validators_file]` setting. Add validator settings directly to your `calld.cfg` file. For example:

        [validator_list_sites]
        https://vl.call.com

        [validator_list_keys]
        ED2677ABFFD1B33AC6FBC3062B71F1E8397C1505E1C42C64D11AD1B28FF73F4734


## Cannot create database path

If `calld` crashes on startup with an error such as the following, it means the server does not have write permissions to the `[database_path]` from its config file.

```text
Loading: "/home/calld/.config/call/calld.cfg"
Terminating thread calld: main: unhandled St13runtime_error 'Can not create "/var/lib/calld/db"'
Aborted (core dumped)
```

The paths to the configuration file (`/home/calld/.config/call/calld.cfg`) and the database path (`/var/lib/calld/db`) may vary depending on your system.

Possible solutions:

- Run `calld` as a different user that has write permissions to the database path printed in the error message.

- Edit your `calld.cfg` file and change the `[database_path]` setting to use a path that the `calld` user has write permissions to.

- Grant the `calld` user write permissions to the configured database path.


## State DB Error

The following error can occur if the `calld` server's state database is corrupted. This can occur as the result of being shutdown unexpectedly, or if you change the type of database from RocksDB to NuDB without changing the `path` and `[database_path]` settings in the config file.

```text
2018-Aug-21 23:06:38.675117810 SHAMapStore:ERR state db error:
  writableDbExists false archiveDbExists false
  writableDb '/var/lib/calld/db/rocksdb/calldb.11a9' archiveDb '/var/lib/calld/db/rocksdb/calldb.2d73'

To resume operation, make backups of and remove the files matching /var/lib/calld/db/state* and contents of the directory /var/lib/calld/db/rocksdb

Terminating thread calld: main: unhandled St13runtime_error 'state db error'
```

The easiest way to fix this problem is to delete the databases entirely. You may want to back them up elsewhere instead. For example:

```sh
mv /var/lib/calld/db /var/lib/calld/db-bak
```

Or, if you are sure you don't need the databases:

```sh
rm -r /var/lib/calld/db
```

**Tip:** It is generally safe to delete the `calld` databases, because any individual server can re-download ledger history from other servers in the CALL Ledger network.

Alternatively, you can change the paths to the databases in the config file. For example:

```
[node_db]
type=NuDB
path=/var/lib/calld/custom_nudb_path

[database_path]
/var/lib/calld/custom_sqlite_db_path
```


## Online Delete is Less Than Ledger History

An error message such as the following indicates that the `calld.cfg` file has contradictory values for `[ledger_history]` and `online_delete`.

```text
Terminating thread calld: main: unhandled St13runtime_error 'online_delete must not be less than ledger_history (currently 3000)
```

The `[ledger_history]` setting represents how many ledgers of history the server should seek to back-fill. The `online_delete` field (in the `[node_db]` stanza) indicates how many ledgers of history to keep when dropping older history. The `online_delete` value must be equal to or larger than `[ledger_history]` to prevent the server from deleting historical ledgers that it is also trying to download.

To fix the problem, edit the `calld.cfg` file and change or remove either the `[ledger_history]` or `online_delete` options. (If you omit `[ledger_history]`, it defaults to 256 ledger versions, so `online_delete`, if present, must be larger than 256. If you omit `online_delete`, it disables automatic deletion of old ledger versions.)


## Bad node_size value

An error such as the following indicates that the `calld.cfg` file has an improper value for the `node_size` setting:

```text
Terminating thread calld: main: unhandled N5beast14BadLexicalCastE 'std::bad_cast'
```

Valid parameters for the `node_size` field are `tiny`, `small`, `medium`, `large`, or `huge`. For more information see [Node Size](capacity-planning.html#node-size).


## Shard path missing

An error such as the following indicates that the `calld.cfg` has an incomplete [history sharding](history-sharding.html) configuration:

```text
Terminating thread calld: main: unhandled St13runtime_error 'shard path missing'
```

If your config includes a `[shard_db]` stanza, it must contain a `path` field, which points to a directory where `calld` can write the data for the shard store. This error means the `path` field is missing or located in the wrong place. Check for extra whitespace or typos in your config file, and compare against the [Shard Configuration Example](configure-history-sharding.html#2-edit-calldcfg).

## Unsupported shard store type: RocksDB

RocksDB is no longer supported as a backend for [history sharding](history-sharding.html). If you have an existing configuration that defines a RocksDB shard store, the server fails to start. [New in: calld 1.3.1][]

In this case, the process dies shortly after the log startup command, with a message such as the following appearing earlier in the output log:

```text
ShardStore:ERR Unsupported shard store type: RocksDB
```


To fix this problem, do one of the following, then restart the server:

- Change your shard store to use NuDB instead.
- Disable history sharding.


<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/calld_versions.md' %}
