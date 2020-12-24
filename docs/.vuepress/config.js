module.exports = {
  title: 'Callchain Document',
  description: 'callchain document for developers',
  
  themeConfig: {
    logo: '/call.png',
    sidebar: [
      {
        title: 'Concepts',
        path: '/concepts/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/'
        ]
      },
      {
        title: 'Tutorials',
        collapsable: false,
        children: [ /* ... */ ],
      },
      {
        title: 'Use Case',
        collapsable: false,
        children: [ /* ... */ ],
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      },
      {
        title: 'References',
        collapsable: true,
        children: [ /* ... */ ],
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      }
    ],
    nextLinks: true,
    prevLinks: true
  }
}
