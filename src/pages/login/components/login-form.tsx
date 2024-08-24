import { login } from "@/services/user";
import { setToken } from "@/utils/auth";
import { LockOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space } from "antd";
import MD5 from "crypto-js/md5";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export type LoginParams = {
  username?: string;
  password?: string;
  phone?: string;
  captcha?: number;
  type: "account" | "phone";
};

const { Item } = Form;
const { Password } = Input;
const { Compact } = Space;

export default function LoginForm({
  loginType,
}: {
  loginType: "account" | "phone";
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // 登录表单提交
  const handleFinish = async (values: LoginParams) => {
    const loginParams =
      loginType === "account"
        ? {
            username: values.username,
            password: values.password && MD5(values.password).toString(),
            type: loginType,
          }
        : {
            phone: values.phone,
            captcha: values.captcha,
            type: loginType,
          };
    const res = await login(loginParams);

    if (res.code === 0 && res.data) {
      // 登录成功,保存token
      setToken(res.data);
      navigate("/");
    }
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
          <Item
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
          </Item>
          <Item
            name="password"
            rules={[
              {
                required: true,
                message: t("app.loginPage.accountLogin.password.required"),
              },
            ]}
          >
            <Password
              placeholder={t("app.loginPage.accountLogin.password.placeholder")}
              prefix={<LockOutlined />}
            />
          </Item>
        </>
      ) : (
        <>
          <Item
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
          </Item>
          <Item
            name="captcha"
            rules={[
              {
                required: true,
                message: t("app.loginPage.phoneLogin.captcha.required"),
              },
            ]}
          >
            <Compact>
              <Input
                placeholder={t("app.loginPage.phoneLogin.captcha.placeholder")}
                prefix={<LockOutlined />}
              />
              <Button>{t("app.loginPage.phoneLogin.captchaButton")}</Button>
            </Compact>
          </Item>
        </>
      )}
      <Item>
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
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          {t("app.loginPage.loginButton")}
        </Button>
      </Item>
    </Form>
  );
}
