# Update Manually on Ubuntu or Debian

This page describes how to update manually to the latest release of `calld` on Ubuntu Linux. These instructions assume you have already [installed `calld` using the native package](install-calld-on-ubuntu.html). Call recommends setting up [automatic updates](update-calld-automatically-on-linux.html) instead, where possible.

**Caution:** To upgrade from `calld` 1.2.x to 1.3.1 or higher on Ubuntu Linux, you should follow the [1.3.1 migration instructions](calld-1-3-migration-instructions.html). The following instructions assume you have already installed the native APT package provided with versions 1.3.1 and up.

**Tip:** To perform these steps all at once, you can run the `/opt/call/bin/update-calld.sh` script, which is included with the `calld` package and is compatible with Ubuntu and Debian starting with `calld` version 1.3.1. This script should be run as a `sudo` user.

To update manually, complete the following steps:

1. Update repositories:

        $ sudo apt -y update

2. Upgrade the `calld` package:

        $ sudo apt -y upgrade calld

3. Reload the `systemd` unit files:

        $ sudo systemctl daemon-reload

4. Restart the `calld` service:

        $ sudo service calld restart
