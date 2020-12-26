module.exports = {
  title: 'Callchain Document',
  description: 'callchain document for developers',

  themeConfig: {
    logo: '/call.png',
    nav: [
      { text: 'Concepts', link: '/concepts/' },
      { text: 'Tutorials', link: '/tutorials/' },
      { text: 'Use Cases', link: '/cases/' },
      { text: 'References', link: '/references/' }
    ],

    sidebar: {
      '/concepts/': [
        '/concepts/call-ledger-overview.md',
        '/concepts/intro-to-consensus.md',
        '/concepts/call.md',
        '/concepts/technical-faq.md',
        {
          title: 'Transactions',
          collapsable: true,
          children: [
            '/concepts/transactions/accounts/accounts.md',
            '/concepts/transactions/accounts/cryptographic-keys.md',
            '/concepts/transactions/accounts/reserves.md',
            '/concepts/transactions/accounts/unique-nickname.md',
            '/concepts/transactions/accounts/depositauth.md',
            '/concepts/transactions/accounts/multi-signing.md',

            '/concepts/transactions/transaction-basics/transaction-basics.md',
            '/concepts/transactions/transaction-basics/transaction-cost.md',
            '/concepts/transactions/transaction-basics/finality-of-results.md',
            '/concepts/transactions/transaction-basics/source-and-destination-tags.md',
            '/concepts/transactions/transaction-basics/understanding-signatures.md',

            '/concepts/transactions/fees.md',
            '/concepts/transactions/ledgers.md'
          ]
        },
        {
          title: 'Payment Types',
          collapsable: true,
          children: [
            '/concepts/payment-types/direct-call-payments.md',
            '/concepts/payment-types/cross-currency-payments.md',
            '/concepts/payment-types/partial-payments.md'
          ]
        },
        {
          title: 'Issued Currencies',
          collapsable: true,
          children: [
            '/concepts/issued-currencies/issued-currencies-overview.md',
            '/concepts/issued-currencies/trust-lines-and-issuing.md',
            '/concepts/issued-currencies/authorized-trust-lines.md',
            '/concepts/issued-currencies/freezes.md',
            '/concepts/issued-currencies/calling.md',
            '/concepts/issued-currencies/transfer-fees.md',
            '/concepts/issued-currencies/issuing-and-operational-addresses.md',
            '/concepts/issued-currencies/paths.md'
          ]
        },
        {
          title: 'Decentralized Exchange',
          collapsable: true,
          children: [
            '/concepts/decentralized-exchange/offers.md',
            '/concepts/decentralized-exchange/autobridging.md',
            '/concepts/decentralized-exchange/ticksize.md'
          ]
        },
        {
          title: 'Consensus Network',
          collapsable: true,
          children: [
            '/concepts/consensus-network/consensus.md',
            '/concepts/consensus-network/consensus-principles-and-rules.md',
            '/concepts/consensus-network/consensus-protections.md',
            '/concepts/consensus-network/transaction-queue.md',
            '/concepts/consensus-network/transaction-malleability.md',
            '/concepts/consensus-network/amendments/amendments.md',
            '/concepts/consensus-network/amendments/known-amendments.md',
            '/concepts/consensus-network/fee-voting.md',
            '/concepts/consensus-network/consensus-research.md',
            '/concepts/consensus-network/parallel-networks.md'
          ]
        },
        {
          title: 'The calld Server',
          collapsable: true,
          children: [
            '/concepts/the-calld-server/calld-server-modes.md',
            '/concepts/the-calld-server/clustering.md',
            '/concepts/the-calld-server/ledger-history/ledger-history.md',
            '/concepts/the-calld-server/ledger-history/online-deletion.md',
            '/concepts/the-calld-server/ledger-history/history-sharding.md',
            '/concepts/the-calld-server/peer-protocol.md',
            '/concepts/the-calld-server/transaction-censorship-detection.md'
          ]
        },
      ],

      '/tutorials/': [
        {
          title: 'Get Started',
          collapsable: true,
          children: [
            '/tutorials/get-started/get-started-with-the-calld-api.md',
            '/tutorials/get-started/set-up-secure-signing.md',
            '/tutorials/get-started/get-started-with-callapi-for-javascript.md',
            // '/tutorials/get-started/look-up-transaction-results.md ',
            '/tutorials/get-started/monitor-incoming-payments-with-websocket.md'
          ]
        },
        {
          title: 'Use Simple CALL Payments',
          collapsable: true,
          children: [
            '/tutorials/use-simple-call-payments/send-call.md',
            '/tutorials/use-simple-call-payments/reliable-transaction-submission.md',
            '/tutorials/use-simple-call-payments/cancel-or-skip-a-transaction.md',
            '/tutorials/use-simple-call-payments/send-a-multi-signed-transaction.md',
          ]
        },
        {
          title: 'Manage Account Settings',
          collapsable: true,
          children: [
            '/tutorials/manage-account-settings/assign-a-regular-key-pair.md',
            '/tutorials/manage-account-settings/change-or-remove-a-regular-key-pair.md',
            '/tutorials/manage-account-settings/set-up-multi-signing.md',
            '/tutorials/manage-account-settings/require-destination-tags.md',
          ]
        },
        {
          title: 'CALL Ledger Businesses',
          collapsable: true,
          children: [
            '/tutorials/call-ledger-businesses/list-call-as-an-exchange.md',
            '/tutorials/call-ledger-businesses/list-your-exchange-on-call-charts.md',
            '/tutorials/call-ledger-businesses/become-an-call-ledger-gateway.md'
          ]
        },
        {
          title: 'Manage the calld Server',
          collapsable: true,
          children: [
            {
              title: 'Install calld',
              collapsable: false,
              children: [
                '/tutorials/manage-the-calld-server/installation/system-requirements.md',
                '/tutorials/manage-the-calld-server/installation/install-calld-on-centos-rhel-with-yum.md',
                '/tutorials/manage-the-calld-server/installation/install-calld-on-ubuntu.md',
                '/tutorials/manage-the-calld-server/installation/update-calld-automatically-on-linux.md',
                '/tutorials/manage-the-calld-server/installation/update-calld-manually-on-centos-rhel.md',
                '/tutorials/manage-the-calld-server/installation/update-calld-manually-on-ubuntu.md',
                '/tutorials/manage-the-calld-server/installation/build-run-calld-ubuntu.md',
                '/tutorials/manage-the-calld-server/installation/build-run-calld-macos.md',
                '/tutorials/manage-the-calld-server/installation/capacity-planning.md',
                '/tutorials/manage-the-calld-server/installation/calld-1-3-migration-instructions.md',
              ]
            },
            {
              title: 'Configure calld',
              collapsable: false,
              children: [
                '/tutorials/manage-the-calld-server/configuration/run-calld-as-a-validator.md',
                '/tutorials/manage-the-calld-server/configuration/connect-your-calld-to-the-call-test-net.md',
                '/tutorials/manage-the-calld-server/configuration/cluster-calld-servers.md',
                '/tutorials/manage-the-calld-server/configuration/configure-online-deletion.md',
                '/tutorials/manage-the-calld-server/configuration/configure-advisory-deletion.md',
                '/tutorials/manage-the-calld-server/configuration/configure-history-sharding.md',
                '/tutorials/manage-the-calld-server/configuration/configure-full-history.md',
                '/tutorials/manage-the-calld-server/configuration/configure-the-peer-crawler.md',
                '/tutorials/manage-the-calld-server/configuration/enable-public-signing.md'
              ]
            },
            {
              title: 'Use calld in Stand-Alone Mode',
              collapsable: false,
              children: [
                '/tutorials/manage-the-calld-server/stand-alone-mode/start-a-new-genesis-ledger-in-stand-alone-mode.md',
                '/tutorials/manage-the-calld-server/stand-alone-mode/load-a-saved-ledger-in-stand-alone-mode.md',
                '/tutorials/manage-the-calld-server/stand-alone-mode/advance-the-ledger-in-stand-alone-mode.md'
              ]
            },
            {
              title: 'Troubleshooting calld',
              collapsable: false,
              children: [
                '/tutorials/manage-the-calld-server/troubleshooting/diagnosing-problems.md',
                '/tutorials/manage-the-calld-server/troubleshooting/understanding-log-messages.md',
                '/tutorials/manage-the-calld-server/troubleshooting/server-wont-start.md',
                '/tutorials/manage-the-calld-server/troubleshooting/fix-sqlite-tx-db-page-size-issue.md'
              ]
            }
          ]
        }
      ],

      '/cases/': [
        '/cases/use-cases.md',
        '/cases/run-a-calld-validator.md',
        '/cases/list-call-in-your-exchange.md',
        '/cases/contribute-code-to-calld.md',
        '/cases/contribute-code-to-call-lib.md'
      ],

      '/references/': [
        {
          title: 'API Conventions',
          collapsable: true,
          children: [
            '/references/api-conventions/basic-data-types.md',
            '/references/api-conventions/base58-encodings.md',
            '/references/api-conventions/currency-formats.md',
            '/references/api-conventions/error-formatting.md',
            '/references/api-conventions/markers-and-pagination.md',
            '/references/api-conventions/modifying-the-ledger.md',
            '/references/api-conventions/request-formatting.md',
            '/references/api-conventions/response-formatting.md',
            '/references/api-conventions/calld-server-states.md',
            '/references/api-conventions/serialization.md'
          ]
        },
        {
          title: 'Public calld Methods',
          collapsable: true,
          children: [
            {
              title: 'Account Methods',
              collapsable: false,
              children: [
                '/references/public-calld-methods/account-methods/account_currencies.md',
                '/references/public-calld-methods/account-methods/account_info.md',
                '/references/public-calld-methods/account-methods/account_lines.md',
                '/references/public-calld-methods/account-methods/account_offers.md',
                '/references/public-calld-methods/account-methods/account_issues.md',
                '/references/public-calld-methods/account-methods/account_invoices.md',
                '/references/public-calld-methods/account-methods/account_objects.md',
                '/references/public-calld-methods/account-methods/account_tx.md',
                '/references/public-calld-methods/account-methods/contract_info.md',
                '/references/public-calld-methods/account-methods/gateway_balances.md',
                '/references/public-calld-methods/account-methods/nickname_info.md',
                '/references/public-calld-methods/account-methods/nocall_check.md'
              ]
            },
            {
              title: 'Ledger Methods',
              collapsable: false,
              children: [
                '/references/public-calld-methods/ledger-methods/ledger.md',
                '/references/public-calld-methods/ledger-methods/ledger_closed.md',
                '/references/public-calld-methods/ledger-methods/ledger_current.md',
                '/references/public-calld-methods/ledger-methods/ledger_data.md',
                '/references/public-calld-methods/ledger-methods/ledger_entry.md'
              ]
            },
            {
              title: 'Transaction Methods',
              collapsable: false,
              children: [
                '/references/public-calld-methods/transaction-methods/sign.md',
                '/references/public-calld-methods/transaction-methods/sign_for.md',
                '/references/public-calld-methods/transaction-methods/submit.md',
                '/references/public-calld-methods/transaction-methods/submit_multisigned.md',
                '/references/public-calld-methods/transaction-methods/transaction_entry.md',
                '/references/public-calld-methods/transaction-methods/tx.md',
                '/references/public-calld-methods/transaction-methods/tx_history.md'
              ]
            },
            {
              title: 'Path and Order Book Methods',
              collapsable: false,
              children: [
                '/references/public-calld-methods/path-and-order-book-methods/book_offers.md',
                '/references/public-calld-methods/path-and-order-book-methods/call_path_find.md',
                '/references/public-calld-methods/path-and-order-book-methods/deposit_authorized.md',
                '/references/public-calld-methods/path-and-order-book-methods/path_find.md'
              ]
            },
            {
              title: 'Subscription Methods',
              collapsable: false,
              children: [
                '/references/public-calld-methods/subscription-methods/subscribe.md',
                '/references/public-calld-methods/subscription-methods/unsubscribe.md'
              ]
            },
            {
              title: 'Server Info Methods',
              collapsable: false,
              children: [
                '/references/public-calld-methods/server-info-methods/fee.md',
                '/references/public-calld-methods/server-info-methods/server_info.md',
                '/references/public-calld-methods/server-info-methods/server_state.md'
              ]
            },
            {
              title: 'Utility Methods',
              collapsable: false,
              children: [
                '/references/public-calld-methods/utility-methods/json.md',
                '/references/public-calld-methods/utility-methods/ping.md',
                '/references/public-calld-methods/utility-methods/random.md'
              ]
            },
            
          ]
        },
        {
          title: 'Admin calld Methods',
          collapsable: true,
          children: [
            '/references/admin-calld-methods/admin-calld-methods.md',
            {
              title: 'Key Generation Methods',
              collapsable: false,
              children: [
                '/references/admin-calld-methods/key-generation-methods/validation_create.md',
                '/references/admin-calld-methods/key-generation-methods/wallet_propose.md'
              ]
            },
            {
              title: 'Logging and Data Management Methods',
              collapsable: false,
              children: [
                '/references/admin-calld-methods/logging-and-data-management-methods/can_delete.md',
                '/references/admin-calld-methods/logging-and-data-management-methods/crawl_shards.md',
                '/references/admin-calld-methods/logging-and-data-management-methods/download_shard.md',
                '/references/admin-calld-methods/logging-and-data-management-methods/ledger_cleaner.md',
                '/references/admin-calld-methods/logging-and-data-management-methods/ledger_request.md',
                '/references/admin-calld-methods/logging-and-data-management-methods/log_level.md',
                '/references/admin-calld-methods/logging-and-data-management-methods/logrotate.md'
              ]
            },
            {
              title: 'Server Control Methods',
              collapsable: false,
              children: [
                '/references/admin-calld-methods/server-control-methods/connect.md',
                '/references/admin-calld-methods/server-control-methods/ledger_accept.md',
                '/references/admin-calld-methods/server-control-methods/stop.md',
                '/references/admin-calld-methods/server-control-methods/validation_seed.md'
              ]
            },
            {
              title: 'Status and Debugging Methods',
              collapsable: false,
              children: [
                '/references/admin-calld-methods/status-and-debugging-methods/consensus_info.md',
                '/references/admin-calld-methods/status-and-debugging-methods/feature.md',
                '/references/admin-calld-methods/status-and-debugging-methods/fetch_info.md',
                '/references/admin-calld-methods/status-and-debugging-methods/get_counts.md',
                '/references/admin-calld-methods/status-and-debugging-methods/peers.md',
                '/references/admin-calld-methods/status-and-debugging-methods/print.md',
                '/references/admin-calld-methods/status-and-debugging-methods/validator_list_sites.md',
                '/references/admin-calld-methods/status-and-debugging-methods/validators.md'
              ]
            },
          ]
        },
        {
          title: 'Ledger Data Formats',
          collapsable: true,
          children: [
            '/references/ledger-data-formats/ledger-header.md',
            '/references/ledger-data-formats/ledger-object-ids.md',
            {
              title: 'Ledger Object Types',
              collapsable: false,
              children: [
                '/references/ledger-data-formats/ledger-object-types/accountroot.md',
                '/references/ledger-data-formats/ledger-object-types/amendments.md',
                '/references/ledger-data-formats/ledger-object-types/callstate.md',
                '/references/ledger-data-formats/ledger-object-types/depositpreauth.md',
                '/references/ledger-data-formats/ledger-object-types/directorynode.md',
                '/references/ledger-data-formats/ledger-object-types/feeroot.md',
                '/references/ledger-data-formats/ledger-object-types/feesettings.md',
                '/references/ledger-data-formats/ledger-object-types/invoiceroot.md',
                '/references/ledger-data-formats/ledger-object-types/issueroot.md',
                '/references/ledger-data-formats/ledger-object-types/ledgerhashes.md',
                '/references/ledger-data-formats/ledger-object-types/nickname.md',
                '/references/ledger-data-formats/ledger-object-types/offer.md',
                '/references/ledger-data-formats/ledger-object-types/paramroot.md',
                '/references/ledger-data-formats/ledger-object-types/signerlist.md'
              ]
            },
            
          ]
        },
        {
          title: 'Transaction Formats',
          collapsable: true,
          children: [
            '/references/transaction-formats/transaction-formats.md',
            '/references/transaction-formats/transaction-common-fields.md',
            '/references/transaction-formats/transaction-metadata.md',
            {
              title: 'Transaction Types',
              collapsable: false,
              children: [
                '/references/transaction-formats/transaction-types/accountset.md',
                '/references/transaction-formats/transaction-types/depositpreauth.md',
                '/references/transaction-formats/transaction-types/issueset.md',
                '/references/transaction-formats/transaction-types/offercancel.md',
                '/references/transaction-formats/transaction-types/offercreate.md',
                '/references/transaction-formats/transaction-types/payment.md',
                '/references/transaction-formats/transaction-types/setregularkey.md',
                '/references/transaction-formats/transaction-types/signerlistset.md',
                '/references/transaction-formats/transaction-types/transaction-types.md',
                '/references/transaction-formats/transaction-types/trustset.md'
              ]
            },
            {
              title: 'Pseudo-Transactions',
              collapsable: false,
              children: [
                '/references/transaction-formats/pseudo-transaction-types/enableamendment.md',
                '/references/transaction-formats/pseudo-transaction-types/pseudo-transaction-types.md',
                '/references/transaction-formats/pseudo-transaction-types/setfee.md'
              ]
            },
            {
              title: 'Transaction Results',
              collapsable: false,
              children: [
                '/references/transaction-formats/transaction-results/transaction-results.md',
                '/references/transaction-formats/transaction-results/tes-success.md',
                '/references/transaction-formats/transaction-results/tec-codes.md',
                '/references/transaction-formats/transaction-results/tef-codes.md',
                '/references/transaction-formats/transaction-results/tel-codes.md',
                '/references/transaction-formats/transaction-results/tem-codes.md',
                '/references/transaction-formats/transaction-results/ter-codes.md'
                
              ]
            },
          ]
        },
        '/references/commandline-usage.md',
        '/references/peer-crawler.md'
      ]
    },

    nextLinks: true,
    prevLinks: true
  }
}
