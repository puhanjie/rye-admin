import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, TreeSelect, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addPermission, getPermissionList } from '@/services/permission';
import { getMenuTree } from '@/utils/general';
import routeConfig from '@/router';
import AuthWrapper from '@/components/AuthWrapper';

type Props = {
  setPermissionData: React.Dispatch<
    React.SetStateAction<API.PageInfo<API.PermissionInfo[]> | undefined>
  >;
};

const Add: React.FC<Props> = ({ setPermissionData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  const handleOk = async () => {
    const permission: API.PermissionParams = form.getFieldsValue();
    setIsOpen(false);
    form.resetFields();
    const addResult = await addPermission(permission);
    if (!addResult.data) {
      message.error(t('pages.permission.add.tip.fail'));
      return;
    }
    // 新增权限成功后重新获取权限列表数据
    const queryResult = await getPermissionList();
    if (!queryResult.data) {
      return;
    }
    setPermissionData(queryResult.data);
    message.success(t('pages.permission.add.tip.success'));
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="permission:add">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsOpen(true)}>
          {t('pages.permission.add')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.permission.addModal.title')}
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
        <Form name="addPermission" form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 17 }}>
          <Form.Item label={t('pages.permission.name')} name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.permission.info')} name="info" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.permission.menu')} name="menu" rules={[{ required: true }]}>
            <TreeSelect
              treeData={getMenuTree(menuData)}
              allowClear
              showCheckedStrategy="SHOW_CHILD"
              placeholder={t('pages.permission.modal.menu.placeholder')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Add;
