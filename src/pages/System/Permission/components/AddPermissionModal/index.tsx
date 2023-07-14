import { Form, Input, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPermissionModal: React.FC<Props> = ({ className, open, setIsOpen }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleOk = () => {
    console.log(form.getFieldsValue());
    // 新增权限
    setIsOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };
  return (
    <div className={className}>
      <Modal
        title={t('pages.permission.addModal.title')}
        open={open}
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

export default AddPermissionModal;
