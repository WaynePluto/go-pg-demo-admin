import axios from "./base";

/** 创建一个新角色body参数 */
export type PostRoleBody = {
  description?: string;
  name: string;
};
/** 创建一个新角色返回值类型 */
export type PostRoleRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: string;
};
/**
 * 创建一个新角色
 * 所属模块：role
 */
export async function postRole(data: PostRoleBody) {
  try {
    const res = await axios<PostRoleRes>({
      url: `/role`,
      method: "post",

      data,
    });
    return res;
  } catch (error) {
    return null;
  }
}

/** 根据条件分页获取角色列表query参数 */
export type GetRoleListQuery = {
  /** 页码 */
  page?: string;
  /** 每页数量 */
  pageSize?: string;
  /** 按名称模糊查询 */
  name?: string;
};

/** 根据条件分页获取角色列表返回值类型 */
export type GetRoleListRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: {
    list?: {
      created_at?: string;
      description?: string;
      id?: string;
      name?: string;
      updated_at?: string;
    }[];
    total?: number;
  };
};
/**
 * 根据条件分页获取角色列表
 * 所属模块：role
 */
export async function getRoleList(query: GetRoleListQuery) {
  try {
    const res = await axios<GetRoleListRes>({
      url: `/role/list`,
      method: "get",
      params: query,
    });
    return res;
  } catch (error) {
    return null;
  }
}
/** 根据ID获取单个角色的详细信息path参数 */
export type GetRoleByIdPath = {
  id: string;
};

/** 根据ID获取单个角色的详细信息返回值类型 */
export type GetRoleByIdRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: {
    created_at?: string;
    description?: string;
    id?: string;
    name?: string;
    updated_at?: string;
  };
};
/**
 * 根据ID获取单个角色的详细信息
 * 所属模块：role
 */
export async function getRoleById({ id }: GetRoleByIdPath) {
  try {
    const res = await axios<GetRoleByIdRes>({
      url: `/role/${id}`,
      method: "get",
    });
    return res;
  } catch (error) {
    return null;
  }
}
/** 根据ID更新角色的名称或描述path参数 */
export type PutRoleByIdPath = {
  id: string;
};

/** 根据ID更新角色的名称或描述body参数 */
export type PutRoleByIdBody = {
  description?: string;
  name?: string;
};
/** 根据ID更新角色的名称或描述返回值类型 */
export type PutRoleByIdRes = {
  code?: number;
  data?: unknown;
  msg?: string;
};
/**
 * 根据ID更新角色的名称或描述
 * 所属模块：role
 */
export async function putRoleById(
  { id }: PutRoleByIdPath,
  data: PutRoleByIdBody,
) {
  try {
    const res = await axios<PutRoleByIdRes>({
      url: `/role/${id}`,
      method: "put",

      data,
    });
    return res;
  } catch (error) {
    return null;
  }
}
/** 根据ID删除一个角色path参数 */
export type DeleteRoleByIdPath = {
  id: string;
};

/** 根据ID删除一个角色返回值类型 */
export type DeleteRoleByIdRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: number;
};
/**
 * 根据ID删除一个角色
 * 所属模块：role
 */
export async function deleteRoleById({ id }: DeleteRoleByIdPath) {
  try {
    const res = await axios<DeleteRoleByIdRes>({
      url: `/role/${id}`,
      method: "delete",
    });
    return res;
  } catch (error) {
    return null;
  }
}
/** 清空角色现有权限，并重新关联新的权限列表path参数 */
export type PostRoleByIdPermissionPath = {
  id: string;
};

/** 清空角色现有权限，并重新关联新的权限列表body参数 */
export type PostRoleByIdPermissionBody = {
  permission_ids: string[];
};
/** 清空角色现有权限，并重新关联新的权限列表返回值类型 */
export type PostRoleByIdPermissionRes = {
  code?: number;
  data?: unknown;
  msg?: string;
};
/**
 * 清空角色现有权限，并重新关联新的权限列表
 * 所属模块：role
 */
export async function postRoleByIdPermission(
  { id }: PostRoleByIdPermissionPath,
  data: PostRoleByIdPermissionBody,
) {
  try {
    const res = await axios<PostRoleByIdPermissionRes>({
      url: `/role/${id}/permission`,
      method: "post",

      data,
    });
    return res;
  } catch (error) {
    return null;
  }
}
