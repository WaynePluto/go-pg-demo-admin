export declare const templateApp: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    "/": {
        $post: {
            input: {
                json: {
                    name: string;
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
                    name: string;
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
                    name?: string | undefined;
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
} & {
    "/page": {
        $post: {
            input: {
                json: {
                    page: number;
                    pageSize: number;
                    name?: string | undefined;
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
                        name?: string | undefined;
                    }[];
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/">;
export type TemplateApp = typeof templateApp;
