import { getRoleSelectOptions, getDictSelectOptions } from '@/utils/general';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { addPost } from '@/services/post';

type Props = {
  optionsData?: API.PostOptions;
  queryData: (params?: API.PostQuery) => void;
};

const Add: React.FC<Props> = ({ optionsData, queryData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    setLoading(true);
    const post: API.PostParams = form.getFieldsValue();
    post.postStatus = post.postStatus && post.postStatus[0];
    const addResult = await addPost(post);
    if (!addResult.data) {
      message.error(t('pages.post.add.tip.fail'));
      form.resetFields();
      return;
    }
    setLoading(false);
    message.success(t('pages.post.add.tip.success'));
    setIsOpen(false);
    form.resetFields();
    // 新增岗位成功后重新获取岗位列表数据
    queryData();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="post:add">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsOpen(true)}>
          {t('pages.post.add')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.post.addModal.title')}
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
        <Form name="addPost" form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Form.Item label={t('pages.post.code')} name="code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.post.name')} name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.post.postStatus')}
            name="postStatus"
            initialValue={['0']}
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

export default Add;
