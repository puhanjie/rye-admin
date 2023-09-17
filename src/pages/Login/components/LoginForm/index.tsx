import { Button, Checkbox, Form, Input, Space } from 'antd';
import { login } from '@/services/user';
import { setToken } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import MD5 from 'crypto-js/md5';

type Props = {
  loginType: 'account' | 'phone';
};

const LoginForm: React.FC<Props> = ({ loginType }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // 登录表单提交
  const handleFinish = async (values: API.LoginParams) => {
    const loginParams =
      loginType === 'account'
        ? {
            username: values.username,
            password: values.password && MD5(values.password).toString(),
            type: loginType
          }
        : {
            phone: values.phone,
            captcha: values.captcha,
            type: loginType
          };
    const res = await login(loginParams);

    if (res?.data) {
      // 登录成功,保存token
      setToken(res.data);
      navigate('/');
    }
  };

  return (
    <Form
      name={loginType}
      initialValues={{
        remember: true
      }}
      onFinish={handleFinish}
    >
      {loginType === 'account' ? (
        <>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: t('pages.login.username.required')
              }
            ]}
          >
            <Input placeholder={t('pages.login.username.placeholder')} prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t('pages.login.password.required')
              }
            ]}
          >
            <Input.Password
              placeholder={t('pages.login.password.placeholder')}
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
                message: t('pages.login.phoneNumber.required')
              }
            ]}
          >
            <Input
              placeholder={t('pages.login.phoneNumber.placeholder')}
              prefix={<MobileOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="captcha"
            rules={[
              {
                required: true,
                message: t('pages.login.captcha.required')
              }
            ]}
          >
            <Space.Compact style={{ width: '300px' }}>
              <Input
                placeholder={t('pages.login.captcha.placeholder')}
                prefix={<LockOutlined />}
                style={{ width: '200px' }}
              />
              <Button style={{ width: '100px' }}>
                {t('pages.login.phoneLogin.getVerificationCode')}
              </Button>
            </Space.Compact>
          </Form.Item>
        </>
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
            <Checkbox>{t('pages.login.rememberMe')}</Checkbox>
          </Form.Item>
          <a href="">{t('pages.login.forgotPassword')}</a>
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          {t('pages.login.submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
