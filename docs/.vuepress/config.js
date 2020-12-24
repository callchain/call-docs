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
        }
      ]
    },

    nextLinks: true,
    prevLinks: true
  }
}
