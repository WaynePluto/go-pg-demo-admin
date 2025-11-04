import axios from "./base";

/** 通过提供用户名、手机号、密码等信息创建一个新的用户账户。成功后返回新创建用户的唯一标识符(UUID)。body参数 */
export type PostUserBody = {
  password: string;
  phone: string;
  profile?: unknown;
  username: string;
};
/** 通过提供用户名、手机号、密码等信息创建一个新的用户账户。成功后返回新创建用户的唯一标识符(UUID)。返回值类型 */
export type PostUserRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: string;
};
/**
 * 通过提供用户名、手机号、密码等信息创建一个新的用户账户。成功后返回新创建用户的唯一标识符(UUID)。
 * 所属模块：用户管理
 */
export async function postUser(data: PostUserBody) {
  try {
    const res = await axios<PostUserRes>({
      url: `/user`,
      method: "post",

      data,
    });
    return res;
  } catch (error) {
    return null;
  }
}

/** 获取系统中的用户列表，支持按手机号模糊搜索，并提供分页功能。query参数 */
export type GetUserListQuery = {
  /** 页码，从1开始计算 */
  page?: string;
  /** 每页条目数 */
  pageSize?: string;
  /** 手机号模糊搜索关键字 */
  phone?: string;
};

/** 获取系统中的用户列表，支持按手机号模糊搜索，并提供分页功能。返回值类型 */
export type GetUserListRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: {
    list?: {
      created_at?: string;
      id?: string;
      phone?: string;
      profile?: unknown;
      updated_at?: string;
    }[];
    total?: number;
  };
};
/**
 * 获取系统中的用户列表，支持按手机号模糊搜索，并提供分页功能。
 * 所属模块：用户管理
 */
export async function getUserList(query: GetUserListQuery) {
  try {
    const res = await axios<GetUserListRes>({
      url: `/user/list`,
      method: "get",
      params: query,
    });
    return res;
  } catch (error) {
    return null;
  }
}
/** 通过指定的用户唯一标识符(UUID)来检索特定用户的详细信息。path参数 */
export type GetUserByIdPath = {
  id: string;
};

/** 通过指定的用户唯一标识符(UUID)来检索特定用户的详细信息。返回值类型 */
export type GetUserByIdRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: {
    created_at?: string;
    id?: string;
    phone?: string;
    profile?: unknown;
    updated_at?: string;
  };
};
/**
 * 通过指定的用户唯一标识符(UUID)来检索特定用户的详细信息。
 * 所属模块：用户管理
 */
export async function getUserById({ id }: GetUserByIdPath) {
  try {
    const res = await axios<GetUserByIdRes>({
      url: `/user/${id}`,
      method: "get",
    });
    return res;
  } catch (error) {
    return null;
  }
}
/** 通过指定的用户唯一标识符(UUID)来更新特定用户的密码和个人信息。只会更新请求中包含的字段。path参数 */
export type PutUserByIdPath = {
  id: string;
};

/** 通过指定的用户唯一标识符(UUID)来更新特定用户的密码和个人信息。只会更新请求中包含的字段。body参数 */
export type PutUserByIdBody = {
  password?: string;
  /** 个人信息 */
  profile?: unknown;
};
/** 通过指定的用户唯一标识符(UUID)来更新特定用户的密码和个人信息。只会更新请求中包含的字段。返回值类型 */
export type PutUserByIdRes = {
  code?: number;
  data?: unknown;
  msg?: string;
};
/**
 * 通过指定的用户唯一标识符(UUID)来更新特定用户的密码和个人信息。只会更新请求中包含的字段。
 * 所属模块：用户管理
 */
export async function putUserById(
  { id }: PutUserByIdPath,
  data: PutUserByIdBody,
) {
  try {
    const res = await axios<PutUserByIdRes>({
      url: `/user/${id}`,
      method: "put",

      data,
    });
    return res;
  } catch (error) {
    return null;
  }
}
/** 通过指定的用户唯一标识符(UUID)来删除特定用户。这是一个永久性操作，请谨慎使用。path参数 */
export type DeleteUserByIdPath = {
  id: string;
};

/** 通过指定的用户唯一标识符(UUID)来删除特定用户。这是一个永久性操作，请谨慎使用。返回值类型 */
export type DeleteUserByIdRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: number;
};
/**
 * 通过指定的用户唯一标识符(UUID)来删除特定用户。这是一个永久性操作，请谨慎使用。
 * 所属模块：用户管理
 */
export async function deleteUserById({ id }: DeleteUserByIdPath) {
  try {
    const res = await axios<DeleteUserByIdRes>({
      url: `/user/${id}`,
      method: "delete",
    });
    return res;
  } catch (error) {
    return null;
  }
}
/** 为指定用户分配一个或多个角色。该操作会完全替换用户当前的所有角色关系。path参数 */
export type PostUserByIdRolePath = {
  id: string;
};

/** 为指定用户分配一个或多个角色。该操作会完全替换用户当前的所有角色关系。body参数 */
export type PostUserByIdRoleBody = {
  /** 角色ID列表 */
  role_ids: string[];
};
/** 为指定用户分配一个或多个角色。该操作会完全替换用户当前的所有角色关系。返回值类型 */
export type PostUserByIdRoleRes = {
  code?: number;
  data?: unknown;
  msg?: string;
};
/**
 * 为指定用户分配一个或多个角色。该操作会完全替换用户当前的所有角色关系。
 * 所属模块：用户管理
 */
export async function postUserByIdRole(
  { id }: PostUserByIdRolePath,
  data: PostUserByIdRoleBody,
) {
  try {
    const res = await axios<PostUserByIdRoleRes>({
      url: `/user/${id}/role`,
      method: "post",

      data,
    });
    return res;
  } catch (error) {
    return null;
  }
}
