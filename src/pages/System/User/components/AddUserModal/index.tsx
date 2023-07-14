import { getRoleSelectOptions } from '@/utils/general';
import { Form, Input, Modal, Select } from 'antd';
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  roleList: API.RoleInfo[];
};

const AddUserModal: React.FC<Props> = ({ className, open, setIsOpen, roleList }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleOk = () => {
    console.log(form.getFieldsValue());
    // 新增用户
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
        title={t('pages.user.addModal.title')}
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
        <Form name="addUser" form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Form.Item label={t('pages.user.username')} name="username">
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.user.role')} name="roles">
            <Select
              mode="multiple"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getRoleSelectOptions(roleList)}
              placeholder={t('pages.user.modal.role.placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('pages.user.password')} name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label={t('pages.user.phone')} name="phone">
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.user.email')} name="email">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUserModal;
