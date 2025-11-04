import { JWTPayload } from "@/types/hono";
import jwt from "jsonwebtoken";
export declare const createJwtSign: (secret?: string) => (payload: JWTPayload) => {
    token: string;
    refresh_token: string;
};
export declare const createJwtVerify: (secret: string) => (token: string) => Promise<{
    err: jwt.VerifyErrors | null;
    decoded: any;
}>;
export declare const createJwtMiddleware: (secret?: string) => import("hono").MiddlewareHandler<any, string, {}>;
