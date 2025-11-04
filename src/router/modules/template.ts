import type { RouteObject } from 'react-router-dom'

export default <Readonly<RouteObject[]>>[
  {
    path: '/template',
    loader: ({ request }) => {
      const url = new URL(request.url)
      return { page: url.searchParams.get('page') }
    },
    lazy: async () => {
      const { Template } = await import('@/views/template')
      return { Component: Template }
    },
  },
]
