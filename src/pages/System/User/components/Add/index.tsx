import { addUser, getUserList } from '@/services/user';
import { getRoleSelectOptions, getUserStatusSelectOptions } from '@/utils/general';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TableUserInfo } from '../..';
import AuthWrapper from '@/components/AuthWrapper';
import MD5 from 'crypto-js/md5';

type Props = {
  roleData: API.RoleInfo[];
  userStatus: API.DictionaryInfo[];
  setUserData: React.Dispatch<React.SetStateAction<API.PageInfo<TableUserInfo[]> | undefined>>;
};

const Add: React.FC<Props> = ({ roleData, userStatus, setUserData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    const user: API.UserParams = form.getFieldsValue();
    setIsOpen(false);
    form.resetFields();
    user.userStatus = user.userStatus && user.userStatus[0];
    user.password = user.password && MD5(user.password).toString();
    user.roles = user.roles?.map((item) => Number(item));
    const addResult = await addUser(user);
    if (!addResult.data) {
      message.error(t('pages.user.add.tip.fail'));
      return;
    }
    // 新增用户成功后重新获取用户列表数据
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
    message.success(t('pages.user.add.tip.success'));
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="user:add">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsOpen(true)}>
          {t('pages.user.add')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.user.addModal.title')}
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
        <Form name="addUser" form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Form.Item label={t('pages.user.username')} name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.user.nickname')} name="nickname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.user.userStatus')}
            name="userStatus"
            initialValue={['0']}
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getUserStatusSelectOptions(userStatus)}
              placeholder={t('pages.user.modal.role.placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('pages.user.role')} name="roles">
            <Select
              mode="multiple"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getRoleSelectOptions(roleData)}
              placeholder={t('pages.user.modal.role.placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('pages.user.password')} name="password" rules={[{ required: true }]}>
            <Input.Password />
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

export default Add;
