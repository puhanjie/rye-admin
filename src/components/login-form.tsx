import { LockOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space } from "antd";

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
  // 登录表单提交
  const handleFinish = async (values: LoginParams) => {
    const loginParams =
      loginType === "account"
        ? {
            username: values.username,
            password: values.password,
            type: loginType,
          }
        : {
            phone: values.phone,
            captcha: values.captcha,
            type: loginType,
          };
    // const res = await login(loginParams);

    // if (res?.data) {
    //   // 登录成功,保存token
    //   setToken(res.data);
    //   navigate("/");
    // }
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
                message: "请输入用户名",
              },
            ]}
          >
            <Input placeholder="username" prefix={<UserOutlined />} />
          </Item>
          <Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Password placeholder="password" prefix={<LockOutlined />} />
          </Item>
        </>
      ) : (
        <>
          <Item
            name="phone"
            rules={[
              {
                required: true,
                message: "请输入手机号",
              },
            ]}
          >
            <Input placeholder="phone" prefix={<MobileOutlined />} />
          </Item>
          <Item
            name="captcha"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Compact>
              <Input placeholder="captcha" prefix={<LockOutlined />} />
              <Button>获取验证码</Button>
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
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <a href="">忘记密码？</a>
        </div>
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          登录
        </Button>
      </Item>
    </Form>
  );
}
