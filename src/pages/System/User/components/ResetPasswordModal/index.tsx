import { useAppSelector } from '@/store';
import { Form, Input, Modal } from 'antd';

type Props = {
  className?: string;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResetPasswordModal: React.FC<Props> = ({ className, open, setIsOpen }) => {
  const [form] = Form.useForm();
  const { id } = useAppSelector((state) => state.user);

  const handleOk = () => {
    console.log(form.getFieldsValue());
    // 重置密码
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
          <Form.Item label="用户id" name="userId" initialValue={id} hidden>
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
