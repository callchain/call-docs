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
      ]
    },

    nextLinks: true,
    prevLinks: true
  }
}
