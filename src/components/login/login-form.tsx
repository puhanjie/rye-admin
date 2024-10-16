"use client";

import { useRouter } from "@/navigation";
import { login } from "@/services/user";
import { setToken } from "@/utils/auth";
import { LockOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import { App, Button, Checkbox, Form, Input, Space } from "antd";
import md5 from "md5";
import { useLocale, useTranslations } from "next-intl";

export type LoginParams = {
  username?: string;
  password?: string;
  phone?: string;
  captcha?: number;
  type: "account" | "phone";
};

export default function LoginForm({
  loginType,
}: {
  loginType: "account" | "phone";
}) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();
  const { message } = App.useApp();

  // 登录表单提交
  const handleFinish = async (values: LoginParams) => {
    const loginParams =
      loginType === "account"
        ? {
            username: values.username,
            password: values.password && md5(values.password),
            type: loginType,
          }
        : {
            phone: values.phone,
            captcha: values.captcha,
            type: loginType,
          };
    const loginRes = await login(loginParams);
    if (loginRes.code !== 0) {
      message.error(`${loginRes.code} | ${loginRes.message}`);
      return;
    }
    // 登录成功,保存token
    setToken(loginRes.data as string);
    router.push("/", { locale });
  };

  return (
    <Form
      name={loginType}
      initialValues={{
        remember: true,
      }}
      onFinish={handleFinish}
    >
      {loginType === "account" ? (
        <>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: t("app.loginPage.accountLogin.username.required"),
              },
            ]}
          >
            <Input
              placeholder={t("app.loginPage.accountLogin.username.placeholder")}
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t("app.loginPage.accountLogin.password.required"),
              },
            ]}
          >
            <Input.Password
              placeholder={t("app.loginPage.accountLogin.password.placeholder")}
              prefix={<LockOutlined />}
            />
          </Form.Item>
        </>
      ) : (
        <>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: t("app.loginPage.phoneLogin.phone.required"),
              },
            ]}
          >
            <Input
              placeholder={t("app.loginPage.phoneLogin.phone.placeholder")}
              prefix={<MobileOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="captcha"
            rules={[
              {
                required: true,
                message: t("app.loginPage.phoneLogin.captcha.required"),
              },
            ]}
          >
            <Space.Compact>
              <Input
                placeholder={t("app.loginPage.phoneLogin.captcha.placeholder")}
                prefix={<LockOutlined />}
              />
              <Button>{t("app.loginPage.phoneLogin.captchaButton")}</Button>
            </Space.Compact>
          </Form.Item>
        </>
      )}
      <Form.Item>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{t("app.loginPage.rememberMe")}</Checkbox>
          </Form.Item>
          <a href="">{t("app.loginPage.forgotPassword")}</a>
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          {t("app.loginPage.loginButton")}
        </Button>
      </Form.Item>
    </Form>
  );
}
