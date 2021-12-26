# Enable Public Signing

[New in: calld 1.1.0][] By default, the signing methods for `calld` are limited to administrative connections. If you want to allow signing methods to be used as public API methods (like with versions of `calld` before v1.1.0), you can enable it with a configuration change.

This enables the following methods to be used on "public" [JSON-RPC and WebSocket connections](get-started-with-the-calld-api.html), if your server accepts them:

- [sign][sign method]
- [sign_for][sign_for method]
- [submit][submit method] (in "sign-and-submit" mode)

You **do not** need to enable public signing to use these methods from an admin connection.

**Caution:** Call does not recommend enabling public signing. Like the [wallet_propose method][], the signing commands do not perform any actions that would require administrative-level permissions, but restricting them to admin connections protects users from irresponsibly sending or receiving secret keys over unsecured communications, or to servers they do not control.

To enable public signing, perform the following steps:

1. Edit your `calld`'s config file.

        vim /etc/opt/call/calld.cfg

    {% include '_snippets/conf-file-location.md' %}<!--_ -->

2. Add the following stanza to your config file, and save the changes:

        [signing_support]
        true

3. Restart your `calld` server:

        systemctl restart calld


<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}			
{% include '_snippets/tx-type-links.md' %}			
{% include '_snippets/calld_versions.md' %}
