import { routeConfig } from '@/router';
import { getPermissionTreeData } from '@/utils/general';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, TreeSelect } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type AddRoleInfo = {
  name: string;
  info: string;
  permissions?: string[];
};

type Props = {
  permissionData: API.PermissionInfo[];
};

const Add: React.FC<Props> = ({ permissionData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  const handleOk = () => {
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
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsOpen(true)}>
        {t('pages.role.add')}
      </Button>
      <Modal
        title={t('pages.role.addModal.title')}
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
        <Form name="addRole" form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Form.Item label={t('pages.role.name')} name="name">
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.role.info')} name="info">
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.role.permission')} name="permissions">
            <TreeSelect
              treeData={getPermissionTreeData(menuData, permissionData)}
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

export default Add;
