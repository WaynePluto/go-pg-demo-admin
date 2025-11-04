import type { GetTemplateByIdRes, GetTemplateListRes } from "@/apis/templateApi";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Modal, Popconfirm, message } from "antd";
import { omit } from "lodash-es";
import { useRef, useState } from "react";
import { useTemplate } from "../hooks/useTemplate";
import { TemplateForm } from "./TemplateForm";

export function TemplateTable() {
  const [formVisible, setFormVisible] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<GetTemplateByIdRes["data"] | undefined>();
  const { fetchTemplates, fetchTemplateDetail, createTemplate, updateTemplate, deleteTemplate } = useTemplate();
  const actionRef = useRef<ActionType>(null);

  // 定义模板类型，排除undefined字段
  type TemplateType = NonNullable<GetTemplateByIdRes["data"]>;
  
  const handleEdit = async (template: TemplateType) => {
    // 调用详情接口获取最新数据
    const detail = await fetchTemplateDetail(template.id!);
    if (detail) {
      setEditingTemplate(detail);
      setFormVisible(true);
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteTemplate(id);
    if (success) {
      // 刷新表格
      actionRef.current?.reload();
    }
  };

  const handleFormFinish = async (values: any) => {
    let success = false;
    if (editingTemplate && editingTemplate.id) {
      // 比较原始数据和表单数据，找出变更字段
      const changedValues: Record<string, any> = {};
      let hasChanges = false;

      Object.keys(values).forEach(key => {
        if (JSON.stringify(values[key]) !== JSON.stringify((editingTemplate as any)[key])) {
          changedValues[key] = values[key];
          hasChanges = true;
        }
      });

      if (!hasChanges) {
        message.info("未检测到任何更改");
        return true;
      }

      success = await updateTemplate(editingTemplate.id, changedValues);
    } else {
      success = await createTemplate(values);
    }

    if (success) {
      setFormVisible(false);
      // 刷新表格
      actionRef.current?.reload();
    }
    return success;
  };

  const columns: ProColumns<TemplateType>[] = [
    {
      title: "模板名称",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
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
          className="edit-template"
          key="edit-template"
          type="link"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="确定删除这个模板吗？"
          onConfirm={() => handleDelete(record.id!)}
          okText="确定"
          cancelText="取消"
        >
          <Button
            key="delete-template"
            className="delete-template"
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

  return (
    <div className="template-page">
      <ProTable<TemplateType>
        headerTitle="模板管理"
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

          // 调用fetchTemplates获取数据
          const templateList = await fetchTemplates({
            page: params.current || 1,
            pageSize: params.pageSize || 10,
            ...sortParams,
            ...searchParams,
          });

          // 返回格式化后的数据
          return {
            data: (templateList?.list || []) as TemplateType[],
            success: true,
            total: templateList?.total || 0,
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
          <Button className="add-template" key="add" type="primary" icon={<PlusOutlined />} onClick={() => setFormVisible(true)}>
            新建模板
          </Button>,
        ]}
      />

      <Modal
        title={editingTemplate ? "编辑模板" : "新建模板"}
        open={formVisible}
        onCancel={() => setFormVisible(false)}
        footer={null}
        destroyOnHidden
        width={600}
      >
        <TemplateForm 
          editingTemplate={editingTemplate} 
          onFinish={handleFormFinish} 
          onCancel={() => setFormVisible(false)}
        />
      </Modal>
    </div>
  );
}