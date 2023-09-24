import { Button, Form, Input, Modal, Select, TreeSelect, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { editPermission } from '@/services/permission';
import routeConfig from '@/router';
import { getDictSelectOptions, getMenuTree } from '@/utils/general';
import AuthWrapper from '@/components/AuthWrapper';
import { EditOutlined } from '@ant-design/icons';

type Props = {
  data: API.PermissionInfo[];
  optionsData?: API.PermissionOptions;
  queryData: (params?: API.PermissionQuery) => void;
};

const Edit: React.FC<Props> = ({ data, optionsData, queryData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  const getInitData = () => {
    const { id, code, name, permissionStatus, menu } = data[0];
    return {
      id,
      code,
      name,
      permissionStatus: permissionStatus.dictValue,
      menu
    };
  };

  const handleEdit = () => {
    if (data.length !== 1) {
      message.warning(t('common.tip.selectOne'));
      return;
    }
    form.setFieldsValue(getInitData());
    setIsOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);
    const permission: API.PermissionParams = form.getFieldsValue();
    permission.permissionStatus = permission.permissionStatus && permission.permissionStatus[0];
    const editResult = await editPermission(permission);
    if (!editResult.data) {
      message.error(t('pages.permission.edit.tip.fail'));
      form.resetFields();
      return;
    }
    setLoading(false);
    message.success(t('pages.permission.edit.tip.success'));
    setIsOpen(false);
    form.resetFields();
    // 编辑权限成功后重新获取权限列表数据
    queryData();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="permission:edit">
        <Button icon={<EditOutlined />} onClick={handleEdit}>
          {t('pages.permission.edit')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.permission.editModal.title')}
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
        <Form name="editPermission" form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Form.Item label="id" name="id" hidden={true} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
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
              treeDefaultExpandedKeys={data && data.length === 1 ? [data[0].menu] : []}
              showCheckedStrategy="SHOW_CHILD"
              placeholder={t('pages.permission.select.placeholder')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Edit;
