import type { RouteObject } from "react-router-dom";

export default <Readonly<RouteObject[]>>[
  {
    path: "/login",
    lazy: async () => {
      const { Login } = await import("@/views/login");
      return { Component: Login };
    },
  },
];
