import routeConfig from '@/router';
import { editRole, getRoleList } from '@/services/role';
import { getPermissionTreeData } from '@/utils/general';
import { Form, Input, Modal, TreeSelect, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TableRoleInfo } from '../..';
import AuthWrapper from '@/components/AuthWrapper';

type EditRoleInfo = {
  id: number;
  name: string;
  info: string;
  permissions?: string[];
  permissionList: API.PermissionInfo[];
};

type Props = {
  roleData: EditRoleInfo;
  setRoleData: React.Dispatch<React.SetStateAction<API.PageInfo<TableRoleInfo[]> | undefined>>;
};

const Edit: React.FC<Props> = ({ roleData, setRoleData }) => {
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

  const handleOk = async () => {
    setIsOpen(false);
    // 提交到后台处理需要把权限id值转为number类型
    const formData: API.RoleParams = form.getFieldsValue();
    const permissions = formData.permissions?.map((item) => Number(item));
    const role = {
      id: formData.id,
      name: formData.name,
      info: formData.info,
      permissions
    };
    // 编辑角色
    const editResult = await editRole(role);
    if (!editResult.data) {
      message.error(t('pages.role.edit.tip.fail'));
      form.resetFields();
      return;
    }
    // 编辑角色成功后重新获取角色列表数据
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
    message.success(t('pages.role.edit.tip.success'));
    form.resetFields();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="role:edit">
        <a type="link" onClick={() => setIsOpen(true)}>
          {t('pages.role.edit')}
        </a>
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
