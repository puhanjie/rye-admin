import { Button, Form, Input, message } from 'antd';
import styles from './index.module.less';
import { updatePassword } from '@/services/user';
import Container from '../Container';
import { useAppSelector } from '@/store';
import { useTranslation } from 'react-i18next';
import MD5 from 'crypto-js/md5';

type PasswordForm = {
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Password: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.user);
  const [form] = Form.useForm();

  const handleFinish = async (values: PasswordForm) => {
    const { userId, currentPassword, newPassword, confirmPassword } = values;
    if (newPassword !== confirmPassword) {
      message.error(t('pages.settings.updatePassword.tip'));
      return;
    }
    const res = await updatePassword({
      type: 2,
      userId,
      currentPassword: MD5(currentPassword).toString(),
      newPassword: MD5(newPassword).toString()
    });
    if (res?.data && res?.data <= 0) {
      message.error(t('pages.settings.updatePassword.tip.fail'));
    }
    form.resetFields();
    message.success(t('pages.settings.updatePassword.tip.success'));
  };

  return (
    <Container title={t('pages.settings.updatePassword.tab')} className={styles['container']}>
      <div className={styles['main']}>
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
          <Form.Item wrapperCol={{ offset: 6 }}>
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
