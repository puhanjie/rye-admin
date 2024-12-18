"use client";

import { updatePassword } from "@/services/user";
import { App, Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import AuthWrapper from "@/components/auth-wrapper";
import { ReloadOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import md5 from "md5";

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
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const handleReset = () => {
    if (data.length !== 1) {
      message.warning(t("app.userPage.action.modal.reset.selectOne"));
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
      type: 1,
      userId: formData.userId,
      newPassword: formData.newPassword && md5(formData.newPassword),
    });
    if (res.code !== 0) {
      message.error(
        `${t("app.userPage.action.modal.reset.tip.fail")} : ${res.code} | ${
          res.message
        }`
      );
    } else {
      message.success(t("app.userPage.action.modal.reset.tip.success"));
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
    <AuthWrapper permission="user:resetPassword">
      <Button icon={<ReloadOutlined />} onClick={handleReset}>
        {t("app.userPage.action.reset")}
      </Button>
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
    </AuthWrapper>
  );
}
