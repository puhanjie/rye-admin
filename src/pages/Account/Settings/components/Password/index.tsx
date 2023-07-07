import { Button, Form, Input } from 'antd';
import styles from './index.module.less';
import { updatePassword } from '@/services/user';
import Container from '../Container';
import { useAppSelector } from '@/store';

type PasswordForm = {
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Password: React.FC = () => {
  const { id } = useAppSelector((state) => state.user);

  const handleFinish = async (values: PasswordForm) => {
    console.log(values);
    const { userId, currentPassword, newPassword, confirmPassword } = values;
    if (newPassword !== confirmPassword) {
      console.log('两次输入密码不一致!');
      return;
    }
    const res = await updatePassword({
      type: 2,
      userId,
      currentPassword: currentPassword,
      newPassword: newPassword
    });
    if (res?.data && res?.data <= 0) {
      console.log('密码修改失败!');
    }
  };

  return (
    <Container title="修改密码" className={styles['container']}>
      <div className={styles['main']}>
        <Form
          name="password"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleFinish}
        >
          <Form.Item label="用户id" name="userId" initialValue={id} hidden>
            <Input />
          </Form.Item>
          <Form.Item label="当前密码" name="currentPassword">
            <Input.Password />
          </Form.Item>
          <Form.Item label="新密码" name="newPassword">
            <Input.Password />
          </Form.Item>
          <Form.Item label="确认密码" name="confirmPassword">
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Container>
  );
};

export default Password;
