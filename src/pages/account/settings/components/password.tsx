import { updatePassword } from "@/services/user";
import { useAppSelector } from "@/store";
import { Button, Col, Form, Input, message, Row } from "antd";
import MD5 from "crypto-js/md5";
import Container from "./container";
import { useTranslation } from "react-i18next";

type PasswordForm = {
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function Password() {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.user);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (values: PasswordForm) => {
    const { userId, currentPassword, newPassword, confirmPassword } = values;
    if (newPassword !== confirmPassword) {
      messageApi.error(t("app.settingsPage.password.inconformity"));
      return;
    }
    const res = await updatePassword({
      type: 2,
      userId,
      currentPassword: MD5(currentPassword).toString(),
      newPassword: MD5(newPassword).toString(),
    });
    if (res?.data && res?.data <= 0) {
      messageApi.error(t("app.settingsPage.password.fail"));
    }
    form.resetFields();
    messageApi.success(t("app.settingsPage.password.success"));
  };

  return (
    <Container title={t("app.settingsPage.password.title")}>
      {contextHolder}
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
