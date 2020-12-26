# Contribute Code to call-lib

Want to contribute code or a bug report to help improve `call-lib`, the official client library for [CallAPI](callapi-reference.html)? CallAPI is a JavaScript API for interacting with the CALL Ledger. Here’s a roadmap to the high-level tasks that’ll have you reviewing code and functionality in no time.


<!-- USE_CASE_STEPS_START -->
{% set n = cycler(* range(1,99)) %}

<span class="use-case-step-num">{{n.next()}}</span>
## Access the `call-lib` repo

`call-lib` is an open-source project. You can take a look at `call-lib` code simply by accessing the `call-lib` GitHub repo. Before contributing or reporting bugs, we recommend that you get to know the code and developer experience by performing the following tasks.

<span class="use-case-external-link btn btn-outline-secondary external-link">[Access the `call-lib` repo](https://github.com/callchain/call-lib)</span>

<span class="use-case-step-num">{{n.next()}}</span>
## Set up and run a calld server

CallAPI is an API for interacting with the CALL Ledger. The core peer-to-peer server that manages the CALL Ledger is `calld`. Optionally, you can set up and run a `calld` server to understand its developer experience and functionality. Anyone can run their own `calld` server that follows the network and keeps a complete copy of the CALL Ledger.

[Set up and run a calld server >](manage-the-calld-server.html)

<span class="use-case-step-num">{{n.next()}}</span>
## Set up your `call-lib` development environment

`call-lib` requires Node.js and a few dependencies. We recommend using [Node.js v10 LTS](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/) dependency management. Also, be sure to create your own fork of the `call-lib` repository on GitHub so you can contribute pull requests to the official repo.

[Set up your development environment >](get-started-with-callapi-for-javascript.html#environment-setup)

<span class="use-case-step-num">{{n.next()}}</span>
## Run your first `call-lib` script

Examine and run the `get-account-info.js` script. Use it to get a feel for how CallAPI scripts work and to verify that your CallAPI interface is working.

[Run your first script >](get-started-with-callapi-for-javascript.html#first-callapi-script)

<span class="use-case-step-num">{{n.next()}}</span>
## Contribute code

Now that you have a handle on `call-lib`, you may have ideas for how to improve it.

Perhaps you’re developing on the CALL Ledger and want to contribute some code that enables `call-lib` to provide a feature your application needs.

Need some inspiration? Take a look at our list of [Help Wanted issues](https://github.com/callchain/call-lib/issues?utf8=%E2%9C%93&q=label%3A%22help+wanted%22)

Access the `call-lib` repo and open an issue or pull request.

<span class="use-case-external-link btn btn-outline-secondary external-link">[Contribute code](https://github.com/callchain/call-lib/pulls)</span>

<span class="use-case-step-num">{{n.next()}}</span>
## Report bugs

As you explore `call-lib`, you may find code that you don’t think is working as intended. To report a bug, [open an issue](https://github.com/callchain/call-lib/issues) in the `call-lib` repo.

If the bug you wish to report is security-related, we urge you to disclose it responsibly through Call's [Bug Bounty program](http://www.callchain.live/bug-bounty/).

<span class="use-case-external-link btn btn-outline-secondary external-link">[Report bugs](https://github.com/callchain/call-lib/issues)</span>