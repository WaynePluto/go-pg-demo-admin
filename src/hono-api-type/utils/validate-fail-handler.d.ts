import { Context } from "hono";
export declare const validateFailHandler: (result: any, c: Context<any, string, {}>) => import("hono/dist/types/context").JSONRespondReturn<{
    code: number;
    msg: string;
    info: {
        message: string;
        path: string[];
    }[];
}, import("hono/utils/http-status").ContentfulStatusCode> | undefined;
