import { hc } from "hono/client";
import type { RoleApp } from "../hono-api-type/modules/role";
import { customFetch } from "./auth";

export const roleClient = hc<RoleApp>("/api/role", {
  fetch: customFetch,
});
