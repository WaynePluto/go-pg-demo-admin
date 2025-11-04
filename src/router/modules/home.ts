import type { RouteObject } from "react-router-dom";

export default <Readonly<RouteObject[]>>[
  {
    path: "/",
    lazy: async () => {
      const { Home } = await import("@/views/home");
      return { Component: Home };
    },
  },
];
