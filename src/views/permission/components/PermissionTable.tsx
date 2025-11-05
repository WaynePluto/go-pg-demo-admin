import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Modal, Popconfirm, message } from "antd";
import { omit } from "lodash-es";
import { useRef, useState } from "react";
import { usePermission } from "../hooks/usePermission";
import { PermissionForm } from "./PermissionForm";
import type { GetPermissionListRes } from "@/apis/permissionApi";

// 定义表格数据类型，基于新接口返回的数据结构
type PermissionListItem = NonNullable<NonNullable<GetPermissionListRes["data"]>["list"]>[number];

export function PermissionTable() {
  const [formVisible, setFormVisible] = useState(false);
  const [editingPermission, setEditingPermission] = useState<PermissionListItem | undefined>();
  const { fetchPermissions, fetchPermissionDetail, createPermission, updatePermission, deletePermission } =
    usePermission();
  const actionRef = useRef<ActionType>(null);

  const columns: ProColumns<PermissionListItem>[] = [
    {
      title: "权限名称",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "权限编码",
      dataIndex: ["metadata", "code"],
      key: "code",
      ellipsis: true,
      search: false,
    },
    {
      title: "权限路径",
      dataIndex: ["metadata", "path"],
      key: "path",
      ellipsis: true,
      search: false,
    },
    {
      title: "权限类型",
      dataIndex: "type",
      key: "type",
      valueEnum: {
        api: { text: "接口", status: "Default" },
        menu: { text: "菜单", status: "Default" },
        button: { text: "按钮", status: "Default" },
      },
    },
    {
      title: "请求方法",
      dataIndex: ["metadata", "method"],
      key: "method",
      ellipsis: true,
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
        <Button
          className="edit-permission"
          key="edit-permission"
          type="link"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="确定删除这个权限吗？"
          onConfirm={() => handleDelete(record.id!)}
          okText="确定"
          cancelText="取消"
        >
          <Button
            key="delete-permission"
            className="delete-permission"
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
          >
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  const handleAdd = () => {
    setEditingPermission(undefined);
    setFormVisible(true);
  };

  const handleEdit = async (permission: PermissionListItem) => {
    // 调用详情接口获取最新数据
    const detail = await fetchPermissionDetail(permission.id!);
    if (detail) {
      setEditingPermission(detail);
      setFormVisible(true);
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deletePermission(id);
    if (success) {
      // 刷新表格
      actionRef.current?.reload();
    }
  };

  const handleFormFinish = async (values: any) => {
    let success = false;
    if (editingPermission) {
      // 构建基于 type 的完整 metadata，确保在类型切换时能显式清除不相关字段
      const newType = values.type !== undefined ? values.type : editingPermission.type;

      const buildMetadataForType = (type: string, vals: any) => {
        if (type === "api") {
          return {
            code: null,
            path: vals.path !== undefined ? vals.path : editingPermission.metadata?.path,
            method: vals.method !== undefined ? vals.method : editingPermission.metadata?.method,
          };
        }
        if (type === "menu" || type === "button") {
          return {
            code: vals.code !== undefined ? vals.code : editingPermission.metadata?.code,
            path: null,
            method: null,
          };
        }
        // 其他类型保持原样
        return {
          code: vals.code !== undefined ? vals.code : editingPermission.metadata?.code,
          path: vals.path !== undefined ? vals.path : editingPermission.metadata?.path,
          method: vals.method !== undefined ? vals.method : editingPermission.metadata?.method,
        };
      };

      const desiredMetadata = buildMetadataForType(newType, values);

      // 比较其他可变字段
      const changedValues: Record<string, any> = {};
      let hasChanges = false;

      ["name", "type"].forEach(key => {
        if (
          values[key] !== undefined &&
          JSON.stringify(values[key]) !== JSON.stringify((editingPermission as any)[key])
        ) {
          changedValues[key] = values[key];
          hasChanges = true;
        }
      });

      // 比较 metadata
      const oldMeta = editingPermission.metadata || {};
      if (JSON.stringify(oldMeta) !== JSON.stringify(desiredMetadata)) {
        changedValues.metadata = desiredMetadata;
        hasChanges = true;
      }

      if (!hasChanges) {
        message.info("未检测到任何更改");
        return true;
      }

      success = await updatePermission(editingPermission.id!, changedValues);
    } else {
      success = await createPermission(values);
    }

    if (success) {
      setFormVisible(false);
      // 刷新表格
      actionRef.current?.reload();
    }
    return success;
  };

  return (
    <div className="permission-page">
      <ProTable<PermissionListItem>
        headerTitle="权限管理"
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

          // 调用fetchPermissions获取数据
          const permissionList = await fetchPermissions({
            page: params.current || 1,
            pageSize: params.pageSize || 10,
            ...sortParams,
            ...searchParams,
          });

          // 返回格式化后的数据
          return {
            data: permissionList.list,
            success: true,
            total: permissionList.total,
          };
        }}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          defaultPageSize: 10,
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
          <Button className="add-permission" key="add" type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新建权限
          </Button>,
        ]}
      />

      <Modal
        title={editingPermission ? "编辑权限" : "新建权限"}
        open={formVisible}
        onCancel={() => setFormVisible(false)}
        footer={null}
        destroyOnHidden
        width={600}
      >
        <PermissionForm editingPermission={editingPermission} onFinish={handleFormFinish} />
      </Modal>
    </div>
  );
}
