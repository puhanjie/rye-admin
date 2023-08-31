import { Button, Form, Input, Modal, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { editDictionary, getDictionaryList } from '@/services/dictionary';
import { EditOutlined } from '@ant-design/icons';

type Props = {
  data: API.DictionaryInfo[];
  setDictionaryData: React.Dispatch<
    React.SetStateAction<API.PageInfo<API.DictionaryInfo[]> | undefined>
  >;
};

const Edit: React.FC<Props> = ({ data, setDictionaryData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    if (data.length !== 1) {
      message.warning(t('common.tip.selectOne'));
      return;
    }
    setIsOpen(true);
  };

  const handleOk = async () => {
    const dictionary: API.DictionaryParams = form.getFieldsValue();
    setIsOpen(false);
    const editResult = await editDictionary(dictionary);
    if (!editResult.data) {
      message.error(t('pages.dictionary.edit.tip.fail'));
      form.resetFields();
      return;
    }
    // 编辑字典成功后重新获取字典列表数据
    const queryResult = await getDictionaryList();
    if (!queryResult.data) {
      return;
    }
    setDictionaryData(queryResult.data);
    message.success(t('pages.dictionary.edit.tip.success'));
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
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        bodyStyle={{
          padding: '12px',
          marginTop: '12px',
          borderTop: '2px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        {data.length === 1 && (
          <Form
            name="editDictionary"
            form={form}
            // preserve属性避免modal关闭清空表单后重新打开还是上一次的值
            preserve={false}
            initialValues={data[0]}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
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
        )}
      </Modal>
    </div>
  );
};
export default Edit;
