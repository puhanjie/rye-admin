import { getRoleSelectOptions } from '@/utils/general';
import { Form, Input, Modal, Select } from 'antd';

export type EditUserInfo = {
  id: number;
  username: string;
  phone: string;
  avatar: string;
  email: string;
  roles?: number[];
  roleList: API.RoleInfo[];
};

type Props = {
  className?: string;
  initData: EditUserInfo;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditUserModal: React.FC<Props> = ({ className, initData, open, setIsOpen }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    console.log(form.getFieldsValue());
    // 编辑用户
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
        title="编辑用户"
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
        <Form
          name="editUser"
          form={form}
          initialValues={initData}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item label="id" name="id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="角色" name="roles">
            <Select
              mode="multiple"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getRoleSelectOptions(initData.roleList)}
            />
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

export default EditUserModal;
