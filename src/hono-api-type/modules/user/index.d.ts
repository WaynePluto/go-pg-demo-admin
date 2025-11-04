export declare const userApp: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    "/page": {
        $post: {
            input: {
                json: {
                    page: number;
                    pageSize: number;
                    username?: string | undefined;
                    orderBy?: "created_at" | "updated_at" | undefined;
                    order?: "asc" | "desc" | undefined;
                };
            };
            output: {
                code: number;
                msg: string;
                data: {
                    total: number;
                    list: {
                        id?: string | undefined;
                        created_at?: string | undefined;
                        updated_at?: string | undefined;
                        username?: string | undefined;
                        email?: string | undefined;
                        nickname?: string | undefined;
                        role_codes?: string[] | undefined;
                    }[];
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/:id": {
        $get: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                code: number;
                msg: string;
                data: {
                    id: string;
                    created_at: string;
                    updated_at: string;
                    username: string;
                    email?: string | undefined;
                    nickname?: string | undefined;
                    role_codes?: string[] | undefined;
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/": {
        $post: {
            input: {
                json: {
                    username: string;
                    password: string;
                    email?: string | undefined;
                    nickname?: string | undefined;
                    role_codes?: string[] | undefined;
                };
            };
            output: {
                code: number;
                msg: string;
                data: {
                    id: any;
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/:id": {
        $put: {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    username?: string | undefined;
                    email?: string | undefined;
                    nickname?: string | undefined;
                    role_codes?: string[] | undefined;
                };
            };
            output: {
                code: number;
                msg: string;
                data: number | null;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/:id": {
        $delete: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                code: number;
                msg: string;
                data: number | null;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/">;
export type UserApp = typeof userApp;
