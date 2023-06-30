import { routeConfig } from '@/router';
import { getPermissionTreeData } from '@/utils/general';
import { Form, Input, Modal, TreeSelect } from 'antd';

type Props = {
  className?: string;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  permissionList: API.PermissionInfo[];
};

export type AddRoleInfo = {
  name: string;
  info: string;
  permissions?: string[];
};

const AddRoleModal: React.FC<Props> = ({ className, open, setIsOpen, permissionList }) => {
  const [form] = Form.useForm();
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  const handleOk = () => {
    // console.log(form.getFieldsValue());
    const formData: AddRoleInfo = form.getFieldsValue();
    // 提交到后台处理需要把权限id值转为number类型
    const permissions = formData.permissions?.map((item) => Number(item));
    const data = {
      name: formData.name,
      info: formData.info,
      permissions: permissions
    };
    console.log(data);
    // 新增角色
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
        title="新增角色"
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
        <Form name="addRole" form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="角色名" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="角色信息" name="info">
            <Input />
          </Form.Item>
          <Form.Item label="权限" name="permissions">
            <TreeSelect
              treeData={getPermissionTreeData(menuData, permissionList)}
              maxTagCount={3}
              treeCheckable={true}
              showCheckedStrategy="SHOW_CHILD"
              placeholder="Please select"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRoleModal;
