import { getRoleSelectOptions } from '@/utils/general';
import { Form, Input, Modal, Select } from 'antd';
import { useTranslation } from 'react-i18next';

export type EditUserInfo = {
  id: number;
  username: string;
  phone: string;
  avatar: string;
  email: string;
  roles?: number[];
  roleList: API.RoleInfo[];
};

type Props = {
  className?: string;
  initData: EditUserInfo;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditUserModal: React.FC<Props> = ({ className, initData, open, setIsOpen }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleOk = () => {
    console.log(form.getFieldsValue());
    // 编辑用户
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
        title={t('pages.user.editModal.title')}
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
        <Form
          name="editUser"
          form={form}
          initialValues={initData}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item label="id" name="id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.user.username')} name="username">
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.user.role')} name="roles">
            <Select
              mode="multiple"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getRoleSelectOptions(initData.roleList)}
              placeholder={t('pages.user.modal.role.placeholder')}
            />
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

export default EditUserModal;
