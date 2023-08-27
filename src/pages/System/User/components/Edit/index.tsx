import { getRoleSelectOptions, getUserStatusSelectOptions } from '@/utils/general';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { editUser, getUserList } from '@/services/user';
import AuthWrapper from '@/components/AuthWrapper';
import type { UserDetail } from '../..';
import { EditOutlined } from '@ant-design/icons';

type Props = {
  data: UserDetail;
  setUserData: React.Dispatch<React.SetStateAction<API.PageInfo<API.UserInfo[]> | undefined>>;
};

const Edit: React.FC<Props> = ({ data, setUserData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const getInitData = () => {
    const { id, username, nickname, userStatus, phone, avatar, email, roles } = data.selectData[0];
    return {
      id,
      username,
      nickname,
      userStatus: userStatus.itemValue,
      phone,
      avatar,
      email,
      roles: roles?.map((item) => item.id),
      roleList: data.roleList,
      userStatusList: data.userStatusList
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
        <Button icon={<EditOutlined />} onClick={handleEdit}>
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
        {data.selectData.length === 1 && (
          <Form
            name="editUser"
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
            <Form.Item
              label={t('pages.user.username')}
              name="username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('pages.user.nickname')}
              name="nickname"
              rules={[{ required: true }]}
            >
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
                options={getUserStatusSelectOptions(getInitData().userStatusList)}
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
                options={getRoleSelectOptions(getInitData().roleList)}
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
        )}
      </Modal>
    </div>
  );
};

export default Edit;
