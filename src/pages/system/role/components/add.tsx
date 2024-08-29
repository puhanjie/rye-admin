import AuthWrapper from "@/components/auth-wrapper";
import { useRouter } from "@/hooks/useRouter";
import { addRole } from "@/services/role";
import { getDictSelectOptions, getPermissionTreeData } from "@/utils/options";
import { PlusOutlined } from "@ant-design/icons";
import { App, Button, Form, Input, Modal, Select, TreeSelect } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Add({
  optionsData,
  queryData,
}: {
  optionsData?: API.RoleOptions;
  queryData: (params?: API.RoleQuery) => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { authRoute } = useRouter();

  const handleOk = async () => {
    const role: API.RoleParams = await form.validateFields();
    role.roleStatus = role.roleStatus && role.roleStatus[0];
    role.permissions = role.permissions?.map((item) => Number(item));
    setLoading(true);
    const addResult = await addRole(role);
    if (!addResult.data) {
      message.error(t("app.rolePage.action.modal.add.tip.fail"));
    } else {
      message.success(t("app.rolePage.action.modal.add.tip.success"));
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
      <AuthWrapper permission="role:add">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          {t("app.rolePage.action.add")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.rolePage.action.modal.add.title")}
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
          name="addRole"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Form.Item
            label={t("app.rolePage.action.modal.add.item.code")}
            name="code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.rolePage.action.modal.add.item.name")}
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.rolePage.action.modal.add.item.roleStatus")}
            name="roleStatus"
            initialValue={["0"]}
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.roleStatus)}
              placeholder={t("app.rolePage.action.modal.add.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.rolePage.action.modal.add.item.permission")}
            name="permissions"
          >
            <TreeSelect
              allowClear
              treeData={getPermissionTreeData(
                authRoute.filter((item) => item.path === "/")[0].children,
                optionsData?.permissions
              )}
              maxTagCount={3}
              treeCheckable={true}
              showCheckedStrategy="SHOW_CHILD"
              placeholder={t("app.rolePage.action.modal.add.placeholder")}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
