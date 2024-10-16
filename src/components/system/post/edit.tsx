"use client";

import { editPost } from "@/services/post";
import { App, Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import AuthWrapper from "@/components/auth-wrapper";
import { EditOutlined } from "@ant-design/icons";
import { getDictSelectOptions, getRoleSelectOptions } from "@/utils/options";
import { useTranslations } from "next-intl";

export default function Edit({
  data,
  optionsData,
  queryData,
}: {
  data: API.PostInfo[];
  optionsData?: API.PostOptions;
  queryData: (params?: API.PostQuery) => void;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const getInitData = () => {
    const { id, code, name, postStatus, remark, roles } = data[0];
    return {
      id,
      code,
      name,
      postStatus: postStatus.dictValue,
      remark,
      roles: roles?.map((item) => item.id),
    };
  };

  const handleEdit = () => {
    if (data.length !== 1) {
      message.warning(t("app.postPage.action.modal.edit.selectOne"));
      return;
    }
    form.setFieldsValue(getInitData());
    setOpen(true);
  };

  const handleOk = async () => {
    const post: API.PostParams = await form.validateFields();
    post.postStatus = post.postStatus && post.postStatus[0];
    setLoading(true);
    const editResult = await editPost(post);
    if (editResult.code !== 0) {
      message.error(
        `${t("app.postPage.action.modal.edit.tip.fail")} : ${
          editResult.code
        } | ${editResult.message}`
      );
    } else {
      message.success(t("app.postPage.action.modal.edit.tip.success"));
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
      <AuthWrapper permission="post:edit">
        <Button icon={<EditOutlined />} onClick={handleEdit}>
          {t("app.postPage.action.edit")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.postPage.action.modal.edit.title")}
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
          name="editPost"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Form.Item
            label="id"
            name="id"
            hidden={true}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.postPage.action.modal.edit.item.code")}
            name="code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.postPage.action.modal.edit.item.name")}
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.postPage.action.modal.edit.item.postStatus")}
            name="postStatus"
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.postStatus)}
              placeholder={t("app.postPage.action.modal.edit.selectOne")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.postPage.action.modal.edit.item.role")}
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
              placeholder={t("app.postPage.action.modal.edit.selectOne")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.postPage.action.modal.edit.item.remark")}
            name="remark"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
