import {
  deletePermissionById,
  getPermissionById,
  getPermissionList,
  postPermission,
  putPermissionById,
  type GetPermissionListQuery,
  type PostPermissionBody,
  type PutPermissionByIdBody,
} from "@/apis/permissionApi";
import type { GetPermissionListRes } from "@/apis/permissionApi";
import { message } from "antd";

// 定义权限项类型，基于新接口返回的数据结构
export type PermissionListItem = NonNullable<NonNullable<GetPermissionListRes["data"]>["list"]>[number];

interface FetchPermissionsParams {
  page: number;
  pageSize: number;
  name?: string;
  type?: string;
  orderBy?: "created_at" | "updated_at";
  order?: "asc" | "desc";
}

export const usePermission = () => {
  const fetchPermissions = async (params: FetchPermissionsParams) => {
    try {
      // 将参数转换为新的API所需的格式
      const queryParams: GetPermissionListQuery = {
        page: params.page.toString(),
        pageSize: params.pageSize.toString(),
        name: params.name,
        type: params.type,
      };

      // 清除空值参数
      Object.keys(queryParams).forEach(key => {
        if (queryParams[key] === undefined || queryParams[key] === null) {
          delete queryParams[key];
        }
      });

      const res = await getPermissionList(queryParams);

      if (res && res.data && res.data.code === 200) {
        // 直接使用API返回的数据结构
        return {
          total: res.data.data?.total || 0,
          list: res.data.data?.list || [],
        };
      } else {
        message.error(res?.data?.msg || "获取权限列表失败");
        return { total: 0, list: [] };
      }
    } catch (error) {
      message.error("获取权限列表失败: " + (error as Error).message);
      return { total: 0, list: [] };
    }
  };

  const fetchPermissionDetail = async (id: string) => {
    try {
      const res = await getPermissionById({ id });

      if (res && res.data && res.data.code === 200) {
        return res.data.data || null;
      } else {
        message.error(res?.data?.msg || "获取权限详情失败");
        return null;
      }
    } catch (error) {
      message.error("获取权限详情失败: " + (error as Error).message);
      return null;
    }
  };

  const createPermission = async (data: any) => {
    try {
      // 将传入数据转换为新API所需格式
      const requestData: PostPermissionBody = {
        name: data.name,
        type: data.type,
        metadata: {
          code: data.code,
          path: data.path,
          method: data.method,
        },
      };

      const res = await postPermission(requestData);

      if (res && res.data && res.data.code === 200) {
        message.success(res.data.msg || "创建权限成功");
        return true;
      } else {
        message.error(res?.data?.msg || "创建权限失败");
        return false;
      }
    } catch (error) {
      message.error("创建权限失败: " + (error as Error).message);
      return false;
    }
  };

  const updatePermission = async (id: string, data: any) => {
    try {
      // 将传入数据转换为新API所需格式
      const requestData: PutPermissionByIdBody = {};
      
      // 处理基本字段
      if (data.name !== undefined) requestData.name = data.name;
      if (data.type !== undefined) requestData.type = data.type;
      
      // 处理metadata字段
      if (data.metadata !== undefined) {
        requestData.metadata = data.metadata;
      }

      const res = await putPermissionById({ id }, requestData);

      if (res && res.data && res.data.code === 200) {
        message.success(res.data.msg || "更新权限成功");
        return true;
      } else {
        message.error(res?.data?.msg || "更新权限失败");
        return false;
      }
    } catch (error) {
      message.error("更新权限失败: " + (error as Error).message);
      return false;
    }
  };

  const deletePermission = async (id: string) => {
    try {
      const res = await deletePermissionById({ id });

      if (res && res.data && res.data.code === 200) {
        message.success(res.data.msg || "删除权限成功");
        return true;
      } else {
        message.error(res?.data?.msg || "删除权限失败");
        return false;
      }
    } catch (error) {
      message.error("删除权限失败: " + (error as Error).message);
      return false;
    }
  };

  return {
    fetchPermissions,
    fetchPermissionDetail,
    createPermission,
    updatePermission,
    deletePermission,
  };
};
