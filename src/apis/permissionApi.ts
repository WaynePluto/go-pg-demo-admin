import axios from "./base";

/** 创建权限body参数 */
export type PostPermissionBody = {
  metadata?: {
    code?: string;
    method?: string;
    path?: string;
  };
  name: string;
  type: string;
};
/** 创建权限返回值类型 */
export type PostPermissionRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: string;
};
/**
 * 创建权限
 * 所属模块：permission
 */
export async function postPermission(data: PostPermissionBody) {
  try {
    const res = await axios<PostPermissionRes>({
      url: `/permission`,
      method: "post",

      data,
    });
    return res;
  } catch (error) {
    return null;
  }
}

/** 获取权限列表query参数 */
export type GetPermissionListQuery = {
  /** 页码 */
  page?: string;
  /** 每页数量 */
  pageSize?: string;
  /** 权限名称 */
  name?: string;
  /** 权限类型 */
  type?: string;
};

/** 获取权限列表返回值类型 */
export type GetPermissionListRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: {
    list?: {
      created_at?: string;
      id?: string;
      metadata?: {
        code?: string;
        method?: string;
        path?: string;
      };
      name?: string;
      type?: string;
      updated_at?: string;
    }[];
    total?: number;
  };
};
/**
 * 获取权限列表
 * 所属模块：permission
 */
export async function getPermissionList(query: GetPermissionListQuery) {
  try {
    const res = await axios<GetPermissionListRes>({
      url: `/permission/list`,
      method: "get",
      params: query,
    });
    return res;
  } catch (error) {
    return null;
  }
}
/** 根据ID获取权限path参数 */
export type GetPermissionByIdPath = {
  id: string;
};

/** 根据ID获取权限返回值类型 */
export type GetPermissionByIdRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: {
    created_at?: string;
    id?: string;
    metadata?: {
      code?: string;
      method?: string;
      path?: string;
    };
    name?: string;
    type?: string;
    updated_at?: string;
  };
};
/**
 * 根据ID获取权限
 * 所属模块：permission
 */
export async function getPermissionById({ id }: GetPermissionByIdPath) {
  try {
    const res = await axios<GetPermissionByIdRes>({
      url: `/permission/${id}`,
      method: "get",
    });
    return res;
  } catch (error) {
    return null;
  }
}
/** 根据ID更新权限path参数 */
export type PutPermissionByIdPath = {
  id: string;
};

/** 根据ID更新权限body参数 */
export type PutPermissionByIdBody = {
  metadata?: {
    code?: string;
    method?: string;
    path?: string;
  };
  name?: string;
  type?: string;
};
/** 根据ID更新权限返回值类型 */
export type PutPermissionByIdRes = {
  code?: number;
  data?: unknown;
  msg?: string;
};
/**
 * 根据ID更新权限
 * 所属模块：permission
 */
export async function putPermissionById(
  { id }: PutPermissionByIdPath,
  data: PutPermissionByIdBody,
) {
  try {
    const res = await axios<PutPermissionByIdRes>({
      url: `/permission/${id}`,
      method: "put",

      data,
    });
    return res;
  } catch (error) {
    return null;
  }
}
/** 根据ID删除权限path参数 */
export type DeletePermissionByIdPath = {
  id: string;
};

/** 根据ID删除权限返回值类型 */
export type DeletePermissionByIdRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: number;
};
/**
 * 根据ID删除权限
 * 所属模块：permission
 */
export async function deletePermissionById({ id }: DeletePermissionByIdPath) {
  try {
    const res = await axios<DeletePermissionByIdRes>({
      url: `/permission/${id}`,
      method: "delete",
    });
    return res;
  } catch (error) {
    return null;
  }
}
