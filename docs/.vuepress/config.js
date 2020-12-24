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
          title: 'Payment Types',
          collapsable: false,
          children: [
            {
              title: 'Direct CALL Payments',
              path: '/concepts/payment-types/direct-call-payments'
            },
            {
              title: 'Cross-Currency Payments',
              path: '/concepts/payment-types/cross-currency-payments'
            },
            {
              title: 'Partial Payments',
              path: '/concepts/payment-types/partial-payments'
            }
          ]
        }
      ]
    },

    nextLinks: true,
    prevLinks: true
  }
}
