import { hc } from "hono/client";
import type { UserApp } from "../hono-api-type/modules/user";
import { customFetch } from "./auth";

export const userClient = hc<UserApp>("/api/user", {
  fetch: customFetch,
});
