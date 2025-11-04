import { Pool } from "pg";
export declare const createPgMiddleware: (pool: Pool) => import("hono").MiddlewareHandler<any, string, {}>;
