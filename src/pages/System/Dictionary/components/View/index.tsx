import { Button, Form, Input, Modal, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { EyeOutlined } from '@ant-design/icons';

type Props = {
  data: API.DictionaryInfo[];
};

const View: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const handleView = () => {
    if (data.length !== 1) {
      message.warning(t('common.tip.selectOne'));
      return;
    }
    setIsOpen(true);
  };

  const handleOk = async () => {
    setIsOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="dictionary:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t('pages.dictionary.view')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.dictionary.viewModal.title')}
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
        {data.length === 1 && (
          <Form
            name="viewDictionary"
            form={form}
            disabled
            // preserve属性避免modal关闭清空表单后重新打开还是上一次的值
            preserve={false}
            initialValues={data[0]}
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
        )}
      </Modal>
    </div>
  );
};
export default View;
