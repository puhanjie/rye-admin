import { updatePassword } from '@/services/user';
import { Form, Input, Modal } from 'antd';
import { TableUserInfo } from '../..';

type Props = {
  className?: string;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedData: TableUserInfo[];
};

type ResetPassword = {
  userId?: number;
  newPassword?: string;
};

const ResetPasswordModal: React.FC<Props> = ({ className, open, setIsOpen, selectedData }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    const formData: ResetPassword = form.getFieldsValue();
    console.log(formData);
    // 重置密码
    const res = await updatePassword({
      userId: formData.userId,
      newPassword: formData.newPassword
    });
    if (res?.data && res?.data <= 0) {
      // 密码重置失败
      console.log('密码重置失败!');
    }
    setIsOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };
  return (
    <div className={className}>
      <Modal
        title="重置密码"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        bodyStyle={{
          padding: '30px',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Form name="addUser" form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="用户id" name="userId" initialValue={selectedData[0].id} hidden>
            <Input />
          </Form.Item>
          <Form.Item label="新密码" name="newPassword">
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ResetPasswordModal;
