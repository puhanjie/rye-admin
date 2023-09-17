import { Button, Form, Input, Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { updatePassword } from '@/services/user';
import { ReloadOutlined } from '@ant-design/icons';
import AuthWrapper from '@/components/AuthWrapper';
import MD5 from 'crypto-js/md5';

type Props = {
  data: API.UserInfo[];
  clearSelectData: () => void;
};

type ResetPasswordForm = {
  userId?: number;
  newPassword?: string;
};

const ResetPassword: React.FC<Props> = ({ data, clearSelectData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const handleReset = () => {
    if (data.length !== 1) {
      message.warning(t('common.tip.selectOne'));
      return;
    }
    form.setFieldsValue({
      userId: data[0].id
    });
    setIsOpen(true);
  };

  const handleOk = async () => {
    const formData: ResetPasswordForm = form.getFieldsValue();
    setIsOpen(false);
    // 重置密码
    console.log(formData);
    const res = await updatePassword({
      userId: formData.userId,
      newPassword: formData.newPassword && MD5(formData.newPassword).toString()
    });
    if (res.data && res.data <= 0) {
      // 密码重置失败
      message.error(t('pages.user.resetPassword.tip.fail'));
    }
    message.success(t('pages.user.resetPassword.tip.success'));
    clearSelectData();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="user:resetPassword">
        <Button icon={<ReloadOutlined />} onClick={handleReset}>
          {t('pages.user.resetPassword')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.user.resetPasswordModal.title')}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{
          padding: '12px',
          marginTop: '12px',
          borderTop: '2px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Form name="resetPassword" form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="id" name="userId" hidden>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.user.resetPasswordModal.newPassword')} name="newPassword">
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ResetPassword;
