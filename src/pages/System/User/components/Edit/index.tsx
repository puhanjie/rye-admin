import { getRoleSelectOptions, getUserStatusSelectOptions } from '@/utils/general';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { editUser, getUserList } from '@/services/user';
import AuthWrapper from '@/components/AuthWrapper';

type EditUserInfo = {
  id: number;
  username: string;
  nickname: string;
  userStatus: string;
  phone: string;
  avatar: string;
  email: string;
  roles?: number[];
  roleList: API.RoleInfo[];
  userStatusList: API.DictionaryInfo[];
};

type Props = {
  userData: EditUserInfo;
  setUserData: React.Dispatch<React.SetStateAction<API.PageInfo<API.UserInfo[]> | undefined>>;
};

const Edit: React.FC<Props> = ({ userData, setUserData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    const user: API.UserParams = form.getFieldsValue();
    setIsOpen(false);
    user.userStatus = user.userStatus && user.userStatus[0];
    user.roles = user.roles?.map((item) => Number(item));
    const editResult = await editUser(user);
    if (!editResult.data) {
      message.error(t('pages.user.edit.tip.fail'));
      form.resetFields();
      return;
    }
    // 修改用户成功后重新获取用户列表数据
    const queryResult = await getUserList();
    if (!queryResult.data) {
      return;
    }
    setUserData(queryResult.data);
    message.success(t('pages.user.edit.tip.success'));
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="user:edit">
        <Button
          type="link"
          size="small"
          onClick={() => setIsOpen(true)}
          style={{ padding: 0, border: 0, height: 22 }}
        >
          {t('pages.user.edit')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.user.editModal.title')}
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
          name="editUser"
          form={form}
          initialValues={userData}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item label="id" name="id" hidden={true} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.user.username')} name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.user.nickname')} name="nickname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.user.userStatus')}
            name="userStatus"
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getUserStatusSelectOptions(userData.userStatusList)}
              placeholder={t('pages.user.modal.role.placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('pages.user.role')} name="roles">
            <Select
              mode="multiple"
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getRoleSelectOptions(userData.roleList)}
              placeholder={t('pages.user.modal.role.placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('pages.user.phone')} name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.user.email')} name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Edit;
