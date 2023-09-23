import {
  getRoleSelectOptions,
  getDictSelectOptions,
  getDeptTree,
  getPostSelectOptions
} from '@/utils/general';
import { Button, Form, Input, Modal, Select, TreeSelect, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { editUser, getUserList } from '@/services/user';
import AuthWrapper from '@/components/AuthWrapper';
import { EditOutlined } from '@ant-design/icons';

type Props = {
  data: API.UserInfo[];
  optionsData?: API.UserOptions;
  setUserData: React.Dispatch<React.SetStateAction<API.Page<API.UserInfo[]> | undefined>>;
};

const Edit: React.FC<Props> = ({ data, optionsData, setUserData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const getInitData = () => {
    const { id, department, username, name, sex, userStatus, phone, email, roles, posts } = data[0];
    return {
      id,
      department: department.id.toString(),
      username,
      name,
      sex: sex.dictValue,
      userStatus: userStatus.dictValue,
      phone,
      email,
      roles: roles?.map((item) => item.id),
      posts: posts?.map((item) => item.id)
    };
  };

  const handleEdit = () => {
    if (data.length !== 1) {
      message.warning(t('common.tip.selectOne'));
      return;
    }
    form.setFieldsValue(getInitData());
    setIsOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);
    const user: API.UserParams = form.getFieldsValue();
    user.department = Number(user.department);
    user.sex = user.sex && user.sex[0];
    user.userStatus = user.userStatus && user.userStatus[0];
    const editResult = await editUser(user);
    if (!editResult.data) {
      message.error(t('pages.user.edit.tip.fail'));
      form.resetFields();
      return;
    }
    setLoading(false);
    message.success(t('pages.user.edit.tip.success'));
    setIsOpen(false);
    form.resetFields();
    // 修改用户成功后重新获取用户列表数据
    const queryResult = await getUserList();
    if (!queryResult.data) {
      return;
    }
    setUserData(queryResult.data);
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
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{
          padding: '12px',
          marginTop: '12px',
          borderTop: '2px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Form name="editUser" form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Form.Item label="id" name="id" hidden={true} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
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
          <Form.Item label={t('pages.user.sex')} name="sex" rules={[{ required: true }]}>
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
