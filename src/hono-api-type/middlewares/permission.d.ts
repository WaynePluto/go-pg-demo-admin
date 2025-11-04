/**
 * 权限验证中间件
 * 检查用户是否具有访问特定资源所需的权限
 * @param requiredPermissions 所需权限列表，用户拥有其中任一权限即可访问
 */
export declare const createPermissionMiddleware: (...requiredPermissions: string[]) => import("hono").MiddlewareHandler<any, string, {}>;
