import AuthWrapper from "@/components/auth-wrapper";
import { editDictionary } from "@/services/dictionary";
import { EditOutlined } from "@ant-design/icons";
import { App, Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Edit({
  data,
  queryData,
}: {
  data: API.DictionaryInfo[];
  queryData: (params?: API.DictionaryQuery) => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const handleEdit = () => {
    if (data.length !== 1) {
      message.warning(t("app.dictionaryPage.action.modal.edit.selectOne"));
      return;
    }
    form.setFieldsValue(data[0]);
    setOpen(true);
  };

  const handleOk = async () => {
    const dictionary: API.DictionaryParams = await form.validateFields();
    setLoading(true);
    const editResult = await editDictionary(dictionary);
    if (!editResult.data) {
      message.error(t("app.dictionaryPage.action.modal.edit.tip.fail"));
    } else {
      message.success(t("app.dictionaryPage.action.modal.edit.tip.success"));
      queryData();
    }
    setLoading(false);
    setOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="dictionary:edit">
        <Button icon={<EditOutlined />} onClick={handleEdit}>
          {t("app.dictionaryPage.action.edit")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.dictionaryPage.action.modal.edit.title")}
        open={open}
        confirmLoading={loading}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        styles={{
          body: {
            padding: "12px",
            marginTop: "12px",
            borderTop: "2px solid rgba(0, 0, 0, 0.06)",
          },
        }}
      >
        <Form
          name="editDictionary"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Form.Item label="id" name="id" hidden rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.dictionaryPage.action.modal.edit.item.dictType")}
            name="dictType"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.dictionaryPage.action.modal.edit.item.dictName")}
            name="dictName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.dictionaryPage.action.modal.edit.item.dictValue")}
            name="dictValue"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.dictionaryPage.action.modal.edit.item.dictLabel")}
            name="dictLabel"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.dictionaryPage.action.modal.edit.item.description")}
            name="description"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
