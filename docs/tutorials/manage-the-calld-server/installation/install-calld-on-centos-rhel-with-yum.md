# Install on CentOS/Red Hat with yum

This page describes the recommended instructions for installing the latest stable version of `calld` on **CentOS 7** or **Red Hat Enterprise Linux 7**, using Call's [yum](https://en.wikipedia.org/wiki/Yellowdog_Updater,_Modified) repository.

These instructions install a binary that has been compiled by Call.


## Prerequisites

Before you install `calld`, you must meet the [System Requirements](system-requirements.html).


## Installation Steps

1. Install the Call RPM repository:

        $ cat << REPOFILE | sudo tee /etc/yum.repos.d/call.repo
        [call-stable]
        name=CALL Ledger Packages
        baseurl=https://repos.call.com/repos/calld-rpm/stable/
        enabled=1
        gpgcheck=0
        gpgkey=https://repos.call.com/repos/calld-rpm/stable/repodata/repomd.xml.key
        repo_gpgcheck=1
        REPOFILE

2. Fetch the latest repo updates:

        $ sudo yum -y update

3. Install the new `calld` package:

        $ sudo yum install calld

    Version 1.3.1 does not require any changes to your config files (`calld.cfg` and `validators.txt`). This update procedure leaves your existing config files in place.

4. Reload systemd unit files:

        $ sudo systemctl daemon-reload

5. Configure the `calld` service to start on boot:

        $ sudo systemctl enable calld.service

6. Start the `calld` service:

        $ sudo systemctl start calld.service


## Next Steps

{% include '_snippets/post-calld-install.md' %}<!--_ -->

## See Also

- [Update Automatically on Linux](update-calld-automatically-on-linux.html)
- [Install calld on Ubuntu Linux](install-calld-on-ubuntu.html) (Pre-built binary for Ubuntu or Debian)
- [Build and Run `calld` on Ubuntu](build-run-calld-ubuntu.html) (Compile `calld` yourself on Ubuntu)
- [Build and Run `calld` on macOS](build-run-calld-macos.html) (Compile `calld` yourself on macOS)
- [Compilation instructions for other platforms](https://github.com/callchain/call-lib/tree/develop/Builds)
