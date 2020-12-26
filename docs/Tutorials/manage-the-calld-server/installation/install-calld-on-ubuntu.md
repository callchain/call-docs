# Install on Ubuntu or Debian Linux

This page describes the recommended instructions for installing the latest stable version of `calld` on **Ubuntu Linux 16.04 or higher** or **Debian 9 (Stretch)**, using the [`apt`](https://help.ubuntu.com/lts/serverguide/apt.html) utility. [Updated in: calld 1.3.1][New in: calld 1.3.1]

These instructions install a binary that has been compiled by Call.


## Prerequisites

Before you install `calld`, you must meet the [System Requirements](system-requirements.html).


## Installation Steps

1. Update repositories:

        $ sudo apt -y update

2. Install utilities:

        $ sudo apt -y install apt-transport-https ca-certificates wget gnupg

3. Add Call's package-signing GPG key to your list of trusted keys:

        $ wget -q -O - "https://repos.call.com/repos/api/gpg/key/public" | \
          sudo apt-key add -

4. Check the fingerprint of the newly-added key:

        $ apt-key finger

    The output should include an entry for Call such as the following:

        pub   rsa3072 2019-02-14 [SC] [expires: 2021-02-13]
              C001 0EC2 05B3 5A33 10DC 90DE 395F 97FF CCAF D9A2
        uid           [ unknown] TechOps Team at Call <techops+calld@call.com>
        sub   rsa3072 2019-02-14 [E] [expires: 2021-02-13]

    In particular, make sure that the fingerprint matches. (In the above example, the fingerprint is on the second line, starting with `C001`.)

4. Add the appropriate Call repository for your operating system version:

        $ echo "deb https://repos.call.com/repos/calld-deb bionic stable" | \
            sudo tee -a /etc/apt/sources.list.d/call.list

    The above example is appropriate for **Ubuntu 18.04 Bionic Beaver**. For other operating systems, replace the word `bionic` with one of the following:

    - `xenial` for **Ubuntu 16.04 Xenial Xerus**
    - `stretch` for **Debian 9 Stretch**

    If you want access to development or pre-release versions of `calld`, use one of the following instead of `stable`:

    - `unstable` - Pre-release builds ([`release` branch](https://github.com/callchain/call-lib/tree/release))
    - `nightly` - Experimental/development builds ([`develop` branch](https://github.com/callchain/call-lib/tree/develop))

    **Warning:** Unstable and nightly builds may be broken at any time. Do not use these builds for production servers.

5. Fetch the Call repository.

        $ sudo apt -y update

6. Install the `calld` software package:

        $ sudo apt -y install calld

7. Check the status of the `calld` service:

        $ systemctl status calld.service

    The `calld` service should start automatically. If not, you can start it manually:

        $ sudo systemctl start calld.service

    To configure it to start automatically on boot:

        $ sudo systemctl enable calld.service



## Next Steps

{% include '_snippets/post-calld-install.md' %}


<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}			
{% include '_snippets/tx-type-links.md' %}			
{% include '_snippets/calld_versions.md' %}
