"use client";

import AuthWrapper from "@/components/auth-wrapper";
import route from "@/config/route";
import { editPermission } from "@/services/permission";
import { getDictSelectOptions, getMenuTree } from "@/utils/options";
import { EditOutlined } from "@ant-design/icons";
import { App, Button, Form, Input, Modal, Select, TreeSelect } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Edit({
  data,
  optionsData,
  queryData,
}: {
  data: API.PermissionInfo[];
  optionsData?: API.PermissionOptions;
  queryData: (params?: API.PermissionQuery) => void;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const getInitData = () => {
    const { id, code, name, permissionStatus, menu } = data[0];
    return {
      id,
      code,
      name,
      permissionStatus: permissionStatus.dictValue,
      menu,
    };
  };

  const handleEdit = () => {
    if (data.length !== 1) {
      message.warning(t("app.permissionPage.action.modal.edit.selectOne"));
      return;
    }
    form.setFieldsValue(getInitData());
    setOpen(true);
  };

  const handleOk = async () => {
    const permission: API.PermissionParams = await form.validateFields();
    permission.permissionStatus =
      permission.permissionStatus && permission.permissionStatus[0];
    setLoading(true);
    const editResult = await editPermission(permission);
    if (editResult.code !== 0) {
      message.error(
        `${t("app.permissionPage.action.modal.edit.tip.fail")} : ${
          editResult.code
        } | ${editResult.message}`
      );
    } else {
      message.success(t("app.permissionPage.action.modal.edit.tip.success"));
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
      <AuthWrapper permission="permission:edit">
        <Button icon={<EditOutlined />} onClick={handleEdit}>
          {t("app.permissionPage.action.edit")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.permissionPage.action.modal.edit.title")}
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
          name="editPermission"
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
            label={t("app.permissionPage.action.modal.edit.item.code")}
            name="code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.permissionPage.action.modal.edit.item.name")}
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t(
              "app.permissionPage.action.modal.edit.item.permissionStatus"
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
              placeholder={t(
                "app.permissionPage.action.modal.edit.placeholder"
              )}
            />
          </Form.Item>
          <Form.Item
            label={t("app.permissionPage.action.modal.edit.item.menu")}
            name="menu"
            rules={[{ required: true }]}
          >
            <TreeSelect
              treeData={getMenuTree(t, route)}
              allowClear
              treeDefaultExpandedKeys={
                data && data.length === 1 ? [data[0].menu] : []
              }
              showCheckedStrategy="SHOW_CHILD"
              placeholder={t(
                "app.permissionPage.action.modal.edit.placeholder"
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
