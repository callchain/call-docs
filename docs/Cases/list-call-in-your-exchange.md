# List CALL in Your Exchange

Does your exchange want to list CALL, enabling your users to deposit, trade, and withdraw CALL? Here's a roadmap to the high-level tasks you'll need to perform.

<!-- USE_CASE_STEPS_START -->
{% set n = cycler(* range(1,99)) %}

<span class="use-case-step-num">{{n.next()}}</span>
## Meet prerequisites for listing CALL

Put in place the foundation and operational processes needed to efficiently and securely list CALL in your exchange.

This includes creating and securing CALL Ledger accounts, implementing internal balance sheets, adopting appropriate security procedures, and complying with any applicable regulations.

[Learn more about prerequisites >](list-call-as-an-exchange.html#prerequisites-for-supporting-call)

<span class="use-case-step-num">{{n.next()}}</span>
## Set up and run a `calld` server

`calld` is the core peer-to-peer server that manages the CALL Ledger.

While it isn’t required, your exchange should consider running your own `calld` server to be able to control the speed and reliability of your exchange’s CALL transaction processing.

You can start out running one `calld` server to support development and exploration. If required for your use case, you can then build up to an enterprise deployment that consists of multiple clustered servers with one private-peer validator, for example.

[Running a `calld` server in validator mode](run-a-calld-validator.html) enables your exchange to contribute to the strength and decentralization of the CALL Ledger network. Even if your `calld` server isn’t included in published validator lists, it is still contributing (albeit indirectly) and continues to build up reputation over time.

[Set up calld >](manage-the-calld-server.html)
<!--{# Using code font on "calld" here breaks the buttonize effect #}-->

<span class="use-case-step-num">{{n.next()}}</span>
## Try out CALL Ledger integration tools

Take a look at the various tools provided to help you integrate with the CALL Ledger.

From WebSocket and JSON-RPC API endpoints to the CallAPI JavaScript library, find a mode of integration that works with your technology.

[Get started with API tools >](get-started-with-the-calld-api.html)

<span class="use-case-step-num">{{n.next()}}</span>
## Get a sandbox CALL Ledger account

Use the CALL Ledger Test Net to get a sandbox account. Connect your `calld` server to the Test Net to make test calls and get to know the CALL Ledger. Once you’re ready to transact in real CALL, you can switch over to transacting on the live CALL Ledger.

[Get a Test Net account >](call-test-net-faucet.html)

<span class="use-case-step-num">{{n.next()}}</span>
## Understand and code integrations to support the flow of funds

To support listing CALL, code integrations with the CALL Ledger to deposit CALL into your exchange, trade CALL on the exchange, rebalance CALL holding, and withdraw CALL from your exchange.

[Understand the flow of funds >](list-call-as-an-exchange.html#flow-of-funds)

### Related Tasks
<div class='related-tasks-links'>

- [Contribute Code to `calld`](contribute-code-to-calld.html)
- [Listen for New Ledger Versions](subscription-methods.html)
- [Capacity Planning](capacity-planning.html)
- [Look Up an CALL Ledger Account’s Transaction History](tx_history.html)
<!-- for the future, link to Implement Destination Tags -->
</div>