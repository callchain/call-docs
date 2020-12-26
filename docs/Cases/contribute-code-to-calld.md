# Contribute Code to calld

Want to contribute code or a bug report to help improve `calld`, the core peer-to-peer server that manages the CALL Ledger? Here’s a roadmap to the high-level tasks that’ll have you reviewing code and functionality in no time.

<!-- USE_CASE_STEPS_START -->
{% set n = cycler(* range(1,99)) %}

<span class="use-case-step-num">{{n.next()}}</span>
## Access the `calld` repo

`calld` is an open-source project. You can take a look at `calld` code simply by accessing the `calld` GitHub repo. Before contributing or reporting bugs, we recommend that you get to know the code and developer experience by performing the following tasks.

<span class="use-case-external-link btn btn-outline-secondary external-link">[Access the repo](https://github.com/callchain/call-lib)</span>

<span class="use-case-step-num">{{n.next()}}</span>
## Set up and run a `calld` server

Set up and run a `calld` server to understand the developer experience and functionality of the core peer-to-peer server that manages the CALL Ledger. Anyone can run their own `calld` server that follows the network and keeps a complete copy of the CALL Ledger.

[Set up and run a server >](manage-the-calld-server.html)

<span class="use-case-step-num">{{n.next()}}</span>
## Try out CALL Ledger integration tools

Take a look at the various tools provided to help developers integrate with the CALL Ledger. From WebSocket and JSON-RPC API endpoints to the `call-lib` JavaScript library, take a look at the modes of integration offered to the developer community.

[Try out CALL Ledger integration tools >](get-started-with-the-calld-api.html)

<span class="use-case-step-num">{{n.next()}}</span>
## Get a sandbox CALL Ledger account

Use the CALL Ledger Test Net to get a sandbox account. Connect your `calld server` to the Test Net to make test calls and get to know the CALL Ledger.

[Get a sandbox CALL Ledger account >](call-test-net-faucet.html)

<span class="use-case-step-num">{{n.next()}}</span>
## Set up your development environment

A `calld` development environment has a C++ compiler, access to the necessary libraries to compile `calld` (such as Boost), and an editor for making changes to the source files. See the [`calld` repository](https://github.com/callchain/call-lib) for the latest recommendations of each. You should also create your own fork of the `calld` repository on GitHub so you can contribute pull requests to the official repo. <!-- for future, awaiting links to a few calld repo md files - Nik -->


<span class="use-case-step-num">{{n.next()}}</span>
## Familiarize yourself with `calld`'s coding style

Before you start contributing code to `calld,` take some time to familiarize yourself with the coding standards used in the `calld` repo. These standards gradually evolve and propagate through code reviews. Some aspects are enforced more strictly than others.

<span class="use-case-external-link btn btn-outline-secondary external-link">[Familiarize yourself with `calld`'s coding style](https://github.com/callchain/call-lib/blob/develop/docs/CodingStyle.md)</span>

<span class="use-case-step-num">{{n.next()}}</span>
## Contribute code

Now that you have a handle on `calld`, you may have ideas for how to improve it. Perhaps you’re developing on the CALL Ledger and want to contribute some code that enables the CALL Ledger to provide a feature your application needs. Access the `calld` repo and open an issue or pull request.

<span class="use-case-external-link btn btn-outline-secondary external-link">[Contribute code](https://github.com/callchain/call-lib/pulls)</span>

<span class="use-case-step-num">{{n.next()}}</span>
## Report bugs

As you explore `calld`, you may find code that you don’t think is working as intended. To report a bug, [open an issue](https://github.com/callchain/call-lib/issues) in the `calld` repo.

If the bug you wish to report is security-related, we urge you to disclose it responsibly through Call's [Bug Bounty program](http://www.callchain.live/bug-bounty/).

<span class="use-case-external-link btn btn-outline-secondary external-link">[Report bugs](https://github.com/callchain/call-lib/issues)</span>