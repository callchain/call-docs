# Update Manually on CentOS/Red Hat

This page describes how to update manually to the latest release of `calld` on CentOS or Red Hat Enterprise Linux. Call recommends setting up [automatic updates](update-calld-automatically-on-linux.html) instead, where possible.

These instructions assume you have already [installed `calld` from the `yum` repository](install-calld-on-centos-rhel-with-yum.html).

**Tip:** To perform these steps all at once, you can run the `/opt/call/bin/update-calld.sh` script, which is included with the `calld` package. This script should be run as a `sudo` user.

To update manually, complete the following steps:

1. Download and install the latest `calld` package:

        $ sudo yum update calld

2. Reload the `systemd` unit files:

        $ sudo systemctl daemon-reload

3. Restart the `calld` service:

        $ sudo service calld restart
