import { getRoleSelectOptions } from '@/utils/general';
import { Form, Input, Modal, Select } from 'antd';

type Props = {
  className?: string;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  roleList: API.RoleInfo[];
};

const AddUserModal: React.FC<Props> = ({ className, open, setIsOpen, roleList }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    console.log(form.getFieldsValue());
    // 新增用户
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
        title="新增用户"
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
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="角色" name="roles">
            <Select
              mode="multiple"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getRoleSelectOptions(roleList)}
            />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="手机" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUserModal;
