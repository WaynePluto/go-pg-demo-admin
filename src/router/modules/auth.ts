import type { RouteObject } from "react-router-dom";
import { isLogin } from "@/utils/auth";

export default <Readonly<RouteObject[]>>[
  {
    path: "*",
    loader: async ({ request }) => {
      const url = new URL(request.url);

      // 如果未登录且不在登录页面，重定向到登录页
      if (!isLogin() && url.pathname !== "/login") {
        return Response.redirect(new URL("/login", request.url));
      }

      // 如果已登录且在登录页面，重定向到首页
      if (isLogin() && url.pathname === "/login") {
        return Response.redirect(new URL("/", request.url));
      }

      return null;
    },
  },
];
