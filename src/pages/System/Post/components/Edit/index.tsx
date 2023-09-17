import { getRoleSelectOptions, getDictSelectOptions } from '@/utils/general';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { EditOutlined } from '@ant-design/icons';
import { editPost, getPostList } from '@/services/post';

type Props = {
  data: API.PostInfo[];
  optionsData?: API.PostOptions;
  setPostData: React.Dispatch<React.SetStateAction<API.Page<API.PostInfo[]> | undefined>>;
};

const Edit: React.FC<Props> = ({ data, optionsData, setPostData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
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
    const post: API.PostParams = form.getFieldsValue();
    setIsOpen(false);
    post.postStatus = post.postStatus && post.postStatus[0];
    const editResult = await editPost(post);
    if (!editResult.data) {
      message.error(t('pages.post.edit.tip.fail'));
      form.resetFields();
      return;
    }
    // 修改用户成功后重新获取用户列表数据
    const queryResult = await getPostList();
    if (!queryResult.data) {
      return;
    }
    setPostData(queryResult.data);
    message.success(t('pages.post.edit.tip.success'));
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
