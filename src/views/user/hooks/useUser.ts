import { userClient } from "@/api/user";
import type { CreateUserRequest, UpdateUserRequest, UserDetailResponse } from "@/hono-api-type/modules/user/model";
import { message } from "antd";
import { MD5 } from "crypto-js";
import { useCallback, useState } from "react";

export interface UserQueryParams {
  page: number;
  pageSize: number;
  orderBy?: "created_at" | "updated_at";
  order?: "asc" | "desc";
}

export function useUser() {
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async (params: UserQueryParams) => {
    setLoading(true);
    try {
      const res = await userClient.page.$post({ json: params });
      const json = await res.json();
      if (json.code === 200) {
        return json.data;
      } else {
        message.error(json.msg || "获取用户列表失败");
        return { total: 0, list: [] };
      }
    } catch (error) {
      message.error("网络错误，请重试");
      return { total: 0, list: [] };
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserDetail = useCallback(async (id: string) => {
    try {
      const res = await userClient[":id"].$get({ param: { id } });
      const json = await res.json();
      if (json.code === 200) {
        return json.data;
      } else {
        message.error(json.msg || "获取用户详情失败");
        return null;
      }
    } catch (error) {
      message.error("网络错误，请重试");
      return null;
    }
  }, []);

  const createUser = useCallback(async (userData: CreateUserRequest) => {
    try {
      userData.password = MD5(userData.password).toString();
      const res = await userClient.index.$post({ json: userData });
      const data = await res.json();
      if (data.code === 200) {
        message.success("创建用户成功");
        return true;
      } else {
        message.error(data.msg || "创建用户失败");
        return false;
      }
    } catch (error) {
      message.error("网络错误，请重试");
      return false;
    }
  }, []);

  const updateUser = useCallback(async (id: string, userData: UpdateUserRequest) => {
    try {
      const res = await userClient[":id"].$put({
        param: { id },
        json: userData,
      });
      const data = await res.json();
      if (data.code === 200) {
        message.success("更新用户成功");
        return true;
      } else {
        message.error(data.msg || "更新用户失败");
        return false;
      }
    } catch (error) {
      message.error("网络错误，请重试");
      return false;
    }
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    try {
      const res = await userClient[":id"].$delete({ param: { id } });
      const data = await res.json();
      if (data.code === 200) {
        message.success("删除用户成功");
        return true;
      } else {
        message.error(data.msg || "删除用户失败");
        return false;
      }
    } catch (error) {
      message.error("网络错误，请重试");
      return false;
    }
  }, []);

  return {
    loading,
    fetchUsers,
    fetchUserDetail,
    createUser,
    updateUser,
    deleteUser,
  };
}