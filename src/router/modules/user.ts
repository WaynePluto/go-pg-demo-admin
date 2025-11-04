import type { RouteObject } from "react-router-dom";

export default <Readonly<RouteObject[]>>[
  {
    path: "/user",
    lazy: async () => {
      const { User } = await import("@/views/user");
      return { Component: User };
    },
  },
];
