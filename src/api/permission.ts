import { hc } from "hono/client";
import type { PermissionApp } from "../hono-api-type/modules/permission";
import { customFetch } from "./auth";

export const permissionClient = hc<PermissionApp>("/api/permission", {
  fetch: customFetch,
});
