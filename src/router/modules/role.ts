import type { RouteObject } from 'react-router-dom'

export default <Readonly<RouteObject[]>>[
  {
    path: '/role',
    loader: ({ request }) => {
      const url = new URL(request.url)
      return { page: url.searchParams.get('page') }
    },
    lazy: async () => {
      const { Role } = await import('@/views/role')
      return { Component: Role }
    },
  },
]