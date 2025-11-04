import { 
  getTemplateList, 
  getTemplateById, 
  postTemplate, 
  putTemplateById, 
  deleteTemplateById 
} from "@/apis/templateApi";
import type { CreateTemplateRequest, TemplateDetailResponse, UpdateTemplateRequest } from "@/hono-api-type/modules/template/model";
import { message } from "antd";

export const useTemplate = () => {
  const fetchTemplates = async (params: {
    page: number;
    pageSize: number;
    name?: string;
    orderBy?: "created_at" | "updated_at";
    order?: "asc" | "desc";
  }) => {
    try {
      // 将参数转换为查询参数格式
      const query = {
        page: params.page.toString(),
        pageSize: params.pageSize.toString(),
        name: params.name,
      };

      const res = await getTemplateList(query);

      if (res && res.data && res.data.code === 200) {
        return res.data.data;
      } else {
        message.error(res?.data?.msg || "获取模板列表失败");
        return { total: 0, list: [] };
      }
    } catch (error) {
      message.error("获取模板列表失败: " + (error as Error).message);
      return { total: 0, list: [] };
    }
  };

  const fetchTemplateDetail = async (id: string) => {
    try {
      const res = await getTemplateById({ id });

      if (res && res.data && res.data.code === 200) {
        return res.data.data;
      } else {
        message.error(res?.data?.msg || "获取模板详情失败");
        return null;
      }
    } catch (error) {
      message.error("获取模板详情失败: " + (error as Error).message);
      return null;
    }
  };

  const createTemplate = async (data: CreateTemplateRequest) => {
    try {
      const res = await postTemplate(data);

      if (res && res.data && res.data.code === 200) {
        message.success(res.data.msg || "创建模板成功");
        return true;
      } else {
        message.error(res?.data?.msg || "创建模板失败");
        return false;
      }
    } catch (error) {
      message.error("创建模板失败: " + (error as Error).message);
      return false;
    }
  };

  const updateTemplate = async (id: string, data: UpdateTemplateRequest) => {
    try {
      const res = await putTemplateById({ id }, data);

      if (res && res.data && res.data.code === 200) {
        message.success(res.data.msg || "更新模板成功");
        return true;
      } else {
        message.error(res?.data?.msg || "更新模板失败");
        return false;
      }
    } catch (error) {
      message.error("更新模板失败: " + (error as Error).message);
      return false;
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      const res = await deleteTemplateById({ id });
      
      if (res && res.data && res.data.code === 200) {
        message.success(res.data.msg ?? "删除模板成功");
        return true;
      } else {
        message.error(res?.data?.msg ?? "删除模板失败");
        return false;
      }
    } catch (error) {
      message.error("删除模板失败: " + (error as Error).message);
      return false;
    }
  };

  return {
    fetchTemplates,
    fetchTemplateDetail,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  };
};