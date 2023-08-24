import { getRoleSelectOptions, getUserStatusSelectOptions } from '@/utils/general';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import type { UserDetail } from '../..';
import { EyeOutlined } from '@ant-design/icons';

type Props = {
  data: UserDetail;
};

const View: React.FC<Props> = ({ data }) => {
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

  const handleView = () => {
    if (data.selectData.length !== 1) {
      message.warning(t('common.tip.selectOne'));
      return;
    }
    setIsOpen(true);
  };

  const handleOk = async () => {
    setIsOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="user:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t('pages.user.view')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.user.viewModal.title')}
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
            name="viewUser"
            form={form}
            disabled
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
            <Form.Item label={t('pages.user.phone')} name="phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label={t('pages.user.email')} name="email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default View;
