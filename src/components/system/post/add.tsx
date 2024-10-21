"use client";

import { addPost } from "@/services/post";
import { App, Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import AuthWrapper from "@/components/auth-wrapper";
import { PlusOutlined } from "@ant-design/icons";
import { getDictSelectOptions, getRoleSelectOptions } from "@/utils/options";
import { useTranslations } from "next-intl";

export default function Add({
  optionsData,
  queryData,
}: {
  optionsData?: API.PostOptions;
  queryData: (params?: API.PostQuery) => void;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const handleOk = async () => {
    const post: API.PostParams = await form.validateFields();
    post.postStatus = post.postStatus && post.postStatus[0];
    setLoading(true);
    const addResult = await addPost(post);
    if (addResult.code !== 0) {
      message.error(
        `${t("app.postPage.action.modal.add.tip.fail")} : ${addResult.code} | ${
          addResult.message
        }`
      );
    } else {
      message.success(t("app.postPage.action.modal.add.tip.success"));
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
    <AuthWrapper permission="post:add">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
      >
        {t("app.postPage.action.add")}
      </Button>
      <Modal
        title={t("app.postPage.action.modal.add.title")}
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
          name="addPost"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Form.Item
            label={t("app.postPage.action.modal.add.item.code")}
            name="code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.postPage.action.modal.add.item.name")}
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.postPage.action.modal.add.item.postStatus")}
            name="postStatus"
            initialValue={["0"]}
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.postStatus)}
              placeholder={t("app.postPage.action.modal.add.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.postPage.action.modal.add.item.role")}
            name="roles"
          >
            <Select
              mode="multiple"
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={getRoleSelectOptions(optionsData?.roles)}
              placeholder={t("app.postPage.action.modal.add.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.postPage.action.modal.add.item.remark")}
            name="remark"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </AuthWrapper>
  );
}
