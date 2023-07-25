import { routeConfig } from '@/router';
import { getPermissionTreeData } from '@/utils/general';
import { Form, Input, Modal, TreeSelect } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type EditRoleInfo = {
  id: number;
  name: string;
  info: string;
  permissions?: string[];
  permissionList: API.PermissionInfo[];
};

type Props = {
  roleData: EditRoleInfo;
};

const Edit: React.FC<Props> = ({ roleData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
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
    <div>
      <a type="link" onClick={() => setIsOpen(true)}>
        {t('pages.role.edit')}
      </a>
      <Modal
        title={t('pages.role.editModal.title')}
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
        <Form
          name="editRole"
          form={form}
          initialValues={getFormInitData(roleData)}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item label="id" name="id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.role.name')} name="name">
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.role.info')} name="info">
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.role.permission')} name="permissions">
            <TreeSelect
              treeData={getPermissionTreeData(menuData, roleData.permissionList)}
              maxTagCount={3}
              treeCheckable={true}
              showCheckedStrategy="SHOW_CHILD"
              placeholder={t('pages.role.modal.permission.placeholder')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Edit;
