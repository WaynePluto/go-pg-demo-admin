import axios from "./base";

/** 创建模板body参数 */
export type PostTemplateBody = {
  name: string;
  num?: number;
};
/** 创建模板返回值类型 */
export type PostTemplateRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: string;
};
/**
 * 创建模板
 * 所属模块：template
 */
export async function postTemplate(data: PostTemplateBody) {
  try {
    const res = await axios<PostTemplateRes>({
      url: `/template`,
      method: "post",

      data,
    });
    return res;
  } catch (error) {
    return null;
  }
}

/** 批量创建模板body参数 */
export type PostTemplateBatchCreateBody = {
  templates: {
    name: string;
    num?: number;
  }[];
};
/** 批量创建模板返回值类型 */
export type PostTemplateBatchCreateRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: string[];
};
/**
 * 批量创建模板
 * 所属模块：template
 */
export async function postTemplateBatchCreate(
  data: PostTemplateBatchCreateBody,
) {
  try {
    const res = await axios<PostTemplateBatchCreateRes>({
      url: `/template/batch-create`,
      method: "post",

      data,
    });
    return res;
  } catch (error) {
    return null;
  }
}

/** 批量删除模板body参数 */
export type PostTemplateBatchDeleteBody = {
  ids: string[];
};
/** 批量删除模板返回值类型 */
export type PostTemplateBatchDeleteRes = {
  code?: number;
  data?: unknown;
  msg?: string;
};
/**
 * 批量删除模板
 * 所属模块：template
 */
export async function postTemplateBatchDelete(
  data: PostTemplateBatchDeleteBody,
) {
  try {
    const res = await axios<PostTemplateBatchDeleteRes>({
      url: `/template/batch-delete`,
      method: "post",

      data,
    });
    return res;
  } catch (error) {
    return null;
  }
}

/** 获取模板列表query参数 */
export type GetTemplateListQuery = {
  /** 页码 */
  page?: string;
  /** 每页数量 */
  pageSize?: string;
  /** 模板名称 */
  name?: string;
};

/** 获取模板列表返回值类型 */
export type GetTemplateListRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: {
    list?: {
      created_at?: string;
      id?: string;
      name?: string;
      num?: number;
      updated_at?: string;
    }[];
    total?: number;
  };
};
/**
 * 获取模板列表
 * 所属模块：template
 */
export async function getTemplateList(query: GetTemplateListQuery) {
  try {
    const res = await axios<GetTemplateListRes>({
      url: `/template/list`,
      method: "get",
      params: query,
    });
    return res;
  } catch (error) {
    return null;
  }
}
/** 根据ID获取模板path参数 */
export type GetTemplateByIdPath = {
  id: string;
};

/** 根据ID获取模板返回值类型 */
export type GetTemplateByIdRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: {
    created_at?: string;
    id?: string;
    name?: string;
    num?: number;
    updated_at?: string;
  };
};
/**
 * 根据ID获取模板
 * 所属模块：template
 */
export async function getTemplateById({ id }: GetTemplateByIdPath) {
  try {
    const res = await axios<GetTemplateByIdRes>({
      url: `/template/${id}`,
      method: "get",
    });
    return res;
  } catch (error) {
    return null;
  }
}
/** 根据ID更新模板path参数 */
export type PutTemplateByIdPath = {
  id: string;
};

/** 根据ID更新模板body参数 */
export type PutTemplateByIdBody = {
  name?: string;
  num?: number;
};
/** 根据ID更新模板返回值类型 */
export type PutTemplateByIdRes = {
  code?: number;
  data?: unknown;
  msg?: string;
};
/**
 * 根据ID更新模板
 * 所属模块：template
 */
export async function putTemplateById(
  { id }: PutTemplateByIdPath,
  data: PutTemplateByIdBody,
) {
  try {
    const res = await axios<PutTemplateByIdRes>({
      url: `/template/${id}`,
      method: "put",

      data,
    });
    return res;
  } catch (error) {
    return null;
  }
}
/** 根据ID删除模板path参数 */
export type DeleteTemplateByIdPath = {
  id: string;
};

/** 根据ID删除模板返回值类型 */
export type DeleteTemplateByIdRes = {
  code?: number;
  data?: unknown;
  msg?: string;
} & {
  data?: number;
};
/**
 * 根据ID删除模板
 * 所属模块：template
 */
export async function deleteTemplateById({ id }: DeleteTemplateByIdPath) {
  try {
    const res = await axios<DeleteTemplateByIdRes>({
      url: `/template/${id}`,
      method: "delete",
    });
    return res;
  } catch (error) {
    return null;
  }
}
