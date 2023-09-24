import routeConfig from '@/router';
import { addRole } from '@/services/role';
import { getDictSelectOptions, getPermissionTreeData } from '@/utils/general';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, TreeSelect, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';

type Props = {
  optionsData?: API.RoleOptions;
  queryData: (params?: API.RoleQuery) => void;
};

const Add: React.FC<Props> = ({ optionsData, queryData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  const handleOk = async () => {
    setLoading(true);
    const role: API.RoleParams = form.getFieldsValue();
    role.roleStatus = role.roleStatus && role.roleStatus[0];
    role.permissions = role.permissions?.map((item) => Number(item));
    const addResult = await addRole(role);
    if (!addResult.data) {
      message.error(t('pages.role.add.tip.fail'));
      form.resetFields();
      return;
    }
    setLoading(false);
    message.success(t('pages.role.add.tip.success'));
    setIsOpen(false);
    form.resetFields();
    // 新增角色成功后重新获取角色列表数据
    queryData();
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
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{
          padding: '12px',
          marginTop: '12px',
          borderTop: '2px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Form name="addRole" form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Form.Item label={t('pages.role.code')} name="code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.role.name')} name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.role.roleStatus')}
            name="roleStatus"
            initialValue={['0']}
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.roleStatus)}
              placeholder={t('pages.role.select.placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('pages.role.permission')} name="permissions">
            <TreeSelect
              allowClear
              treeData={getPermissionTreeData(menuData, optionsData?.permissions)}
              maxTagCount={3}
              treeCheckable={true}
              showCheckedStrategy="SHOW_CHILD"
              placeholder={t('pages.role.select.placeholder')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Add;
