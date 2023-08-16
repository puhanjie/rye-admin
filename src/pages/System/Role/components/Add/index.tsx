import routeConfig from '@/router';
import { addRole, getRoleList } from '@/services/role';
import { getPermissionTreeData } from '@/utils/general';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, TreeSelect, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TableRoleInfo } from '../..';
import AuthWrapper from '@/components/AuthWrapper';

type Props = {
  permissionData: API.PermissionInfo[];
  setRoleData: React.Dispatch<React.SetStateAction<API.PageInfo<TableRoleInfo[]> | undefined>>;
};

const Add: React.FC<Props> = ({ permissionData, setRoleData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  const handleOk = async () => {
    const role: API.RoleParams = form.getFieldsValue();
    setIsOpen(false);
    form.resetFields();
    role.permissions = role.permissions?.map((item) => Number(item));
    const addResult = await addRole(role);
    if (!addResult.data) {
      message.error(t('pages.role.add.tip.fail'));
      return;
    }
    // 新增角色成功后重新获取角色列表数据
    const queryResult = await getRoleList();
    if (queryResult.data) {
      const data: API.PageInfo<TableRoleInfo[]> = {
        records: queryResult.data.records.map((item) => ({ key: item.id, ...item })),
        total: queryResult.data.total,
        size: queryResult.data.size,
        current: queryResult.data.current,
        pages: queryResult.data.pages
      };
      setRoleData(data);
    }
    message.success(t('pages.role.add.tip.success'));
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="role:add">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsOpen(true)}>
          {t('pages.role.add')}
        </Button>
      </AuthWrapper>
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
          <Form.Item label={t('pages.role.name')} name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.role.info')} name="info" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.role.permission')} name="permissions">
            <TreeSelect
              allowClear
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
