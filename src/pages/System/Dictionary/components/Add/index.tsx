import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { addDictionary } from '@/services/dictionary';

type Props = {
  queryData: (params?: API.DictionaryQuery) => void;
};

const Add: React.FC<Props> = ({ queryData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    setLoading(true);
    const dictionary: API.DictionaryParams = form.getFieldsValue();
    const addResult = await addDictionary(dictionary);
    if (!addResult.data) {
      message.error(t('pages.dictionary.add.tip.fail'));
      form.resetFields();
      return;
    }
    setLoading(false);
    message.success(t('pages.dictionary.add.tip.success'));
    setIsOpen(false);
    form.resetFields();
    // 新增字典成功后重新获取字典列表数据
    queryData();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="dictionary:add">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsOpen(true)}>
          {t('pages.dictionary.add')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.dictionary.addModal.title')}
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
        <Form name="addDictionary" form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
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

export default Add;
