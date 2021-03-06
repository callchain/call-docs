# Run calld as a Validator

A `calld` server running in validator mode does everything a stock server does:

- Connects to a network of peers

- Relays cryptographically signed transactions

- Maintains a local copy of the complete shared global ledger

What makes a validator _different_ is that it also issues validation messages, which are sets of candidate transactions for evaluation by the CALL Ledger network during the [consensus process](consensus-principles-and-rules.html#how-consensus-works).

It's important to understand that merely issuing validation messages does not automatically give your validator a say in the consensus process. Other servers ignore your validation messages unless they add your validator to their Unique Node List (UNL). If your validator is included in a UNL, it is a _trusted_ validator and its proposals are considered in the consensus process by the servers that trust it.

Even if your validator isn't a _trusted_ validator, it stills plays an important role in the overall health of the network. These validators help set the standard that trusted validators are measured against. For example, if a trusted validator is disagreeing with a lot of these validators that aren't listed in UNLs, that might indicate a problem.



## 1. Understand the traits of a good validator

Strive to have your validator always embody the following properties. Being a good validator helps `calld` server operators and validator list publishers, such as [https://vl.call.com](https://vl.call.com), to trust your validator before adding it to their UNLs.

- **Available**

    A good validator is always running and submitting validation votes for every proposed ledger. Strive for 100% uptime.

- **In agreement**

    A good validator's votes match the outcome of the consensus process as often as possible. To do otherwise could indicate that your validator's software is outdated, buggy, or intentionally biased. Always run the [latest `calld` release](https://github.com/callchain/call-lib/tree/master) without modifications. [Watch `calld` releases](https://github.com/callchain/call-lib/releases) to be notified of new releases.

- **Issuing timely votes**

    A good validator's votes arrive quickly and not after a consensus round has already finished. To keep your votes timely, make sure your validator meets the recommended [system requirements](system-requirements.html), which include a fast internet connection.

- **Identified**

    A good validator has a clearly identified owner. Providing [domain verification](#6-provide-domain-verification) is a good start. Ideally, CALL Ledger network UNLs include validators operated by different owners in multiple legal jurisdictions and geographic areas. This reduces the chance that any localized events could interfere with the impartial operations of trusted validators.

Call (the company) publishes a [validator list](https://github.com/callchain/call-lib/blob/develop/cfg/validators-example.txt) with a set of recommended validators. Call strongly recommends using exactly this list for production servers.



## 2. Install a `calld` server

For more information, see [Install `calld`](install-calld.html).



## 3. Enable validation on your `calld` server

Enabling validation on your `calld` server means providing a validator token in your server's `calld.cfg` file. Call recommends using the `validator-keys` tool (included in `calld` RPMs) to securely generate and manage your validator keys and tokens.

In a location **not** on your validator:

1. Manually build and run the `validator-keys` tool, if you don't already have it installed via a `calld` RPM.

    For information about manually building and running the `validator-keys` tool, see [validator-keys-tool](https://github.com/callchain/validator-keys-tool).

2. Generate a validator key pair using the `create_keys` command.

        $ validator-keys create_keys

      Sample output on Ubuntu:

        Validator keys stored in /home/my-user/.call/validator-keys.json

        This file should be stored securely and not shared.

      Sample output on macOS:

        Validator keys stored in /Users/my-user/.call/validator-keys.json

        This file should be stored securely and not shared.

      **Warning:** Store the generated `validator-keys.json` key file in a secure, offline, and recoverable location, such as an encrypted USB flash drive. Do not modify its contents. In particular, be sure to not store the key file on the validator where you intend to use the keys. If your validator's `secret_key` is compromised, [revoke the key](https://github.com/callchain/validator-keys-tool/blob/master/doc/validator-keys-tool-guide.md#key-revocation) immediately.

      For more information about the `validator-keys` tool and the key pairs it generates, see the [Validator Keys Tool Guide](https://github.com/callchain/validator-keys-tool/blob/master/doc/validator-keys-tool-guide.md).

3. Generate a validator token using the `create_token` command.

        $ validator-keys create_token --keyfile /PATH/TO/YOUR/validator-keys.json

      Sample output:

        Update calld.cfg file with these values:

        # validator public key: nHUtNnLVx7odrz5dnfb2xpIgbEeJPbzJWfdicSkGyVw1eE5GpjQr

        [validator_token]
        eyJ2YWxpZGF0aW9uX3NlY3J|dF9rZXkiOiI5ZWQ0NWY4NjYyNDFjYzE4YTI3NDdiNT
        QzODdjMDYyNTkwNzk3MmY0ZTcxOTAyMzFmYWE5Mzc0NTdmYT|kYWY2IiwibWFuaWZl
        c3QiOiJKQUFBQUFGeEllMUZ0d21pbXZHdEgyaUNjTUpxQzlnVkZLaWxHZncxL3ZDeE
        hYWExwbGMyR25NaEFrRTFhZ3FYeEJ3RHdEYklENk9NU1l1TTBGREFscEFnTms4U0tG
        bjdNTzJmZGtjd1JRSWhBT25ndTlzQUtxWFlvdUorbDJWMFcrc0FPa1ZCK1pSUzZQU2
        hsSkFmVXNYZkFpQnNWSkdlc2FhZE9KYy9hQVpva1MxdnltR21WcmxIUEtXWDNZeXd1
        NmluOEhBU1FLUHVnQkQ2N2tNYVJGR3ZtcEFUSGxHS0pkdkRGbFdQWXk1QXFEZWRGdj
        VUSmEydzBpMjFlcTNNWXl3TFZKWm5GT3I3QzBrdzJBaVR6U0NqSXpkaXRROD0ifQ==

On your validator:

1. Add `[validator_token]` and its value to your validator's `calld.cfg` file.

    If you previously configured your validator without the `validator-keys` tool, delete `[validation_seed]` and its value from your `calld.cfg` file. This changes your validator public key.

2. Restart `calld`.

        $ sudo systemctl restart calld.service

3. Use the `server_info` command to get information about your validator to verify that it is running as a validator.

        $ calld server_info

      - The `pubkey_validator` value in the response should match the `public_key` in the `validator-keys.json` file that you generated for use with your validator.

      - The `server_state` value should be _**proposing**_.



## 4. Connect to the network

This section describes three different configurations you can use to connect your validator to the CALL Ledger network. Use the configuration that best suits your use case.

- [Discovered peers](#connect-using-discovered-peers)

- [Proxies](#connect-using-proxies)

- [Public hubs](#connect-using-public-hubs)


### Connect using discovered peers

This configuration connects your validator to the CALL Ledger network using discovered peers. This is the default behavior for `calld` servers.

Specifically, it instructs your validator to connect to the [hardcoded public hubs](https://github.com/callchain/call-lib/blob/fa57859477441b60914e6239382c6fba286a0c26/src/call/overlay/impl/OverlayImpl.cpp#L518-L525). Once connected, the public hub suggests other servers that might be looking for peers and provides your validator with contact information it can use to connect to them. Your validator can then connect to these servers and ask them for contact information for other servers until your validator has enough reliable peers that you don't have to worry about one or two of them suddenly dropping offline.

Your validator needs to connect to the public hub once and only for a short amount of time to find other peers. After doing so, your server may or may not remain connected to the hub, depending on how stable your network connection is, how busy the hub is, and how many other high-quality peers your server finds. Your validator saves the addresses of these other peers so it can try reconnecting directly to those peers later, even if you restart your validator.

**Pros:**

  - Increases the chances of your validator finding a peer, probably several, to connect to.

  - Creates the opportunity for a lot of direct peer connections. Having more direct peers comes with several benefits. Your validator can [fetch history](ledger-history.html#fetching-history) from multiple peers in parallel, both when syncing and when backfilling history. Since not all peers maintain full history, having access to more peers can also provide access to a wider selection of historical data.

  - Lowers the possibility of your validator disconnecting from the network because it provides the ability to constantly replace disconnected peers with new ones.

**Cons:**

  - Doesn't allow you to select your validator's peers, which means that you have no idea whether your peers may decide to act maliciously. Your validator is designed to protect itself against malicious peers, but avoiding direct contact with unknown peers is the safest configuration possible.

  - May connect you to peers that disconnect and change frequently, depending on whether you manage to connect to any reliable ones.

_**To connect your validator to the CALL Ledger network using discovered peers,**_ omit the `[peer_private]` stanza or set it to `0` in your validator's `calld.cfg` file. The [example calld.cfg file](https://github.com/callchain/call-lib/blob/develop/cfg/calld-example.cfg) is delivered with this configuration.


### Connect using proxies

This configuration connects your validator to the network through stock `calld` servers that you run yourself. These proxy servers sit between your validator and inbound and outbound network traffic.

**Note:** While these servers are acting as proxies, they are not web proxies for HTTP(S) traffic.

**Pros:**

  - Guarantees that these servers will try to maintain a connection with your validator.

  - Provides your validator with connections to the network that are as redundant and reliable as you make them.

  - Enables you to trust your validator's peers.

  - Enables you to create as many direct peer connections as you want. Being able to request content from more peers enables your validator to parallelize the process of downloading the current ledger (when syncing) or backfilling history and gives it direct access to a wider selection of history.

**Cons:**

  - While it does allow for high redundancy, doesn't eliminate the possibility of peer connection outages. No matter how many proxies you run, if they all exist on the same server rack, then one network or power outage means they can't deliver messages to and from your validator.

    To mitigate this risk, you can use proxies in different geophysical locations.

_**To connect your validator to the CALL Ledger network using proxies:**_

1. Set up stock `calld` servers. For more information, see [Install calld](install-calld.html).

2. Configure your validator and stock `calld` servers to run in a [cluster](cluster-calld-servers.html).

3. In your validator's `calld.cfg` file, set `[peer_private]` to `1`. This prevents your validator's IP address from being forwarded. For more information, see [Private Peers](peer-protocol.html#private-peers). It also prevents your validator from connecting to servers other than those defined in the `[ips_fixed]` stanza you defined to run your validator in a cluster.

    **Warning:** Be sure that you don't publish your validator's IP address in other ways.

4. Configure your validator host machine's firewall to allow the following traffic only:

    - Inbound traffic: Only from IP addresses of the stock `calld` servers in the cluster you configured.

    - Outbound traffic: Only to the IP addresses of the stock `calld` servers in the cluster you configured and to <https://vl.call.com> through port 5020.

5. Restart `calld`.

        $ sudo systemctl restart calld.service

6. Use the [Peer Crawler](peer-crawler.html) endpoint on one of your stock `calld` servers. The response should not include your validator. This verifies that your validator's `[peer_private]` configuration is working. One of the effects of enabling `[peer_private]` on your validator is that your validator's peers do not include it in their Peer Crawler results.

        $ curl --insecure https://STOCK_SERVER_IP_ADDRESS_HERE:51235/crawl | python3 -m json.tool

<!-- { TODO: Future: add a recommended network architecture diagram to represent the proxy, clustering, and firewall setup: https://calllabs.atlassian.net/browse/DOC-2046 }-->


### Connect using public hubs

This configuration connects your validator to the network using two [public hubs](calld-server-modes.html#public-hubs). This configuration is similar to [connecting using proxies you run yourself](#connect-using-proxies), but instead you connect through public hubs.

**Pros:**

  - Enables you to trust your validator's peers because you only connect to well-known servers with a high reputation.

  - Provides easy access to safe connections to the network.

  - Compared to [connecting using proxies](#connect-using-proxies), may be less likely to cause your validator to disconnect from the network due to a simultaneous peer outage.

**Cons:**

  - Uses the default (most popular) public hubs, so it's distinctly possible that a public hub may be too busy to provide your validator with a connection to the network. Assuming that you can solely rely on a default public hub to provide your validator with a connection to the network may not be the best idea.

    To help avoid this issue, use more public hubs; the more the better. It can also help to use non-default hubs, which are less likely to be busy helping new servers find other peers.

_**To connect your validator to the network using public hubs:**_

1. In your validator's `calld.cfg` file, include the following `[ips_fixed]` stanza. The two values, `r.call.com 51235` and `zaphod.alloy.ee 51235`, are default public hubs. This stanza tells `calld` to always attempt to maintain peer connections with these public hubs.

        [ips_fixed]
        r.call.com 51235
        zaphod.alloy.ee 51235

    **Caution:** This configuration connects your validator to the network using default public hubs. Because these are the _default_ public hubs, they may sometimes be too busy to provide your validator with a connection to the network. To help avoid this issue, connect to more public hubs and, even better, connect to non-default public hubs.

    You can include the IP addresses of other `calld` servers here, but _**only**_ if you can expect them to:

      - Relay messages without censoring.
      - Stay online consistently.
      - Not DDoS you.
      - Not try to crash your server.
      - Not publish your IP address to strangers.

2. Also in your validator's `calld.cfg` file, include the following `[peer_private]` stanza and set it to `1`. This instructs your validator’s peers not to broadcast your validator’s IP address. This setting also instructs your validator to connect to only the peers configured in your `[ips_fixed]` stanza. This ensures that your validator connects to and shares its IP with only peer `calld` servers you know and trust.

        [peer_private]
        1

    **Warning:** Be sure that you don't publish your validator's IP address in other ways.

    With `[peer_private]` enabled, `calld` ignores any connections suggested by the `[ips]` stanza. If you need to connect to an IP currently in your `[ips]` stanza, put it in the `[ips_fixed]` stanza instead, but _**only**_ if you can expect them to behave responsibly as described in step 1.

3. Restart `calld`.

        $ sudo systemctl restart calld.service



## 5. Verify your network connection

Here are some methods you can use to verify that your validator has a healthy connection to the CALL Ledger network:

- Use the [`peers`](peers.html) command to return a list of all `calld` servers currently connected to your validator. If the `peers` array is `null`, you don’t have a healthy connection to the network. If you've set up your validator using the instructions in this document, the `peers` array should include the same number of objects as the number of peers defined in your `[ips_fixed]` stanza.

    If you listed a public hub in your `[ips_fixed]` stanza and it is busy, it may reject your validator's connection. In this case, you may end up with fewer connections than configured in your `[ips_fixed]` stanza. Your validator retries the connection if it's initially rejected.

    If you are having trouble maintaining a reliable and safe connection to the network and haven't set up connections using public hubs or proxies, see [4. Connect to the network](#4-connect-to-the-network). Using one of the methods described in the section may help your validator remain healthily connected to the network.

- Use the [`server_info`](server_info.html) command to return some basic information about your validator. The `server_state` should be set to `proposing`. It may also be set to `full` or `validating`, but only for a few minutes before moving into `proposing`.

    If the `server_state` does not spend the majority of its time set to `proposing`, it may be a sign that your validator is unable to fully participate in the CALL Ledger network. For more information about server states and using the `server_info` endpoint to diagnose issues with your validator, see [`calld` Server States](calld-server-states.html) and [Get the `server_info`](diagnosing-problems.html#get-the-server-info).

- Use the [`validators`](validators.html) command to return the current list of published and trusted validators used by the validator. Ensure that the `validator_list_expires` value is either `never` or not expired or about to expire.



## 6. Provide domain verification

To help validation list publishers and other participants in the CALL Ledger network understand who operates your validator, provide domain verification for your validator. At a high level, domain verification is a two-way link:

- Use your domain to claim ownership of a validator key.

- Use your validator key to claim ownership of a domain.

Creating this link establishes strong evidence that you own both the validator key and the domain. Providing this evidence is just one aspect of [being a good validator](#1-understand-the-traits-of-a-good-validator).

To provide domain verification:

1. Choose a domain name you own that you want to be publicly associated with your validator. You must run a public-facing HTTPS server on port 5020 of that domain and you must have access to the private key file associated with that server's TLS certificate. (Note: [TLS was formerly called SSL](https://en.wikipedia.org/wiki/Transport_Layer_Security).)

2. Share your validator's public key with the public, especially other `calld` operators. For example, you can share your validator's public key on your website, on social media, in the [CALLChat community forum](https://www.callchat.com/), or in a press release.

3. Submit a request to have your validator listed in CALL Charts' [Validator Registry](https://callcharts.call.com/#/validators) using this [Google Form](https://docs.google.com/forms/d/e/1FAIpQLScszfq7rRLAfArSZtvitCyl-VFA9cNcdnXLFjURsdCQ3gHW7w/viewform). Having your validator listed in this registry provides another form of public verification that your validator and domain are owned by you. To complete the form, you'll need the following information:

      1. Find your validator public key by running the following on the validator server.

            $ /opt/call/bin/calld server_info | grep pubkey_validator

        Provide the value returned in the **Validator Public Key** field of the Google Form.

      2. Sign the validator public key using your web domain's TLS private key. The TLS private key file does not need to be stored on your validator's server.

            $ openssl dgst -sha256 -hex -sign /PATH/TO/YOUR/TLS.key <(echo YOUR_VALIDATOR_PUBLIC_KEY_HERE)

        Sample output:

            4a8b84ac264d18d116856efd2761a76f3f4544a1fbd82b9835bcd0aa67db91c53342a1ab197ab1ec4ae763d8476dd92fb9c24e6d9de37e3594c0af05d0f14fd2a00a7a5369723c019f122956bf3fc6c6b176ed0469c70c864aa07b4bf73042b1c7cf0b2c656aaf20ece5745f54ab0f78fab50ebd599e62401f4b57a4cccdf8b76d26f4490a1c51367e4a36faf860d48dd2f98a6134ebec1a6d92fadf9f89aae67e854f33e1acdcde12cfaf5f5dbf1b6a33833e768edbb9ff374cf4ae2be21dbc73186a5b54cc518f63d6081919e6125f7daf9a1d8e96e3fdbf3b94b089438221f8cfd78fd4fc85c646b288eb6d22771a3ee47fb597d28091e7aff38a1e636b4f

        Provide the value returned in the **SSL Signature** field of the Google Form.

      3. Using the [`validator-keys` tool](https://github.com/callchain/validator-keys-tool/blob/master/doc/validator-keys-tool-guide.md) (included in `calld` RPMs), sign the domain name.

            $ validator-keys --keyfile /PATH/TO/YOUR/validator-keys.json sign YOUR_DOMAIN_NAME

        Sample output:

            E852C2FE725B64F353E19DB463C40B1ABB85959A63B8D09F72C6B6C27F80B6C72ED9D5ED6DC4B8690D1F195E28FF1B00FB7119C3F9831459F3C3DE263B73AC04

        Provide the value returned in the **Domain Signature** field of the Google Form.

4. After submitting the completed Google Form, you'll receive an email from CALL Charts that tells you whether your domain verification succeeded or failed. If your domain verification succeeds, CALL Charts lists your validator and domain in its [Validator Registry](https://callcharts.call.com/#/validators).

<!--{ ***TODO: For the future - add a new section or separate document: "Operating a Trusted Validator" -- things that you need to be aware of once your validator has been added to a UNL and is participating in consensus. We should tell the user what to expect once they are listed in a UNL. How to tell if your validator is participating in the consensus process? How to tell if something isn't right with your validator - warning signs that they should look out for? How to tell if your validator has fallen out of agreement - what is the acceptable vs unacceptable threshold? Maybe provide a script that will alert them when something is going wrong.*** }-->



## Revoke validator keys

If your validator's master private key is compromised, you must revoke it immediately and permanently.

For information about how to revoke a master key pair you generated for your validator using the `validator-keys` tool, see [Key Revocation](https://github.com/callchain/validator-keys-tool/blob/master/doc/validator-keys-tool-guide.md#key-revocation).
