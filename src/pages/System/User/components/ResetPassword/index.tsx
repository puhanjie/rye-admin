import { Button, Form, Input, Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import type { TableUserInfo } from '../..';
import { useState } from 'react';
import { updatePassword } from '@/services/user';
import { ReloadOutlined } from '@ant-design/icons';

type Props = {
  selectData: TableUserInfo[];
  clearSelectData: () => void;
};

type ResetPasswordForm = {
  userId?: number;
  newPassword?: string;
};

const ResetPassword: React.FC<Props> = ({ selectData, clearSelectData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const handleReset = () => {
    if (selectData.length !== 1) {
      message.warning(t('common.tip.selectOne'));
      return;
    }
    setIsOpen(true);
  };

  const handleOk = async () => {
    setIsOpen(false);
    const formData: ResetPasswordForm = form.getFieldsValue();
    // 重置密码
    const res = await updatePassword({
      userId: formData.userId,
      newPassword: formData.newPassword
    });
    if (res.data && res.data <= 0) {
      // 密码重置失败
      message.error(t('pages.user.resetPassword.tip.fail'));
    }
    message.success(t('pages.user.resetPassword.tip.success'));
    clearSelectData();
    form.resetFields();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <Button icon={<ReloadOutlined />} onClick={handleReset}>
        {t('pages.user.resetPassword')}
      </Button>
      <Modal
        title={t('pages.user.resetPasswordModal.title')}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        bodyStyle={{
          padding: '30px',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        {selectData.length === 1 && (
          <Form
            name="resetPassword"
            form={form}
            // preserve属性避免modal关闭清空表单后重新打开还是上一次的值
            preserve={false}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Form.Item label="id" name="userId" initialValue={selectData[0].id} hidden>
              <Input />
            </Form.Item>
            <Form.Item label={t('pages.user.resetPasswordModal.newPassword')} name="newPassword">
              <Input.Password />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default ResetPassword;
