import type { GetPermissionListRes } from "@/apis/permissionApi";
import type { ModalFormProps } from "@ant-design/pro-components";
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormRadio,
  ProFormSelect,
  ProFormDependency,
} from "@ant-design/pro-components";
import { isValidElement } from "react";

// 定义权限项类型，基于新接口返回的数据结构
type PermissionListItem = NonNullable<NonNullable<GetPermissionListRes["data"]>["list"]>[number];

interface PermissionFormProps extends Omit<ModalFormProps, "onFinish"> {
  editingPermission?: PermissionListItem;
  onFinish: (values: any) => Promise<boolean>;
  onCancel?: () => void;
}

export function PermissionForm({ editingPermission, onFinish, title, onCancel, ...props }: PermissionFormProps) {
  const isEdit = !!editingPermission;

  // Ensure title is string or undefined
  const safeTitle: string | undefined =
    typeof title === "string" ? title : isValidElement(title) ? (title as any).props?.title : undefined;

  // 设置默认类型为自定义
  // 默认类型：编辑时使用后端数据，否则默认设为 api
  const defaultType = isEdit ? editingPermission?.type : "api";

  // 表单实例，用于在类型切换时清空不相关字段
  const [form] = ProForm.useForm();

  return (
    <ProForm
      {...props}
      title={safeTitle}
      layout="vertical"
      form={form}
      onFinish={onFinish}
      onValuesChange={changedValues => {
        if (Object.prototype.hasOwnProperty.call(changedValues, "type")) {
          const t = changedValues.type as string;
          if (t === "api") {
            // 接口类型：清空 code
            form.setFieldsValue({ code: undefined });
          } else {
            // 菜单/按钮类型：清空 path 和 method
            form.setFieldsValue({ path: undefined, method: undefined });
          }
        }
      }}
      initialValues={{
        name: editingPermission?.name,
        code: editingPermission?.metadata?.code,
        path: editingPermission?.metadata?.path,
        method: editingPermission?.metadata?.method,
        type: defaultType,
      }}
      submitter={{
        searchConfig: {
          submitText: isEdit ? "更新" : "创建",
          resetText: "重置",
        },
        resetButtonProps: {
          onClick: onCancel,
        },
        submitButtonProps: {
          id: "permission-form-submit",
        },
      }}
    >
      <ProFormRadio.Group
        name="type"
        label="权限类型"
        initialValue={defaultType}
        options={[
          { label: "接口（api）", value: "api", className: "permission-form-type-radio-api" },
          { label: "菜单（menu）", value: "menu", className: "permission-form-type-radio-menu" },
          { label: "按钮（button）", value: "button", className: "permission-form-type-radio-button" },
        ]}
        radioType="button"
      />
      <ProFormText
        name="name"
        label="权限名称"
        placeholder="请输入权限名称"
        rules={[{ required: true, message: "请输入权限名称" }]}
        fieldProps={{
          id: "permission-form-name",
          maxLength: 50,
        }}
      />
      {/* 根据 type 动态显示/校验字段：
          - type === 'api'：必填 path 和 method，code 清空且非必填
          - type === 'menu' 或 'button'：必填 code，path/method 清空且非必填
      */}
      <ProFormDependency name={["type"]}>
        {({ type }) => (
          <>
            <ProFormText
              name="code"
              label="权限编码"
              placeholder="请输入权限编码"
              rules={type === "menu" || type === "button" ? [{ required: true, message: "请输入权限编码" }] : []}
              fieldProps={{
                id: "permission-form-code",
                maxLength: 100,
              }}
              // 接口类型不展示编码字段
              hidden={type === "api"}
            />

            <ProFormText
              name="path"
              label="权限路径"
              placeholder="请输入权限路径"
              rules={type === "api" ? [{ required: true, message: "请输入权限路径" }] : []}
              fieldProps={{
                id: "permission-form-path",
                maxLength: 100,
              }}
              hidden={type !== "api"}
            />

            <ProFormSelect
              name="method"
              label="请求方法"
              placeholder="请选择请求方法"
              options={[
                { label: "GET", value: "GET" },
                { label: "POST", value: "POST" },
                { label: "PUT", value: "PUT" },
                { label: "DELETE", value: "DELETE" },
                { label: "PATCH", value: "PATCH" },
              ]}
              fieldProps={{
                id: "permission-form-method",
              }}
              rules={type === "api" ? [{ required: true, message: "请选择请求方法" }] : []}
              hidden={type !== "api"}
            />
          </>
        )}
      </ProFormDependency>

      <ProFormTextArea
        name="description"
        label="描述"
        placeholder="请输入权限描述"
        fieldProps={{
          id: "permission-form-description",
          rows: 3,
          maxLength: 200,
        }}
      />
    </ProForm>
  );
}
