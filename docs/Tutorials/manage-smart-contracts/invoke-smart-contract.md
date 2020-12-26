# Invoke Smart Contract

## Smart Contract Payment

When account is set code and it is a destination in a payment tranction. Its code will be invoked by the payment transaction. User can attach `Args` arguments in the transaction. User can ignore account code when set [tfNoCodeCall](payment.html#payment-flags) flags in payment transaction.

## Query Contract Information

Smart contract contains contract code and contract data. Contract code is set in [AccountRoot](accountroot.html), contract data is stored in [ParamRoot](paramroot.html). User can use [contract_info](contract_info.html) command to query contract data information.
