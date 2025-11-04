import type { CreateUserRequest, UpdateUserRequest } from "@/hono-api-type/modules/user/model";
import type { ModalFormProps } from "@ant-design/pro-components";
import { ProForm, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { isValidElement } from "react";
import { useRoleState } from "../hooks/useRoleContext";
interface UserFormProps extends Omit<ModalFormProps, "onFinish"> {
  editingUser?: { id: string } & UpdateUserRequest;
  onFinish: (values: CreateUserRequest | UpdateUserRequest) => Promise<boolean>;
  onCancel?: () => void;
}

export function UserForm({ editingUser, onFinish, title, onCancel, ...props }: UserFormProps) {
  const isEdit = !!editingUser;
  const { roleList, loading } = useRoleState();

  // Ensure title is string or undefined
  const safeTitle: string | undefined =
    typeof title === "string" ? title : isValidElement(title) ? (title as any).props?.title : undefined;

  const handleFinish = async (values: CreateUserRequest | UpdateUserRequest) => {
    return await onFinish(values);
  };

  return (
    <ProForm
      {...props}
      title={safeTitle}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={editingUser}
      submitter={{
        searchConfig: {
          submitText: isEdit ? "更新" : "创建",
          resetText: "重置",
        },
        resetButtonProps: {
          onClick: onCancel,
        },
        submitButtonProps: {
          id: "user-form-submit",
        },
      }}
    >
      <ProFormText
        name="username"
        label="用户名"
        placeholder="请输入用户名"
        rules={[
          { required: true, message: "请输入用户名" },
          { min: 3, max: 20, message: "用户名长度为3-20个字符" },
        ]}
        fieldProps={{
          id: "user-form-username",
          maxLength: 20,
        }}
      />

      {!isEdit && (
        <ProFormText.Password
          name="password"
          label="密码"
          placeholder="请输入密码"
          rules={[
            { required: true, message: "请输入密码" },
            { min: 6, max: 20, message: "密码长度为6-20个字符" },
          ]}
          fieldProps={{
            id: "user-form-password",
            maxLength: 20,
          }}
        />
      )}

      <ProFormText
        name="email"
        label="邮箱"
        placeholder="请输入邮箱"
        rules={[{ type: "email", message: "请输入有效的邮箱地址" }]}
      />

      <ProFormText
        name="nickname"
        label="昵称"
        placeholder="请输入昵称"
        rules={[{ max: 20, message: "昵称最多20个字符" }]}
        fieldProps={{
          maxLength: 20,
        }}
      />

      <ProFormSelect
        name="role_ids"
        label="角色"
        mode="multiple"
        placeholder="请选择角色"
        options={roleList.map(role => ({
          label: role.name,
          value: role.code,
        }))}
        fieldProps={{
          loading,
        }}
      />
    </ProForm>
  );
}
