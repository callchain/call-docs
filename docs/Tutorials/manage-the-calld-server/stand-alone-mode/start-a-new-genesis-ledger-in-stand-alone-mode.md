# Start a New Genesis Ledger in Stand-Alone Mode

In stand-alone mode, you can have `calld` create a new genesis ledger. This provides a known state, with none of the ledger history from the production CALL Ledger. (This is very useful for unit tests, among other things.)

* To start `calld` in stand-alone mode with a new genesis ledger, use the `-a` and `--start` options:

```
calld -a --start --conf=/path/to/calld.cfg
```

For more information on the options you can use when starting `calld` in stand-alone mode, see [Commandline Usage: Stand-Alone Mode Options](commandline-usage.html#stand-alone-mode-options).

In a genesis ledger, the [genesis address](accounts.html#special-addresses) holds all 100 billion CALL. The keys of the genesis address are [hardcoded](https://github.com/callchain/call-lib/blob/94ed5b3a53077d815ad0dd65d490c8d37a147361/src/call/app/ledger/Ledger.cpp#L184) as follows:

**Address:** `rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh`

**Secret:** `snoPBrXtMeMyMHUVTgbuqAfg1SUTb` ("masterpassphrase")

## Settings in New Genesis Ledgers

In a new genesis ledger, the hard-coded default [Reserve](reserves.html) is **200 CALL** minimum for funding a new address, with an increment of **50 CALL** per object in the ledger. These values are higher than the current reserve requirements of the production network. (See also: [Fee Voting](fee-voting.html))

By default, a new genesis ledger has no [amendments](amendments.html) enabled. If you start a new genesis ledger with `--start`, the genesis ledger contains an [EnableAmendment pseudo-transaction](enableamendment.html) to turn on all amendments natively supported by the `calld` server, except for amendments that you explicitly disable in the config file. The effects of those amendments are available starting from the very next ledger version. (Reminder: in stand-alone mode, you must [advance the ledger manually](advance-the-ledger-in-stand-alone-mode.html).) [New in: calld 0.50.0][]

<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}			
{% include '_snippets/tx-type-links.md' %}			
{% include '_snippets/calld_versions.md' %}
