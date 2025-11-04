import { permissionClient } from "@/api/permission";
import type {
  CreatePermissionRequest,
  UpdatePermissionRequest,
  PermissionDetailResponse,
} from "@/hono-api-type/modules/permission/model";
import { message } from "antd";

export const usePermission = () => {
  const fetchPermissions = async (params: {
    page: number;
    pageSize: number;
    name?: string;
    code?: string;
    type?: "custom" | "system";
    orderBy?: "created_at" | "updated_at";
    order?: "asc" | "desc";
  }) => {
    try {
      const res = await permissionClient.page.$post({
        json: params,
      });

      const json = await res.json();
      if (json.code === 200) {
        return json.data;
      } else {
        message.error(json.msg || "获取权限列表失败");
        return { total: 0, list: [] };
      }
    } catch (error) {
      message.error("获取权限列表失败: " + (error as Error).message);
      return { total: 0, list: [] };
    }
  };

  const fetchPermissionDetail = async (id: string) => {
    try {
      const res = await permissionClient[":id"].$get({
        param: { id },
      });

      const json = await res.json();
      if (json.code === 200) {
        return json.data;
      } else {
        message.error(json.msg || "获取权限详情失败");
        return null;
      }
    } catch (error) {
      message.error("获取权限详情失败: " + (error as Error).message);
      return null;
    }
  };

  const createPermission = async (data: CreatePermissionRequest) => {
    try {
      const res = await permissionClient.index.$post({
        json: data,
      });

      const result = await res.json();
      if (result.code === 200) {
        message.success(result.msg || "创建权限成功");
        return true;
      } else {
        message.error(result.msg || "创建权限失败");
        return false;
      }
    } catch (error) {
      message.error("创建权限失败: " + (error as Error).message);
      return false;
    }
  };

  const updatePermission = async (id: string, data: UpdatePermissionRequest) => {
    try {
      const res = await permissionClient[":id"].$put({
        param: { id },
        json: data,
      });

      const result = await res.json();
      if (result.code === 200) {
        message.success(result.msg || "更新权限成功");
        return true;
      } else {
        message.error(result.msg || "更新权限失败");
        return false;
      }
    } catch (error) {
      message.error("更新权限失败: " + (error as Error).message);
      return false;
    }
  };

  const deletePermission = async (id: string) => {
    try {
      const res = await permissionClient[":id"].$delete({
        param: { id },
      });

      const json = await res.json();
      if (json.code === 200) {
        message.success(json.msg || "删除权限成功");
        return true;
      } else {
        message.error(json.msg || "删除权限失败");
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