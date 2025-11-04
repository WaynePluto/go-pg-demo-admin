import axios from "./base";

/** 用户登录，获取访问令牌和刷新令牌body参数 */
export type PostAuthLoginBody = {
  password: string;
  username: string;
};
/** 用户登录，获取访问令牌和刷新令牌返回值类型 */
export type PostAuthLoginRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: {
    access_token?: string;
    expires_in?: number;
    refresh_token?: string;
  };
};
/**
 * 用户登录，获取访问令牌和刷新令牌
 * 所属模块：auth
 */
export async function postAuthLogin(data: PostAuthLoginBody) {
  try {
    const res = await axios<PostAuthLoginRes>({
      url: `/auth/login`,
      method: "post",

      data,
    });
    return res;
  } catch (error) {
    return null;
  }
}

/** 通过刷新令牌获取新的访问令牌body参数 */
export type PostAuthRefreshTokenBody = {
  refresh_token: string;
};
/** 通过刷新令牌获取新的访问令牌返回值类型 */
export type PostAuthRefreshTokenRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: {
    access_token?: string;
    expires_in?: number;
    refresh_token?: string;
  };
};
/**
 * 通过刷新令牌获取新的访问令牌
 * 所属模块：auth
 */
export async function postAuthRefreshToken(data: PostAuthRefreshTokenBody) {
  try {
    const res = await axios<PostAuthRefreshTokenRes>({
      url: `/auth/refresh-token`,
      method: "post",

      data,
    });
    return res;
  } catch (error) {
    return null;
  }
}

/** 返回用户基本信息、角色列表、权限列表返回值类型 */
export type GetAuthUserDetailRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: {
    created_at?: string;
    id?: string;
    permissions?: {
      code?: string;
      id?: string;
      method?: string;
      name?: string;
      path?: string;
      type?: string;
    }[];
    phone?: string;
    profile?: unknown;
    roles?: {
      description?: string;
      id?: string;
      name?: string;
    }[];
    updated_at?: string;
    username?: string;
  };
};
/**
 * 返回用户基本信息、角色列表、权限列表
 * 所属模块：auth
 */
export async function getAuthUserDetail() {
  try {
    const res = await axios<GetAuthUserDetailRes>({
      url: `/auth/user-detail`,
      method: "get",
    });
    return res;
  } catch (error) {
    return null;
  }
}
