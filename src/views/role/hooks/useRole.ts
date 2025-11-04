import { roleClient } from "@/api/role";
import type { CreateRoleRequest, UpdateRoleRequest, RoleDetailResponse } from "@/hono-api-type/modules/role/model";
import { message } from "antd";

export const useRole = () => {
  const fetchRoles = async (params: {
    page: number;
    pageSize: number;
    name?: string;
    code?: string;
    orderBy?: "created_at" | "updated_at";
    order?: "asc" | "desc";
  }) => {
    try {
      const res = await roleClient.page.$post({
        json: params,
      });

      const json = await res.json();
      if (json.code === 200) {
        return json.data;
      } else {
        message.error(json.msg || "获取角色列表失败");
        return { total: 0, list: [] };
      }
    } catch (error) {
      message.error("获取角色列表失败: " + (error as Error).message);
      return { total: 0, list: [] };
    }
  };

  const fetchRoleDetail = async (id: string) => {
    try {
      const res = await roleClient[":id"].$get({
        param: { id },
      });

      const json = await res.json();
      if (json.code === 200) {
        return json.data;
      } else {
        message.error(json.msg || "获取角色详情失败");
        return null;
      }
    } catch (error) {
      message.error("获取角色详情失败: " + (error as Error).message);
      return null;
    }
  };

  const createRole = async (data: CreateRoleRequest) => {
    try {
      const res = await roleClient.index.$post({
        json: data,
      });

      const result = await res.json();
      if (result.code === 200) {
        message.success(result.msg || "创建角色成功");
        return true;
      } else {
        message.error(result.msg || "创建角色失败");
        return false;
      }
    } catch (error) {
      message.error("创建角色失败: " + (error as Error).message);
      return false;
    }
  };

  const updateRole = async (id: string, data: UpdateRoleRequest) => {
    try {
      const res = await roleClient[":id"].$put({
        param: { id },
        json: data,
      });

      const result = await res.json();
      if (result.code === 200) {
        message.success(result.msg || "更新角色成功");
        return true;
      } else {
        message.error(result.msg || "更新角色失败");
        return false;
      }
    } catch (error) {
      message.error("更新角色失败: " + (error as Error).message);
      return false;
    }
  };

  const deleteRole = async (id: string) => {
    try {
      const res = await roleClient[":id"].$delete({
        param: { id },
      });
      const json = await res.json();
      if (json.code === 200) {
        message.success(json.msg ?? "删除角色成功");
        return true;
      } else {
        message.error(json.msg ?? "删除角色失败");
        return false;
      }
    } catch (error) {
      message.error("删除角色失败: " + (error as Error).message);
      return false;
    }
  };

  return {
    fetchRoles,
    fetchRoleDetail,
    createRole,
    updateRole,
    deleteRole,
  };
};