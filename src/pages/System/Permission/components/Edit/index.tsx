import { Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type EditPermissionInfo = {
  id?: number;
  name?: string;
  info?: string;
  menu?: string;
  menuName?: string;
};

type Props = {
  permissionData: EditPermissionInfo;
};

const Edit: React.FC<Props> = ({ permissionData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    console.log(form.getFieldsValue());
    // 编辑权限
    setIsOpen(false);
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
