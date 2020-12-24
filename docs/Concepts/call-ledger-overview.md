# CALL Ledger Overview

The **CALL Ledger** is a decentralized cryptographic ledger powered by a network of peer-to-peer servers. The CALL Ledger is the home of **CALL**, a digital asset designed to help everyone to issue owner token in worldwide. Call stewards the development of the CALL Ledger, and advances CALL as a key contribution to the _Personal Tokenize_: Everyone can issue own tokens and manage own social circle by tokens.

## The Digital Asset for Payments

CALL is a digital asset native to the CALL Ledger. Anyone with a cryptographic key and an internet connection can receive, hold, and send CALL to anyone else. CALL's creators have developed it to be a desirable bridge currency that can facilitate using new tokens. CALL has many properties which make it an appealing asset for many other use cases, too:

- **[Censorship-Resistant Transaction Processing][]:** No single party decides which CALL transactions succeed or fail, and no one can "roll back" a transaction after it completes. As long as those who choose to participate in the network keep it healthy, they can send and receive CALL in seconds.
- **[Fast, Efficient Consensus Algorithm][]:** The CALL Ledger's consensus algorithm settles transactions in 4 to 5 seconds, processing at a throughput of up to 1500 transactions per second. These properties put CALL at least an order of magnitude ahead of other top digital assets.
- **[Finite CALL Supply][]:** When the CALL Ledger began, 500 million CALL were created, and no more CALL will ever be created. (Each CALL is subdivisible down to 6 decimal places, for a grand total of 500 trillion (5*10^14) _drops_ of CALL.) The available supply of CALL will not decreases, CALL transaction costs will be collected in fee pool, and will be redistributed by community.
- **[Responsible Software Governance][]:** A team of full-time, world-class developers at Call maintain and continually improve the CALL Ledger's underlying software. Call acts as a steward for the technology and an advocate for its interests, and builds constructive relationships with governments and financial institutions worldwide.
- **[Secure, Adaptable Cryptography][]:** The CALL Ledger relies on industry standard digital signature systems like ECDSA (the same scheme used by Bitcoin) but also supports modern, efficient algorithms like Ed25519. The extensible nature of the CALL Ledger's software makes it possible to add and disable algorithms as the state of the art in cryptography advances.
- **[Real Functional Smart Contracts][]:** Call Ledger supports Smart Contract powered by tailored Lua virtual machine. It helps Call Ledger build all functions in other Smart Contact based blockchain does. Lua language is accord with Call implemented language C++. Also there are many Lua game developers, they can switch to Call Ledger Smart Contract quickly.
- **[On-Ledger Decentralized Exchange][]:** In addition to all the features that make CALL useful on its own, the CALL Ledger also has a fully-functional accounting system for tracking and trading obligations denominated in any way users want, and an exchange built into the protocol. The CALL Ledger can settle long, cross-currency payment paths and exchanges of multiple currencies in atomic transactions, bridging gaps of trust with CALL.

## Censorship-Resistant Transaction Processing
[Censorship-Resistant Transaction Processing]: #censorship-resistant-transaction-processing

CALL is part of a new class of money which includes Bitcoin and other cryptocurrencies:

- These **Decentralized digital assets** exist in computer systems without a central administrator. As long as the system is sufficiently decentralized, no one can roll back transactions, freeze balances, or block someone from using a decentralized digital asset. These assets are natively digital, so they can be used online across any distance.

This combines qualities of physical and centralized digital money. Prior to the invention of Bitcoin in 2009, all currencies could be divided into those two categories:

- **Physical coins and paper money**, which individuals can use to do business without going through a central party. As physical objects, they cannot be used online, and doing business long-distance is slow and inconvenient.
- **Centralized digital currencies**, which need an administrator to confirm transactions. The administrator also has the power to censor or roll back transactions, or disallow some individuals from using the digital currency. If the operator of a digital currency decides someone has violated its terms of service, it can freeze or even confiscate that person's money. However, as digital balances, these currencies can be used online and are convenient across long distances.

**Note:** Users of the CALL Ledger _can_ freeze non-CALL currencies issued in the CALL Ledger. For more information, see the [Freeze documentation](freezes.html).

The CALL Ledger's system of trusted validators uses a small amount of human interaction to achieve better distribution of authority than other decentralized systems. Fully-automated systems for reaching consensus from an unknown set of participants are vulnerable to concentrations of voting power. For example, Bitcoin mining is disproportionately concentrated in places with cheap electricity. As Call curates a list of distinct validators operated by different entities in different jurisdictions, the CALL Ledger can become more resistant to censorship and outside pressures than proof-of-work mining. For more information on Call's plan to decentralize the recommended set of validators.

For more information about the CALL Ledger's ability to detect censorship, see [Transaction Censorship Detection](transaction-censorship-detection.html).


## Fast, Efficient Consensus Algorithm
[Fast, Efficient Consensus Algorithm]: #fast-efficient-consensus-algorithm

The CALL Ledger's biggest difference from most cryptocurrencies is that it uses a unique consensus algorithm that does not require the time and energy of "mining", the way Bitcoin, Ethereum, and almost all other such systems do. Instead of "proof of work" or even "proof of stake", The CALL Ledger's consensus algorithm uses a system where every participant has an overlapping set of "trusted validators" and those trusted validators efficiently agree on which transactions happen in what order. As of early 2018, the amount of electricity the Bitcoin network uses per transaction is more than a family home in the USA uses in an entire day, and confirming the transaction takes hours. A single CALL transaction uses a negligible amount of electricity, and takes 4 or 5 seconds to confirm.

Furthermore, each new "ledger version" in the CALL Ledger (the equivalent of a "block") contains the full current state of all balances, so a server can synchronize with the network in minutes instead of spending hours downloading and re-processing the full transaction history.

For more information on how the CALL Ledger's consensus algorithm works, see [The CALL Ledger Consensus Process](consensus.html). For background on why the CALL Ledger uses this consensus algorithm, see [Consensus Principles and Rules](consensus-principles-and-rules.html).


## Finite CALL Supply
[Finite CALL Supply]: #finite-call-supply

Alongside war and political turmoil, hyperinflation is one of the leading causes of death for currencies. While the decentralized system of validators provides CALL with some resistance to political factors, the rules of the CALL Ledger provide a simpler solution to hyperinflation: the total supply of CALL is finite. Without a mechanism to create more, it becomes much less likely that CALL could suffer hyperinflation.

The supply of CALL available to the general public _does_ change due to a few factors:

- Sending transactions in the CALL Ledger costs a small amount of CALL that be collected in fee pool. Senders choose how much to pay, with certain minimums based on the expected work of processing the transaction and how busy the network is. If the network is busy, potential transactions that promise to pay more CALL can cut in front of the transaction queue. This is an anti-spam measure to make it prohibitively expensive to [DDoS](https://en.wikipedia.org/wiki/Denial-of-service_attack) the CALL Ledger network. For more information, see [Transaction Cost](transaction-cost.html).
- Each account in the CALL Ledger must hold a small amount of CALL in reserve. This is an anti-spam measure to disincentivize making the ledger data occupy too much space. CALL Ledger validators can vote to change the amount of CALL required as a reserve, to compensate for changes in CALL's real-world value. Now the reserve requirement reserved is 10 drops CALL. If the reserve requirement increases, CALL will be required more for lock.
- Call Ledger Smart Contract will consume CALL as fees. CALL fee is one mechanism to keep secure of Call blockchain. When fee run out or Lua bytecode run out, Smart Contract will stop. In the meantime, Smart Contract will consume reserve CALL for code and parameters storage in blockchain, see [Smart Contract](smart-contract.html).


## Responsible Software Governance
[Responsible Software Governance]: #responsible-software-governance

Any piece of software can only be as good as the developers who code and manage it. Call employs a team of world-class engineers dedicated full-time to maintaining and improving the CALL Ledger software, especially the core server, `calld`. The [source code for `calld`](https://github.com/callchain/calld/) is available to the public with a permissive open-source license, as are many other parts of the CALL Ledger ecosystem. Call engineers follow best practices for software engineering, including:

- A famously strict and thorough code review process
- Comprehensive code coverage and unit tests
- Regularly running automated checks for potential vulnerabilities and memory leaks
- Regularly commissioning external reviews by professional organizations

As an entity that is obligated to hold large amounts of CALL for the long term, Call has a strong incentive to ensure that CALL is widely used in ways that are legal, sustainable, and constructive. Call provides technical support to businesses whose goals align with Call's ideal of an Internet of Value. Call also cooperates with legislators and regulators worldwide to guide the implementation of sensible laws governing digital assets and associated businesses.


## Secure, Adaptable Cryptography
[Secure, Adaptable Cryptography]: #secure-adaptable-cryptography

Cryptography is one of the hardest parts of any distributed system, and a mistake can lead to money stolen by malicious actors anywhere in the world. The CALL Ledger uses industry-standard schemes for signing and verifying transactions, algorithms that have successfully protected hundreds of billions of US dollars' worth of value for many years. The CALL Ledger also support regular key sining functionality while your main key is keep save as a backup and . provides new algorithms with a path to migrate the keys you use if a breakthrough in cryptography makes the old algorithms obsolete. Also you can implement multi-signing functionality by deploy multi-signing Smart Contract. 

For more information, see [Cryptographic Keys](cryptographic-keys.html).


## Real Functional Smart Contracts
[Real Functional Smart Contracts]: #real-functional-smart-contracts

Besides simple value transfer with CALL payments, the CALL Ledger has several advanced features that provide useful functions for building applications that use the Personal Tokenize to serve previously unknown or impractical needs. CALL Ledger provides tools for settling contracts, while letting the applications themselves run anywhere, in whatever environment or container is appropriate. This "keep it simple" approach is flexible, scalable, and powerful.

CALL Ledger provides Lua virtual machine to run its real smart contract, and can be written, deployed and invoked by anyone.

For more information, see [Smart Contract](smart-contract.html).



## On-Ledger Decentralized Exchange
[On-Ledger Decentralized Exchange]: #on-ledger-decentralized-exchange

One of the biggest features that sets the CALL Ledger apart from other cryptocurrency networks is that it also contains a full currency exchange that runs on the CALL Ledger. Within this system, businesses (typically called "gateways") can freely issue any currency they want to customers, and those customers can freely trade issued currencies for CALL or other issued currencies issued by any gateway. The CALL Ledger can execute atomic cross-currency transactions this way, using orders in the exchange to provide liquidity.

For more information on how the decentralized exchange works, see [Decentralized Exchange](decentralized-exchange.html). For more information on the gateway business model, see the [Become an CALL Ledger Gateway](become-an-call-ledger-gateway.html).
