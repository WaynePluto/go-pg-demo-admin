import type { CreateRoleRequest, RoleDetailResponse, UpdateRoleRequest } from "@/hono-api-type/modules/role/model";
import type { ModalFormProps } from "@ant-design/pro-components";
import { ProForm, ProFormRadio, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Form, TreeSelect } from "antd";
import { isValidElement } from "react";
import { usePermissionTree } from "../hooks/usePermissionTree";

interface RoleFormProps extends Omit<ModalFormProps, "onFinish"> {
  editingRole?: RoleDetailResponse;
  onFinish: (values: CreateRoleRequest | UpdateRoleRequest) => Promise<boolean>;
  onCancel?: () => void;
}

export function RoleForm({ editingRole, onFinish, title, onCancel, ...props }: RoleFormProps) {
  const isEdit = !!editingRole;
  const { treeData, checkedKeys, handleCheck, loading } = usePermissionTree(editingRole);
  const [form] = Form.useForm();

  // Ensure title is string or undefined
  const safeTitle: string | undefined =
    typeof title === "string" ? title : isValidElement(title) ? (title as any).props?.title : undefined;

  // 设置默认类型为自定义
  const defaultType = isEdit ? editingRole?.type : "custom";

  // 根据是否是系统角色决定是否禁用权限选择
  const isPermissionSelectDisabled = isEdit && editingRole?.type === "system";

  return (
    <ProForm
      {...props}
      title={safeTitle}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...editingRole,
        type: defaultType,
      }}
      form={form}
      submitter={{
        searchConfig: {
          submitText: isEdit ? "更新" : "创建",
          resetText: "重置",
        },
        resetButtonProps: {
          onClick: onCancel,
        },
        submitButtonProps: {
          id: "role-form-submit",
        },
      }}
    >
      <ProFormText
        name="name"
        label="角色名称"
        placeholder="请输入角色名称"
        rules={[{ required: true, message: "请输入角色名称" }]}
        fieldProps={{
          id: "role-form-name",
          maxLength: 50,
        }}
      />
      <ProFormText
        name="code"
        label="角色编码"
        placeholder="请输入角色编码"
        rules={[{ required: true, message: "请输入角色编码" }]}
        fieldProps={{
          id: "role-form-code",
          maxLength: 50,
        }}
      />
      <ProFormRadio.Group
        name="type"
        label="角色类型"
        initialValue="custom"
        disabled={editingRole?.type === "system"}
        options={[
          {
            label: "系统内置角色",
            value: "system",
            disabled: true,
          },
          {
            label: "自定义角色",
            value: "custom",
          },
        ]}
        radioType="button"
      />
      <ProFormTextArea
        name="description"
        label="角色描述"
        placeholder="请输入角色描述"
        fieldProps={{
          id: "role-form-description",
          rows: 3,
          maxLength: 200,
        }}
      />

      {/* 权限选择树 */}
      <Form.Item label="权限分配" name="permission_codes">
        <TreeSelect
          treeData={treeData}
          value={checkedKeys}
          onChange={handleCheck}
          multiple
          treeCheckable
          placeholder="请选择权限"
          style={{ maxHeight: 300, overflow: "auto" }}
          disabled={isPermissionSelectDisabled}
          loading={loading}
        />
      </Form.Item>
    </ProForm>
  );
}
