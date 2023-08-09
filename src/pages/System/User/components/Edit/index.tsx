import { getRoleSelectOptions, getUserStatusSelectOptions } from '@/utils/general';
import { Form, Input, Modal, Select, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TableUserInfo } from '../..';
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
  setUserData: React.Dispatch<React.SetStateAction<API.PageInfo<TableUserInfo[]> | undefined>>;
};

const Edit: React.FC<Props> = ({ userData, setUserData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    setIsOpen(false);
    // 提交到后台处理需要把权限id值转为number类型
    const formData: API.UserParams = form.getFieldsValue();
    const roles = formData.roles?.map((item) => Number(item));
    const user: API.UserParams = {
      id: formData.id,
      username: formData.username,
      password: formData.password,
      phone: formData.phone,
      avatar: formData.avatar,
      email: formData.email,
      roles
    };
    // 编辑用户
    const editResult = await editUser(user);
    if (!editResult.data) {
      message.error(t('pages.user.edit.tip.fail'));
      form.resetFields();
      return;
    }
    // 修改用户成功后重新获取用户列表数据
    const queryResult = await getUserList();
    if (queryResult.data) {
      const data: API.PageInfo<TableUserInfo[]> = {
        records: queryResult.data.records.map((item) => ({ key: item.id, ...item })),
        total: queryResult.data.total,
        size: queryResult.data.size,
        current: queryResult.data.current,
        pages: queryResult.data.pages
      };
      setUserData(data);
    }
    message.success(t('pages.user.edit.tip.success'));
    form.resetFields();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="user:edit">
        <a type="link" onClick={() => setIsOpen(true)}>
          {t('pages.user.edit')}
        </a>
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
          <Form.Item label="id" name="id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.user.username')} name="username">
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.user.nickname')} name="nickname">
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.user.userStatus')} name="userStatus">
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
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getRoleSelectOptions(userData.roleList)}
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

export default Edit;
