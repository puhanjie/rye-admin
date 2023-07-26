import { Form, Input, Modal, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TablePermissionInfo } from '../..';
import { editPermission, getPermissions } from '@/services/permission';

type EditPermissionInfo = {
  id?: number;
  name?: string;
  info?: string;
  menu?: string;
  menuName?: string;
};

type Props = {
  permissionData: EditPermissionInfo;
  setPermissionData: React.Dispatch<
    React.SetStateAction<API.PageInfo<TablePermissionInfo[]> | undefined>
  >;
};

const Edit: React.FC<Props> = ({ permissionData, setPermissionData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    setIsOpen(false);
    // 编辑权限
    const permission: API.PermissionParams = form.getFieldsValue();
    const editResult = await editPermission(permission);
    if (!editResult.data) {
      message.error(t('pages.permission.edit.tip.fail'));
      form.resetFields();
      return;
    }
    // 编辑权限成功后重新获取权限列表数据
    const queryResult = await getPermissions();
    if (queryResult.data) {
      const data: API.PageInfo<TablePermissionInfo[]> = {
        records: queryResult.data.records.map((item) => {
          return { key: item.id, ...item };
        }),
        total: queryResult.data.total,
        size: queryResult.data.size,
        current: queryResult.data.current,
        pages: queryResult.data.pages
      };
      setPermissionData(data);
    }
    message.success(t('pages.permission.edit.tip.success'));
    form.resetFields();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <a type="link" onClick={() => setIsOpen(true)}>
        {t('pages.permission.edit')}
      </a>
      <Modal
        title={t('pages.permission.editModal.title')}
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
          name="editPermission"
          form={form}
          initialValues={permissionData}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
        >
          <Form.Item label="id" name="id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.permission.name')} name="name">
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.permission.info')} name="info">
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.permission.menu')} name="menu">
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.permission.menuName')} name="menuName">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Edit;
