# calld v1.3.x Migration Instructions

This document describes the migration process for upgrading from `calld` 1.2.4 or earlier to `calld` v1.3 or later. This migration process is necessary because the `calld` install process has changed as of version 1.3.

This document provides migration steps for upgrading on supported platforms:

- [CentOS or Red Hat Enterprise Linux (RHEL)](#migration-on-centos-or-red-hat-enterprise-linux-rhel)
- [Ubuntu Linux](#migration-on-ubuntu-linux)

For other platforms, see the updated instructions for compiling from source. ([Ubuntu](build-run-calld-ubuntu.html), [macOS](build-run-calld-macos.html), or [Windows](https://github.com/callchain/call-lib/tree/develop/Builds/VisualStudio2017))


## Migration on CentOS or Red Hat Enterprise Linux (RHEL)

Call's official RPM repository and instructions for using it have changed. If you have [automatic updates](update-calld-automatically-on-linux.html) enabled, your system should perform the migration automatically. To migrate manually from the old repository to the new one, complete the following steps:

1. Stop the `calld` server.

        $ sudo systemctl stop calld.service

2. Remove the old Call repository package.

        $ sudo rpm -e call-repo

    The `calld-repo` package is now **DEPRECATED**. The package has been updated one last time for version 1.3.1. In the future, any changes to the repositories will require manual changes to the `call.repo` file.

3. Add Call's new yum repository:

        $ cat << REPOFILE | sudo tee /etc/yum.repos.d/call.repo
        [call-stable]
        name=CALL Ledger Packages
        baseurl=https://repos.call.com/repos/calld-rpm/stable/
        enabled=1
        gpgcheck=0
        gpgkey=https://repos.call.com/repos/calld-rpm/stable/repodata/repomd.xml.key
        repo_gpgcheck=1
        REPOFILE

4. Install the new `calld` package:

        $ sudo yum install calld

    Version 1.3.1 does not require any changes to your config files (`calld.cfg` and `validators.txt`). This update procedure leaves your existing config files in place.

5. Reload systemd unit files:

        $ sudo systemctl daemon-reload

6. Start the `calld` service:

        $ sudo systemctl start calld.service


**Warning:** If you use [automatic updates](update-calld-automatically-on-linux.html), they should continue working after performing this migration process. However, **the `call-repo` package is now deprecated**. As a consequence, in the future, any changes to Call's repositories may require you to manually update your repos file.


## Migration on Ubuntu Linux

Prior to version 1.3, the supported way to install `calld` on Ubuntu Linux was using Alien to install the RPM package. Starting with `calld` v1.3.1, Call provides a native package for Ubuntu and Debian Linux, which is the recommended way of installing it. If you already have the RPM package installed, complete the [installation steps](install-calld-on-ubuntu.html) to upgrade the package and switch over to the native APT (`.deb`) package.

If you have made any changes to your config files (`/opt/call/etc/calld.cfg` and `/opt/call/etc/validators.txt`), `apt` may prompt you during installation asking if you want to overwrite your config files with the newest versions from the packages. Version 1.3 does not require any changes to the config file, so you can safely keep your existing config files unchanged.

After installing the native APT package for 1.3, you will need to reload/restart the service:

1. Reload systemd unit files:

        $ sudo systemctl daemon-reload

2. Restart the `calld` service:

        $ sudo systemctl restart calld.service

If you no longer need Alien for any other packages, you may optionally uninstall it and its dependencies using the following steps:

1. Uninstall Alien:

        $ sudo apt -y remove alien

2. Uninstall unused dependencies:

        $ sudo apt -y autoremove

### Automatic Updates

The `calld` v1.3 package includes an updated auto-update script that works on Ubuntu and Debian Linux. For more information, see [Update `calld` Automatically on Linux](update-calld-automatically-on-linux.html).
