import { routeConfig } from '@/router';
import { getPermissionTreeData } from '@/utils/general';
import { Form, Input, Modal, TreeSelect } from 'antd';

export type EditRoleInfo = {
  id: number;
  name: string;
  info: string;
  permissions?: string[];
  permissionList: API.PermissionInfo[];
};

type Props = {
  className?: string;
  initData: EditRoleInfo;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditRoleModal: React.FC<Props> = ({ className, initData, open, setIsOpen }) => {
  const [form] = Form.useForm();
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  const getFormInitData = (initValues: EditRoleInfo) => {
    const formInitData: EditRoleInfo = initValues;
    if (initValues?.permissions) {
      // 筛选出admin权限，id为1的是admin
      const adminPermission = initValues.permissions?.filter((item) => item === '1');
      if (adminPermission.length > 0) {
        const permissionIds = initValues.permissionList.map((item) => item.id.toString());
        formInitData.permissions = permissionIds.filter((item) => item !== '1');
        return formInitData;
      }
    }
    return formInitData;
  };

  const handleOk = () => {
    const formData: EditRoleInfo = form.getFieldsValue();
    // 提交到后台处理需要把权限id值转为number类型
    const permissions = formData.permissions?.map((item) => Number(item));
    const data = {
      id: formData.id,
      name: formData.name,
      info: formData.info,
      permissions: permissions
    };
    console.log(data);
    // 编辑角色
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
        title="编辑角色"
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
          name="editRole"
          form={form}
          initialValues={getFormInitData(initData)}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item label="id" name="id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item label="角色名" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="角色信息" name="info">
            <Input />
          </Form.Item>
          <Form.Item label="权限" name="permissions">
            <TreeSelect
              treeData={getPermissionTreeData(menuData, initData.permissionList)}
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

export default EditRoleModal;
