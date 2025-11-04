import type { UserDetailResponse } from "@/hono-api-type/modules/user/model";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { ProColumns, ActionType } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Modal, Popconfirm, Space, Tag, message } from "antd";
import { useState, useRef, useEffect } from "react";
import { UserForm } from "./UserForm";
import { useUser } from "../hooks/useUser";
import { omit } from "lodash-es";
import { useRoleContext, useRoleState } from "../hooks/useRoleContext";

export function UserTable() {
  const [formVisible, setFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserDetailResponse | undefined>();
  const { fetchUsers, fetchUserDetail, createUser, updateUser, deleteUser } = useUser();
  const { state: roleState, actions: roleActions } = useRoleContext();
  const actionRef = useRef<ActionType>(null);

  const columns: ProColumns<UserDetailResponse>[] = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      ellipsis: true,
    },
    {
      title: "昵称",
      dataIndex: "nickname",
      key: "nickname",
      ellipsis: true,
      render: text => text || "-",
      search: false,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      render: text => text || "-",
      search: false,
    },
    {
      title: "角色",
      dataIndex: "role_codes",
      key: "role_codes",
      render: (_, record) => {
        const roleCodes = record.role_codes || [];
        return (
          <Space wrap>
            {roleCodes.map(roleCode => {
              const role = roleState.roleList.find(role => role.code === roleCode);
              return role ? <Tag key={roleCode}>{role.name}</Tag> : null;
            })}
          </Space>
        );
      },
      search: false,
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      key: "created_at",
      valueType: "dateTime",
      sorter: true,
      search: false,
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      key: "updated_at",
      valueType: "dateTime",
      sorter: true,
      search: false,
    },
    {
      title: "操作",
      key: "action",
      valueType: "option",
      fixed: "right",
      width: 160,
      render: (_, record) => [
        <Button key="edit-user" type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="确定删除这个用户吗？"
          onConfirm={() => handleDelete(record.id)}
          okText="确定"
          cancelText="取消"
        >
          <Button key="delete-user" type="link" size="small" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  const handleAdd = () => {
    setEditingUser(undefined);
    setFormVisible(true);
  };

  const handleEdit = async (user: UserDetailResponse) => {
    // 调用详情接口获取最新数据
    const detail = await fetchUserDetail(user.id);
    if (detail) {
      setEditingUser(detail);
      setFormVisible(true);
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteUser(id);
    if (success) {
      // 刷新表格
      actionRef.current?.reload();
    }
  };

  const handleFormFinish = async (values: any) => {
    let success = false;
    if (editingUser) {
      // 比较原始数据和表单数据，找出变更字段
      const changedValues: Record<string, any> = {};
      let hasChanges = false;

      Object.keys(values).forEach(key => {
        if (JSON.stringify(values[key]) !== JSON.stringify((editingUser as any)[key])) {
          changedValues[key] = values[key];
          hasChanges = true;
        }
      });

      if (!hasChanges) {
        message.info("未检测到任何更改");
        return true;
      }

      success = await updateUser(editingUser.id, changedValues);
    } else {
      success = await createUser(values);
    }

    if (success) {
      setFormVisible(false);
      // 刷新表格
      actionRef.current?.reload();
    }
    return success;
  };

  return (
    <div className="user-page">
      <ProTable<UserDetailResponse>
        headerTitle="用户管理"
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        request={async (params, sorter, filter) => {
          // 处理排序
          const sortParams: any = {};
          const sorterKeys = Object.keys(sorter);
          if (sorterKeys.length > 0) {
            const sorterField = sorterKeys[0];
            sortParams.orderBy = sorterField;
            sortParams.order = sorter[sorterField] === "ascend" ? "asc" : "desc";
          }

          // 处理搜索
          const searchParams: any = {};

          const otherParams = omit(params, ["page", "pageSize"]);
          Object.keys(otherParams).forEach(key => {
            if (otherParams[key]) {
              searchParams[key] = otherParams[key];
            }
          });

          roleActions.fetchRoles();

          // 调用fetchUsers获取数据
          const userList = await fetchUsers({
            page: params.current || 1,
            pageSize: params.pageSize || 20,
            ...sortParams,
            ...searchParams,
          });

          // 返回格式化后的数据
          return {
            data: userList.list as UserDetailResponse[],
            success: true,
            total: userList.total,
          };
        }}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          defaultPageSize: 20,
        }}
        scroll={{
          x: "max-content",
          y: `${window.innerHeight - 400}px`,
        }}
        search={{
          labelWidth: "auto",
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新建用户
          </Button>,
        ]}
        loading={roleState.loading}
      />

      <Modal
        title={editingUser ? "编辑用户" : "新建用户"}
        open={formVisible}
        onCancel={() => setFormVisible(false)}
        footer={null}
        destroyOnHidden
        width={600}
      >
        <UserForm editingUser={editingUser} onFinish={handleFormFinish} onCancel={() => setFormVisible(false)} />
      </Modal>
    </div>
  );
}