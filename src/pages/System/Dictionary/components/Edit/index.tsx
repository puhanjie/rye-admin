import { Button, Form, Input, Modal, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { editDictionary } from '@/services/dictionary';
import { EditOutlined } from '@ant-design/icons';

type Props = {
  data: API.DictionaryInfo[];
  queryData: (params?: API.DictionaryQuery) => void;
};

const Edit: React.FC<Props> = ({ data, queryData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    if (data.length !== 1) {
      message.warning(t('common.tip.selectOne'));
      return;
    }
    form.setFieldsValue(data[0]);
    setIsOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);
    const dictionary: API.DictionaryParams = form.getFieldsValue();
    const editResult = await editDictionary(dictionary);
    if (!editResult.data) {
      message.error(t('pages.dictionary.edit.tip.fail'));
      form.resetFields();
      return;
    }
    setLoading(false);
    message.success(t('pages.dictionary.edit.tip.success'));
    setIsOpen(false);
    form.resetFields();
    // 编辑字典成功后重新获取字典列表数据
    queryData();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="dictionary:edit">
        <Button icon={<EditOutlined />} onClick={handleEdit}>
          {t('pages.dictionary.edit')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.dictionary.editModal.title')}
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
        <Form name="editDictionary" form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Form.Item label="id" name="id" hidden rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.dictionary.dictType')}
            name="dictType"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.dictionary.dictName')}
            name="dictName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.dictionary.dictValue')}
            name="dictValue"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.dictionary.dictLabel')}
            name="dictLabel"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.dictionary.description')} name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Edit;
