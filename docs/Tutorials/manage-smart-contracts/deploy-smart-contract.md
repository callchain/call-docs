# Deploy Smart Contract

## Write Contract

Callchain use lua language for smart contract language. User can use contract to write lua contract and include three functions. The main function is required, others are optional. In smart contract, lua thread, coroutine and io are disabled.

```lua
function init(args)
    syscall_print("init")
    return 0
end

function check(args)
    syscall_print("check")
    return 0
end

function main(args)
    syscall_print("main")
    return 0
end
```

## Compile to Bytecode

After smart contract code is prepared, user can user [Contract Tools](https://github.com/callchain/contract-tools) to compile smart contract code to bytecode and use snappy to compress it for storage maximum utlization. Then user get compilited bytecode and can set it do their account code.

## Set Account Code

Use can use [SetAccount Transaction](setaccount.html) to set contract code to account as ***Account Code***. In setting account code, Callchain call contract's init function to do initializtion. Meantime user can set account to ***Code Account*** that account is controller only by contract code, account's secret is useless.

