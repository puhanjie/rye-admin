import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, TreeSelect, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addPermission } from '@/services/permission';
import { getDictSelectOptions, getMenuTree } from '@/utils/general';
import routeConfig from '@/router';
import AuthWrapper from '@/components/AuthWrapper';

type Props = {
  optionsData?: API.PermissionOptions;
  queryData: (params?: API.PermissionQuery) => void;
};

const Add: React.FC<Props> = ({ optionsData, queryData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  const handleOk = async () => {
    setLoading(true);
    const permission: API.PermissionParams = form.getFieldsValue();
    permission.permissionStatus = permission.permissionStatus && permission.permissionStatus[0];
    const addResult = await addPermission(permission);
    if (!addResult.data) {
      message.error(t('pages.permission.add.tip.fail'));
      form.resetFields();
      return;
    }
    setLoading(false);
    message.success(t('pages.permission.add.tip.success'));
    setIsOpen(false);
    form.resetFields();
    // 新增权限成功后重新获取权限列表数据
    queryData();
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
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{
          padding: '12px',
          marginTop: '12px',
          borderTop: '2px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Form name="addPermission" form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Form.Item label={t('pages.permission.code')} name="code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.permission.name')} name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.permission.permissionStatus')}
            name="permissionStatus"
            initialValue={['0']}
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.permissionStatus)}
              placeholder={t('pages.permission.select.placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('pages.permission.menu')} name="menu" rules={[{ required: true }]}>
            <TreeSelect
              treeData={getMenuTree(menuData)}
              allowClear
              showCheckedStrategy="SHOW_CHILD"
              placeholder={t('pages.permission.select.placeholder')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Add;
