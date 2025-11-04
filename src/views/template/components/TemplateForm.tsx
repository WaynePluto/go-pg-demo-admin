import type { GetTemplateByIdRes, PostTemplateBody, PutTemplateByIdBody } from "@/apis/templateApi";
import type { ModalFormProps } from "@ant-design/pro-components";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { isValidElement } from "react";

interface TemplateFormProps extends Omit<ModalFormProps, "onFinish"> {
  editingTemplate?: GetTemplateByIdRes["data"];
  onFinish: (values: PostTemplateBody | PutTemplateByIdBody) => Promise<boolean>;
  onCancel?: () => void;
}

export function TemplateForm({ editingTemplate, onFinish, title, onCancel, ...props }: TemplateFormProps) {
  const isEdit = !!editingTemplate;

  // Ensure title is string or undefined
  const safeTitle: string | undefined =
    typeof title === "string" ? title : isValidElement(title) ? (title as any).props?.title : undefined;

  const handleFinish = async (values: PostTemplateBody | PutTemplateByIdBody) => {
    return await onFinish(values);
  };

  return (
    <ProForm
      {...props}
      title={safeTitle}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={editingTemplate}
      submitter={{
        searchConfig: {
          submitText: isEdit ? "更新" : "创建",
          resetText: "重置",
        },
        resetButtonProps: {
          onClick: onCancel,
        },
        submitButtonProps: {
          id: "template-form-submit",
        },
      }}
    >
      <ProFormText
        name="name"
        label="模板名称"
        placeholder="请输入模板名称"
        rules={[{ required: true, message: "请输入模板名称" }]}
        fieldProps={{
          id: "template-form-name",
          maxLength: 50,
        }}
      />
    </ProForm>
  );
}
