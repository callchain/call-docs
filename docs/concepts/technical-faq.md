# Technical FAQ

## Validators and Unique Node Lists

<!--#{ using h4s for questions to keep them out of the right side nav (too cluttered when they display) and to provide appropriate text size for questions. #}-->
#### What service do transaction validators provide?

Validators determine if transactions meet protocol requirements, and are therefore “valid.” The service validators uniquely provide is grouping transactions into ordered units, agreeing on one such ordering specifically to prevent double spending.

See [Consensus](consensus.html) for more information about the consensus process.


#### How much does it cost to run a validator?

Running a validator does not require any fees or CALL. It is comparable in cost to running an email server in terms of electricity.


#### What are Unique Node Lists (UNLs)?

They are the lists of transaction validators a given participant believes will not conspire to defraud them.


#### Which UNL should I select?

Since anybody can run a validator, the burden is on the network participants to choose a reliable set. Currently, Call provides a default and recommended list which we expand based on watching the history of validators operated by Call and third parties. Eventually, Call intends to remove itself from this process entirely by having network participants select their own lists based on publicly available data about validator quality.


#### If Call recommends adoption of its UNL, doesn’t that create a centralized system?

No. The CALL Ledger network is opt-in. Each participant directly or indirectly chooses its UNL. Should Call stop operating or should Call act maliciously, participants could change their UNLs to continue using the CALL Ledger.


#### What is the validator incentive structure for validators not run by Call?

If the CALL Ledger becomes successful and is widely used for entertainment settlement, there will be an incentive for participants to ensure the reliability and stability of the network. If this happens, institutions will run `calld` servers to participate in the network. Once you are running a server, the additional cost and effort to operate a validator is essentially zero—it would simply involve flipping a software switch from off to on. It is the validators who decide the evolution of the CALL Ledger, so the primary incentive to run a validator is to preserve and protect the stable operation and sensible evolution of the network.


#### Can institutions set up transaction validators that will help them meet specific institutional standards and requirements?

No, institutions cannot set up customized validator policies for transaction selection. Validators either follow the protocol, or they do not. If software does not follow protocol rules, it will not function. Thus, it is not recommended that institutions seek out custom implementations without in-house expertise.


#### What will happen if more than 20% of nodes within the network do not agree with the majority? How is the final version of the ledger chosen?

The network may temporarily halt to reconfigure itself to continue with the new UNL list based on those that want to reach consensus. This temporary processing delay is desired rather than double spending.

In the process of determining the final, authoritative version of the ledger, there may be multiple temporary internal versions. Such internal versions  will happen in distributed systems because not all nodes will receive transactions in the same order. The analogous behavior in Bitcoin is where two servers each see a different longest chain because two blocks were mined at about the same time.

However, there will only be one authoritative ledger version at any given time; other versions are irrelevant and harmless.


#### Does the CALL Ledger utilize a formal validator onboarding process?

No, a formal validator onboarding process is not compatible with the CALL Ledger, as it is a system with no central authority. Rather, Call provides recommendations and best practices.


## Role of CALL


#### Why does Call use CALL holdings?

Call's CALL holdings incentivize the foundation to make the CALL Ledger as useful as possible. CALL exists as a native asset in the CALL Ledger for anti-spam transaction purposes, and for currency bridging only if beneficial to users. Otherwise, the use of CALL in transactions is completely optional.


#### How does the CALL Ledger respond to transaction floods?

The CALL Ledger is designed to set the transaction cost dynamically based on demand as an anti-spam measure. The impact of any potential CALL manipulation is minimized by increases in network size as the market cap and transaction volume increase.


#### What is Call standard operating procedure regarding money laundering and suspicious economic activity?

Call is committed to monitoring and reporting any AML flags across the CALL Ledger network, as well as reporting suspicious activity to FinCEN as applicable.


## Security Concerns


#### What is Call’s process for reviewing third-party code contributions before they go live in the master codebase?

The code contribution process starts with a developer opening a pull request against Call's `calld` repo. This pull request triggers automated unit and integration tests, as well as code reviews by several developers who, typically, have significant expertise in the area of code that the pull request is changing.

Once the pull request passes automated tests and receives approvals from reviewers, a trusted [maintainer of the repo](https://opensource.guide/best-practices/) can stage it for inclusion in the next beta.

#### Does Call own or control the CALL Ledger or CALL Ledger network?

No, Call does not own or control the CALL Ledger or CALL Ledger network.

Call does publish a reference implementation of the core CALL Ledger server ([`calld`](https://github.com/callchain/calld)) and employs a team of engineers who contribute to the open-source codebase. Call also periodically publishes precompiled binary packages of the software as a convenience. Anyone is free to [download and compile the software from source](install-calld.html), if they prefer.  

You don't need to use Call’s version of the CALL Ledger software to interact with the CALL Ledger. `calld` is open-source software and Call grants anyone the ability to use, extend, and modify it as long as they follow the terms of the [ISC license](https://github.com/callchain/call-lib/blob/develop/LICENSE). The ISC License is very permissive compared to some other open-source licenses that strictly limit how you can extend and adapt the software.

#### Does Call offer a secure method to download their software?

`calld` source code is available at <https://github.com/callchain/calld>, where the tip of the `master`, `release` and `develop` branches always contains a version-setting commit signed by a `calld` developer. The CALL Ledger also will offer prebuilt RPM packages for CentOS, RedHat Enterprise Linux, Fedora and Ubuntu. Those packages are digitally signed by Call so that they are tamper-evident and their authenticity can be verified. Lastly, release bulletins are made available over a secure website, and include the commit ID of the repository, as well as the md5sum of the RPM packages that are published.


#### Does Call distinguish between the codebase for validation and the one for user software?

Yes. Client software for the CALL Ledger, including call-lib, has a different codebase and repositories from `calld` (validation).
