import { Form, Input, Modal, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TableDictionaryInfo } from '../..';
import AuthWrapper from '@/components/AuthWrapper';
import { editDictionary, getDictionaryList } from '@/services/dictionary';

type EditDictionaryInfo = {
  id?: number;
  dictName?: string;
  dictText?: string;
  itemValue?: string;
  itemText?: string;
  description?: string;
};

type Props = {
  dictionaryData: EditDictionaryInfo;
  setDictionaryData: React.Dispatch<
    React.SetStateAction<API.PageInfo<TableDictionaryInfo[]> | undefined>
  >;
};

const Edit: React.FC<Props> = ({ dictionaryData, setDictionaryData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    const dictionary: API.DictionaryParams = form.getFieldsValue();
    setIsOpen(false);
    form.resetFields();
    const editResult = await editDictionary(dictionary);
    if (!editResult.data) {
      message.error(t('pages.dictionary.edit.tip.fail'));
      return;
    }
    // 编辑字典成功后重新获取字典列表数据
    const queryResult = await getDictionaryList();
    if (queryResult.data) {
      const data: API.PageInfo<TableDictionaryInfo[]> = {
        records: queryResult.data.records.map((item) => {
          return { key: item.id, ...item };
        }),
        total: queryResult.data.total,
        size: queryResult.data.size,
        current: queryResult.data.current,
        pages: queryResult.data.pages
      };
      setDictionaryData(data);
    }
    message.success(t('pages.dictionary.edit.tip.success'));
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="dictionary:edit">
        <a type="link" onClick={() => setIsOpen(true)}>
          {t('pages.dictionary.edit')}
        </a>
      </AuthWrapper>
      <Modal
        title={t('pages.dictionary.editModal.title')}
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
        <Form
          name="editDictionary"
          form={form}
          initialValues={dictionaryData}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
        >
          <Form.Item label="id" name="id" hidden rules={[{ required: true }]}>
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
export default Edit;
