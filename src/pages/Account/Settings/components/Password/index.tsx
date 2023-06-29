import { Button, Form, Input } from 'antd';
import styles from './index.module.less';
import { updatePassword } from '@/services/user';
import Container from '../Container';
import { useAppSelector } from '@/store';

type PasswordForm = {
  userId: number;
  currpwd: string;
  newpwd: string;
  cfmpwd: string;
};

const Password: React.FC = () => {
  const { id } = useAppSelector((state) => state.user);

  const handleFinish = async (values: PasswordForm) => {
    const { userId, currpwd, newpwd, cfmpwd } = values;
    if (newpwd !== cfmpwd) {
      console.log('两次输入密码不一致!');
      return;
    }
    await updatePassword({
      userId,
      currpwd,
      newpwd
    });
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
          <Form.Item label="当前密码" name="currpwd">
            <Input.Password />
          </Form.Item>
          <Form.Item label="新密码" name="newpwd">
            <Input.Password />
          </Form.Item>
          <Form.Item label="确认密码" name="cfmpwd">
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
