import winston from "winston";
export declare const createLogger: () => winston.Logger;
export declare const createLoggerMiddleware: (logger?: winston.Logger) => import("hono").MiddlewareHandler<any, string, {}>;
