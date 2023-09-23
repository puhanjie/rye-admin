import routeConfig from '@/router';
import { editRole, getRoleList } from '@/services/role';
import { getDictSelectOptions, getPermissionTreeData } from '@/utils/general';
import { Button, Form, Input, Modal, Select, TreeSelect, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { EditOutlined } from '@ant-design/icons';

type Props = {
  data: API.RoleInfo[];
  optionsData?: API.RoleOptions;
  setRoleData: React.Dispatch<React.SetStateAction<API.Page<API.RoleInfo[]> | undefined>>;
};

const Edit: React.FC<Props> = ({ data, optionsData, setRoleData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  const getInitData = () => {
    const { id, code, name, roleStatus, permissions } = data[0];
    return {
      id,
      code,
      name,
      roleStatus: roleStatus.dictValue,
      permissions: permissions?.map((item) => item.id.toString())
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
    const role: API.RoleParams = form.getFieldsValue();
    role.roleStatus = role.roleStatus && role.roleStatus[0];
    role.permissions = role.permissions?.map((item) => Number(item));
    const editResult = await editRole(role);
    if (!editResult.data) {
      message.error(t('pages.role.edit.tip.fail'));
      form.resetFields();
      return;
    }
    setLoading(false);
    message.success(t('pages.role.edit.tip.success'));
    setIsOpen(false);
    form.resetFields();
    // 编辑角色成功后重新获取角色列表数据
    const queryResult = await getRoleList();
    if (!queryResult.data) {
      return;
    }
    setRoleData(queryResult.data);
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="role:edit">
        <Button icon={<EditOutlined />} onClick={handleEdit}>
          {t('pages.role.edit')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.role.editModal.title')}
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
        <Form name="editRole" form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Form.Item label="id" name="id" hidden={true} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.role.code')} name="code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.role.name')} name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.role.roleStatus')}
            name="roleStatus"
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

export default Edit;
