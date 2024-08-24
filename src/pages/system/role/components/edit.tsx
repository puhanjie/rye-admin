import AuthWrapper from "@/components/auth-wrapper";
import { useRouter } from "@/hooks/useRouter";
import { editRole } from "@/services/role";
import { getDictSelectOptions, getPermissionTreeData } from "@/utils/options";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, TreeSelect } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Edit({
  data,
  optionsData,
  queryData,
}: {
  data: API.RoleInfo[];
  optionsData?: API.RoleOptions;
  queryData: (params?: API.RoleQuery) => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { authRoute } = useRouter();

  const getInitData = () => {
    const { id, code, name, roleStatus, permissions } = data[0];
    return {
      id,
      code,
      name,
      roleStatus: roleStatus.dictValue,
      permissions: permissions?.map((item) => item.id.toString()),
    };
  };

  const handleEdit = () => {
    if (data.length !== 1) {
      messageApi.warning(t("app.rolePage.action.modal.edit.selectOne"));
      return;
    }
    form.setFieldsValue(getInitData());
    setOpen(true);
  };

  const handleOk = async () => {
    const role: API.RoleParams = await form.validateFields();
    role.roleStatus = role.roleStatus && role.roleStatus[0];
    role.permissions = role.permissions?.map((item) => Number(item));
    setLoading(true);
    const editResult = await editRole(role);
    if (!editResult.data) {
      messageApi.error(t("app.rolePage.action.modal.edit.tip.fail"));
    } else {
      messageApi.success(t("app.rolePage.action.modal.edit.tip.success"));
      queryData();
    }
    setLoading(false);
    setOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <div>
      {contextHolder}
      <AuthWrapper permission="role:edit">
        <Button icon={<EditOutlined />} onClick={handleEdit}>
          {t("app.rolePage.action.edit")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.rolePage.action.modal.edit.title")}
        open={open}
        confirmLoading={loading}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        styles={{
          body: {
            padding: "12px",
            marginTop: "12px",
            borderTop: "2px solid rgba(0, 0, 0, 0.06)",
          },
        }}
      >
        <Form
          name="editRole"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Form.Item
            label="id"
            name="id"
            hidden={true}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.rolePage.action.modal.edit.item.code")}
            name="code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.rolePage.action.modal.edit.item.name")}
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.rolePage.action.modal.edit.item.roleStatus")}
            name="roleStatus"
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.roleStatus)}
              placeholder={t("app.rolePage.action.modal.edit.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.rolePage.action.modal.edit.item.permission")}
            name="permissions"
          >
            <TreeSelect
              allowClear
              treeData={getPermissionTreeData(
                authRoute,
                optionsData?.permissions
              )}
              maxTagCount={3}
              treeCheckable={true}
              showCheckedStrategy="SHOW_CHILD"
              placeholder={t("app.rolePage.action.modal.edit.placeholder")}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
