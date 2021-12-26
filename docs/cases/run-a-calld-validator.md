# Run a calld Validator

Each `calld` server (not running in stand-alone mode) connects to a network of peers, relays cryptographically signed transactions, and maintains a local copy of the complete shared global ledger. A `calld` server running in validator mode additionally participates in the consensus process and is a part of an interconnected web of validators who each trust a specific set of validators not to collude. Here’s a roadmap to the high-level tasks you’ll need to perform to run a `calld` validator.


## Understand what it means to run a validator

If you or your organization relies on the CALL Ledger, it is in your interest to run a validator to participate in the consensus process and provide a trusted validator that supports the ongoing decentralization of the CALL Ledger.

If you are an independent developer, you may want to run a validator as a way to participate in and dive into the technology that supports the CALL Ledger network.

While validator diversity is important, not every validator is likely to be widely trusted and validator list publishers may require validators to meet stringent criteria before they list them on validator lists.

Despite that, it is important to note that every validator contributes to the long-term health and decentralization of the CALL Ledger.

[Understand what it means to run a validator >](calld-server-modes.html#reasons-to-run-a-validator)

## Set up and run a `calld` server

Install and run a `calld` server. Anyone can run their own `calld` server that follows the network and keeps a complete copy of the CALL Ledger.

For configuration guidance and network and hardware requirements, see [Capacity Planning](capacity-planning.html).

[Set up and run a calld server >](manage-the-calld-server.html)

## Enable validation on your calld server

To configure your `calld` server to run in validator mode, generate a validator key pair and add it to your `calld.cfg` file.

[Learn more about validation >](run-calld-as-a-validator.html)

## Set up a stock calld server as a proxy

To protect a production validator from DDoS attacks, you can use a stock `calld` server as a proxy between the validator and the outside network.

[Set up a proxy >](run-calld-as-a-validator.html#connect-using-proxies)

## Associate your validator with a web domain you control

Network participants are unlikely to trust a validator without knowing who is operating it. To address this concern, associate your validator with a web domain you control.
You may also wish to have your validator listed with one or more validator tracking services, such as the [CALL Charts Validator Registry](https://callcharts.call.com/#/validators).

[Associate your validator >](run-calld-as-a-validator.html#6-provide-domain-verification)

### Related Tasks

- [Contribute Code to `calld`](contribute-code-to-calld.html)

