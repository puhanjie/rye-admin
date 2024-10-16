"use client";

import { updatePassword } from "@/services/user";
import { App, Button, Col, Form, Input, Row } from "antd";
import Container from "./container";
import { useUserStore } from "@/store/user";
import { useTranslations } from "next-intl";
import md5 from "md5";

type PasswordForm = {
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function Password() {
  const t = useTranslations();
  const id = useUserStore((state) => state.id);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const handleFinish = async (values: PasswordForm) => {
    const { userId, currentPassword, newPassword, confirmPassword } = values;
    if (newPassword !== confirmPassword) {
      message.error(t("app.settingsPage.password.inconformity"));
      return;
    }
    const res = await updatePassword({
      type: 2,
      userId,
      currentPassword: md5(currentPassword),
      newPassword: md5(newPassword),
    });
    if (res?.data && res?.data <= 0) {
      message.error(t("app.settingsPage.password.fail"));
    }
    form.resetFields();
    message.success(t("app.settingsPage.password.success"));
  };

  return (
    <Container title={t("app.settingsPage.password.title")}>
      <Row>
        <Col xs={24} sm={20} md={14} lg={12} xl={10}>
          <Form
            name="password"
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={handleFinish}
          >
            <Form.Item label="userId" name="userId" initialValue={id} hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label={t("app.settingsPage.password.currentPassword")}
              name="currentPassword"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={t("app.settingsPage.password.newPassword")}
              name="newPassword"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={t("app.settingsPage.password.confirmPassword")}
              name="confirmPassword"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6 }}>
              <Button type="primary" htmlType="submit">
                {t("app.settingsPage.password.submit")}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
