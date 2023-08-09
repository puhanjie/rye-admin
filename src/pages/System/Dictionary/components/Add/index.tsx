import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TableDictionaryInfo } from '../..';
import AuthWrapper from '@/components/AuthWrapper';
import { addDictionary, getDictionaryList } from '@/services/dictionary';

type Props = {
  setDictionaryData: React.Dispatch<
    React.SetStateAction<API.PageInfo<TableDictionaryInfo[]> | undefined>
  >;
};

const Add: React.FC<Props> = ({ setDictionaryData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    setIsOpen(false);
    // 新增字典
    const dictionary: API.DictionaryParams = form.getFieldsValue();
    const addResult = await addDictionary(dictionary);
    if (!addResult.data) {
      message.error(t('pages.dictionary.add.tip.fail'));
      form.resetFields();
      return;
    }
    // 新增字典成功后重新获取字典列表数据
    const queryResult = await getDictionaryList();
    if (queryResult.data) {
      const data: API.PageInfo<TableDictionaryInfo[]> = {
        records: queryResult.data.records.map((item) => ({ key: item.id, ...item })),
        total: queryResult.data.total,
        size: queryResult.data.size,
        current: queryResult.data.current,
        pages: queryResult.data.pages
      };
      setDictionaryData(data);
    }
    message.success(t('pages.dictionary.add.tip.success'));
    form.resetFields();
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
          padding: '30px',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Form name="addDictionary" form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 17 }}>
          <Form.Item label={t('pages.dictionary.dictName')} name="dictName">
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.dictionary.dictText')} name="dictText">
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.dictionary.itemValue')} name="itemValue">
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.dictionary.itemText')} name="itemText">
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
