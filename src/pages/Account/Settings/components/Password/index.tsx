import { Button, Form, Input, message } from 'antd';
import styles from './index.module.less';
import { updatePassword } from '@/services/user';
import Container from '../Container';
import { useAppSelector } from '@/store';
import { useTranslation } from 'react-i18next';

type PasswordForm = {
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Password: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.user);

  const handleFinish = async (values: PasswordForm) => {
    console.log(values);
    const { userId, currentPassword, newPassword, confirmPassword } = values;
    if (newPassword !== confirmPassword) {
      message.error(t('pages.settings.updatePassword.tip'));
      return;
    }
    const res = await updatePassword({
      type: 2,
      userId,
      currentPassword: currentPassword,
      newPassword: newPassword
    });
    if (res?.data && res?.data <= 0) {
      message.error(t('pages.settings.updatePassword.tip.fail'));
    }
  };

  return (
    <Container title={t('pages.settings.updatePassword.tab')} className={styles['container']}>
      <div className={styles['main']}>
        <Form
          name="password"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleFinish}
        >
          <Form.Item label="userId" name="userId" initialValue={id} hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.settings.updatePassword.currentPassword')}
            name="currentPassword"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label={t('pages.settings.updatePassword.newPassword')} name="newPassword">
            <Input.Password />
          </Form.Item>
          <Form.Item
            label={t('pages.settings.updatePassword.confirmPassword')}
            name="confirmPassword"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type="primary" htmlType="submit">
              {t('common.button.submit')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Container>
  );
};

export default Password;
