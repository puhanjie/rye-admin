import { Form, Input, Modal } from 'antd';

export type EditPermissionInfo = {
  id?: number;
  name?: string;
  info?: string;
  menu?: string;
  menuName?: string;
};

type Props = {
  className?: string;
  initData: EditPermissionInfo;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditPermissionModal: React.FC<Props> = ({ className, initData, open, setIsOpen }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    console.log(form.getFieldsValue());
    // 编辑权限
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
        title="编辑权限"
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
          name="editPermission"
          form={form}
          initialValues={initData}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item label="id" name="id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item label="权限名" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="权限信息" name="info">
            <Input />
          </Form.Item>
          <Form.Item label="菜单" name="menu">
            <Input />
          </Form.Item>
          <Form.Item label="菜单名称" name="menuName">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditPermissionModal;
