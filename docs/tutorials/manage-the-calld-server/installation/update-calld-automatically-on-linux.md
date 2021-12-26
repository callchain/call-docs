# Update Automatically on Linux

On Linux, you can set up `calld` to automatically upgrade to the latest version with a one-time `cron` configuration. Call recommends enabling automatic updates if possible.

These instructions assume you have already installed `calld` [from the `yum` repository (CentOS/RedHat)](install-calld-on-centos-rhel-with-yum.html) or [using `apt` (Ubuntu/Debian)](install-calld-on-ubuntu.html).

To set up automatic updates, complete the following steps:

1. Check that `/opt/call/etc/update-calld-cron` exists. If it does not, update manually ([CentOS/Red Hat](update-calld-manually-on-centos-rhel.html) or [Ubuntu/Debian](update-calld-manually-on-ubuntu.html)).

2. Create a symlink in your `cron.d` folder to the `/opt/call/etc/update-calld-cron` config file:

        $ sudo ln -s /opt/call/etc/update-calld-cron /etc/cron.d/

    This cron configuration runs a script to update the installed `calld` package within an hour of each new release. To reduce the chance of outages from all servers updating simultaneously, the script delays the update for a random number of minutes, up to 59.
