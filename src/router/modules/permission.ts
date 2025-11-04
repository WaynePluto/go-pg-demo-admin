import type { RouteObject } from 'react-router-dom'

export default <Readonly<RouteObject[]>>[
  {
    path: '/permission',
    loader: ({ request }) => {
      const url = new URL(request.url)
      return { page: url.searchParams.get('page') }
    },
    lazy: async () => {
      const { Permission } = await import('@/views/permission')
      return { Component: Permission }
    },
  },
]