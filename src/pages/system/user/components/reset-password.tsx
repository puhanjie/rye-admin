import { updatePassword } from "@/services/user";
import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import AuthWrapper from "@/components/auth-wrapper";
import { ReloadOutlined } from "@ant-design/icons";
import MD5 from "crypto-js/md5";
import { useTranslation } from "react-i18next";

type ResetPasswordForm = {
  userId?: number;
  newPassword?: string;
};

export default function ResetPassword({
  data,
  clearSelectData,
}: {
  data: API.UserInfo[];
  clearSelectData: () => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleReset = () => {
    if (data.length !== 1) {
      messageApi.warning(t("app.userPage.action.modal.reset.selectOne"));
      return;
    }
    form.setFieldsValue({
      userId: data[0].id,
    });
    setOpen(true);
  };

  const handleOk = async () => {
    const formData: ResetPasswordForm = await form.validateFields();
    setLoading(true);
    const res = await updatePassword({
      userId: formData.userId,
      newPassword: formData.newPassword && MD5(formData.newPassword).toString(),
    });
    if (res.data && res.data <= 0) {
      messageApi.error(t("app.userPage.action.modal.reset.tip.fail"));
    } else {
      messageApi.success(t("app.userPage.action.modal.reset.tip.success"));
    }
    setLoading(false);
    setOpen(false);
    form.resetFields();
    clearSelectData();
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <div>
      {contextHolder}
      <AuthWrapper permission="user:resetPassword">
        <Button icon={<ReloadOutlined />} onClick={handleReset}>
          {t("app.userPage.action.reset")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.userPage.action.modal.reset.title")}
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
          name="resetPassword"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item label="id" name="userId" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.reset.item.newPassword")}
            name="newPassword"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
