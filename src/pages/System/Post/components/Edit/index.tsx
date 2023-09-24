import { getRoleSelectOptions, getDictSelectOptions } from '@/utils/general';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { EditOutlined } from '@ant-design/icons';
import { editPost } from '@/services/post';

type Props = {
  data: API.PostInfo[];
  optionsData?: API.PostOptions;
  queryData: (params?: API.PostQuery) => void;
};

const Edit: React.FC<Props> = ({ data, optionsData, queryData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const getInitData = () => {
    const { id, code, name, postStatus, remark, roles } = data[0];
    return {
      id,
      code,
      name,
      postStatus: postStatus.dictValue,
      remark,
      roles: roles?.map((item) => item.id)
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
    const post: API.PostParams = form.getFieldsValue();
    post.postStatus = post.postStatus && post.postStatus[0];
    const editResult = await editPost(post);
    if (!editResult.data) {
      message.error(t('pages.post.edit.tip.fail'));
      form.resetFields();
      return;
    }
    setLoading(false);
    message.success(t('pages.post.edit.tip.success'));
    setIsOpen(false);
    form.resetFields();
    // 修改用户成功后重新获取用户列表数据
    queryData();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="post:edit">
        <Button icon={<EditOutlined />} onClick={handleEdit}>
          {t('pages.post.edit')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.post.editModal.title')}
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
        <Form name="editPost" form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Form.Item label="id" name="id" hidden={true} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.post.code')} name="code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.post.name')} name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.post.postStatus')}
            name="postStatus"
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.postStatus)}
              placeholder={t('pages.post.select.placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('pages.post.role')} name="roles">
            <Select
              mode="multiple"
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getRoleSelectOptions(optionsData?.roles)}
              placeholder={t('pages.post.select.placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('pages.post.remark')} name="remark">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Edit;
