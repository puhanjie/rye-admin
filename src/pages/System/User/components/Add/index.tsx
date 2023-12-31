import { addUser } from '@/services/user';
import {
  getRoleSelectOptions,
  getDictSelectOptions,
  getDeptTree,
  getPostSelectOptions
} from '@/utils/general';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, TreeSelect, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import MD5 from 'crypto-js/md5';

type Props = {
  optionsData?: API.UserOptions;
  queryData: (params?: API.UserQuery) => void;
};

const Add: React.FC<Props> = ({ optionsData, queryData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    setLoading(true);
    const user: API.UserParams = form.getFieldsValue();
    user.department = Number(user.department);
    user.sex = user.sex && user.sex[0];
    user.userStatus = user.userStatus && user.userStatus[0];
    user.password = user.password && MD5(user.password).toString();
    const addResult = await addUser(user);
    if (!addResult.data) {
      message.error(t('pages.user.add.tip.fail'));
      form.resetFields();
      return;
    }
    setLoading(false);
    message.success(t('pages.user.add.tip.success'));
    setIsOpen(false);
    form.resetFields();
    // 新增用户成功后重新获取用户列表数据
    queryData();
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
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{
          padding: '12px',
          marginTop: '12px',
          borderTop: '2px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Form name="addUser" form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Form.Item
            label={t('pages.user.department')}
            name="department"
            rules={[{ required: true }]}
          >
            <TreeSelect
              treeData={getDeptTree(optionsData?.departments)}
              allowClear
              placeholder={t('pages.user.select.placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('pages.user.username')} name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.user.name')} name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.user.sex')}
            name="sex"
            initialValue={['1']}
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.sex)}
              placeholder={t('pages.user.select.placeholder')}
            />
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
              options={getDictSelectOptions(optionsData?.userStatus)}
              placeholder={t('pages.user.select.placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('pages.user.post')} name="posts">
            <Select
              mode="multiple"
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getPostSelectOptions(optionsData?.posts)}
              placeholder={t('pages.user.select.placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('pages.user.role')} name="roles">
            <Select
              mode="multiple"
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getRoleSelectOptions(optionsData?.roles)}
              placeholder={t('pages.user.select.placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('pages.user.password')} name="password" rules={[{ required: true }]}>
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

export default Add;
