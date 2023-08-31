import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { addDictionary, getDictionaryList } from '@/services/dictionary';

type Props = {
  setDictionaryData: React.Dispatch<
    React.SetStateAction<API.PageInfo<API.DictionaryInfo[]> | undefined>
  >;
};

const Add: React.FC<Props> = ({ setDictionaryData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    const dictionary: API.DictionaryParams = form.getFieldsValue();
    setIsOpen(false);
    form.resetFields();
    const addResult = await addDictionary(dictionary);
    if (!addResult.data) {
      message.error(t('pages.dictionary.add.tip.fail'));
      return;
    }
    // 新增字典成功后重新获取字典列表数据
    const queryResult = await getDictionaryList();
    if (!queryResult.data) {
      return;
    }
    setDictionaryData(queryResult.data);
    message.success(t('pages.dictionary.add.tip.success'));
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
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        bodyStyle={{
          padding: '12px',
          marginTop: '12px',
          borderTop: '2px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Form name="addDictionary" form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Form.Item
            label={t('pages.dictionary.dictName')}
            name="dictName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.dictionary.dictText')}
            name="dictText"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.dictionary.itemValue')}
            name="itemValue"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.dictionary.itemText')}
            name="itemText"
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
