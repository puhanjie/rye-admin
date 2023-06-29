import { Button, Checkbox, Form, Input, Space } from 'antd';
import { login } from '@/services/user';
import { setToken } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';

type Props = {
  loginType: 'account' | 'phone';
};

const LoginForm: React.FC<Props> = ({ loginType }) => {
  const navigate = useNavigate();
  // 登录表单提交
  const handleFinish = async (values: API.LoginParams) => {
    const res = await login({
      username: values.username,
      password: values.password,
      type: loginType
    });

    if (res?.data) {
      // 登录成功，保存token
      setToken(res.data.token);
      navigate('/');
    }
  };

  return (
    <Form
      name="login"
      initialValues={{
        remember: true
      }}
      onFinish={handleFinish}
    >
      {loginType === 'account' ? (
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名'
            }
          ]}
        >
          <Input placeholder="用户名: admin or guest" prefix={<UserOutlined />} />
        </Form.Item>
      ) : (
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: '请输入手机号'
            }
          ]}
        >
          <Input placeholder="请输入手机号" prefix={<MobileOutlined />} />
        </Form.Item>
      )}

      {loginType === 'account' ? (
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码'
            }
          ]}
        >
          <Input.Password placeholder="密码: admin or guest" prefix={<LockOutlined />} />
        </Form.Item>
      ) : (
        <Form.Item
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入验证码'
            }
          ]}
        >
          <Space.Compact style={{ width: '300px' }}>
            <Input placeholder="请输入验证码" prefix={<LockOutlined />} />
            <Button>获取验证码</Button>
          </Space.Compact>
        </Form.Item>
      )}
      <Form.Item>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <a href="">忘记密码 ?</a>
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          登陆
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
