"use client";

import AuthWrapper from "@/components/auth-wrapper";
import { addDictionary } from "@/services/dictionary";
import { PlusOutlined } from "@ant-design/icons";
import { App, Button, Form, Input, Modal } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Add({
  queryData,
}: {
  queryData: (params?: API.DictionaryQuery) => void;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const handleOk = async () => {
    const dictionary: API.DictionaryParams = await form.validateFields();
    setLoading(true);
    const addResult = await addDictionary(dictionary);
    if (addResult.code !== 0) {
      message.error(
        `${t("app.dictionaryPage.action.modal.add.tip.fail")} : ${
          addResult.code
        } | ${addResult.message}`
      );
    } else {
      message.success(t("app.dictionaryPage.action.modal.add.tip.success"));
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
    <AuthWrapper permission="dictionary:add">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
      >
        {t("app.dictionaryPage.action.add")}
      </Button>
      <Modal
        title={t("app.dictionaryPage.action.modal.add.title")}
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
          name="addDictionary"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Form.Item
            label={t("app.dictionaryPage.action.modal.add.item.dictType")}
            name="dictType"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.dictionaryPage.action.modal.add.item.dictName")}
            name="dictName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.dictionaryPage.action.modal.add.item.dictValue")}
            name="dictValue"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.dictionaryPage.action.modal.add.item.dictLabel")}
            name="dictLabel"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.dictionaryPage.action.modal.add.item.description")}
            name="description"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </AuthWrapper>
  );
}
