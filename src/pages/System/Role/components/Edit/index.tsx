import routeConfig from '@/router';
import { editRole, getRoleList } from '@/services/role';
import { getPermissionTreeData } from '@/utils/general';
import { Button, Form, Input, Modal, TreeSelect, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import type { RoleDetail } from '../..';
import { EditOutlined } from '@ant-design/icons';

type Props = {
  data: RoleDetail;
  setRoleData: React.Dispatch<React.SetStateAction<API.PageInfo<API.RoleInfo[]> | undefined>>;
};

const Edit: React.FC<Props> = ({ data, setRoleData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  const getInitData = () => {
    const { id, name, info, permissions } = data.selectData[0];
    return {
      id,
      name,
      info,
      permissions: permissions?.map((item) => item.id.toString()),
      permissionList: data.permissionList
    };
  };

  const handleEdit = () => {
    if (data.selectData.length !== 1) {
      message.warning(t('common.tip.selectOne'));
      return;
    }
    setIsOpen(true);
  };

  const handleOk = async () => {
    const role: API.RoleParams = form.getFieldsValue();
    setIsOpen(false);
    role.permissions = role.permissions?.map((item) => Number(item));
    const editResult = await editRole(role);
    if (!editResult.data) {
      message.error(t('pages.role.edit.tip.fail'));
      form.resetFields();
      return;
    }
    // 编辑角色成功后重新获取角色列表数据
    const queryResult = await getRoleList();
    if (!queryResult.data) {
      return;
    }
    setRoleData(queryResult.data);
    message.success(t('pages.role.edit.tip.success'));
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
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        bodyStyle={{
          padding: '30px',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        {data.selectData.length === 1 && (
          <Form
            name="editRole"
            form={form}
            // preserve属性避免modal关闭清空表单后重新打开还是上一次的值
            preserve={false}
            initialValues={getInitData()}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Form.Item label="id" name="id" hidden={true} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label={t('pages.role.name')} name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label={t('pages.role.info')} name="info" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label={t('pages.role.permission')} name="permissions">
              <TreeSelect
                allowClear
                treeData={getPermissionTreeData(menuData, getInitData().permissionList)}
                maxTagCount={3}
                treeCheckable={true}
                showCheckedStrategy="SHOW_CHILD"
                placeholder={t('pages.role.modal.permission.placeholder')}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Edit;
