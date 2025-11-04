export declare const authApp: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    "/login": {
        $post: {
            input: {
                json: {
                    username: string;
                    password: string;
                };
            };
            output: {
                code: number;
                msg: string;
                data: {
                    token: string;
                    refresh_token: string;
                    user: {
                        id: string;
                        username: string;
                        email?: string | undefined;
                        nickname?: string | undefined;
                        role_ids?: string[] | undefined;
                    };
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/me": {
        $get: {
            input: {};
            output: {
                code: number;
                msg: string;
                data: {
                    id: string;
                    username: string;
                    email?: string | undefined;
                    nickname?: string | undefined;
                    role_ids?: string[] | undefined;
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/refresh": {
        $post: {
            input: {
                json: {
                    refresh_token: string;
                };
            };
            output: {
                code: number;
                msg: string;
                data: {
                    token: string;
                    refresh_token: string;
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/">;
export type AuthApp = typeof authApp;
