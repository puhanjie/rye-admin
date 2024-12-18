"use client";

import AuthWrapper from "@/components/auth-wrapper";
import { useAuthRoute } from "@/hooks/route";
import { addPermission } from "@/services/permission";
import { getDictSelectOptions, getMenuTree } from "@/utils/options";
import { PlusOutlined } from "@ant-design/icons";
import { App, Button, Form, Input, Modal, Select, TreeSelect } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Add({
  optionsData,
  queryData,
}: {
  optionsData?: API.PermissionOptions;
  queryData: (params?: API.PermissionQuery) => void;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const authRoute = useAuthRoute();

  const handleOk = async () => {
    const permission: API.PermissionParams = await form.validateFields();
    permission.permissionStatus =
      permission.permissionStatus && permission.permissionStatus[0];
    setLoading(true);
    const addResult = await addPermission(permission);
    if (addResult.code !== 0) {
      message.error(
        `${t("app.permissionPage.action.modal.add.tip.fail")} : ${
          addResult.code
        } | ${addResult.message}`
      );
    } else {
      message.success(t("app.permissionPage.action.modal.add.tip.success"));
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
    <AuthWrapper permission="permission:add">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
      >
        {t("app.permissionPage.action.add")}
      </Button>
      <Modal
        title={t("app.permissionPage.action.modal.add.title")}
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
          name="addPermission"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Form.Item
            label={t("app.permissionPage.action.modal.add.item.code")}
            name="code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.permissionPage.action.modal.add.item.name")}
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t(
              "app.permissionPage.action.modal.add.item.permissionStatus"
            )}
            name="permissionStatus"
            initialValue={["0"]}
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.permissionStatus)}
              placeholder={t("app.permissionPage.action.modal.add.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.permissionPage.action.modal.add.item.menu")}
            name="menu"
            rules={[{ required: true }]}
          >
            <TreeSelect
              treeData={getMenuTree(t, authRoute)}
              allowClear
              showCheckedStrategy="SHOW_CHILD"
              placeholder={t("app.permissionPage.action.modal.add.placeholder")}
            />
          </Form.Item>
        </Form>
      </Modal>
    </AuthWrapper>
  );
}
