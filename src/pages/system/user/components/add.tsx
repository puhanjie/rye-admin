import { addUser } from "@/services/user";
import { Button, Form, Input, message, Modal, Select, TreeSelect } from "antd";
import { useState } from "react";
import MD5 from "crypto-js/md5";
import AuthWrapper from "@/components/auth-wrapper";
import { PlusOutlined } from "@ant-design/icons";
import {
  getDeptTree,
  getDictSelectOptions,
  getPostSelectOptions,
  getRoleSelectOptions,
} from "@/utils/options";
import { useTranslation } from "react-i18next";

export default function Add({
  optionsData,
  queryData,
}: {
  optionsData?: API.UserOptions;
  queryData: (params?: API.UserQuery) => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = async () => {
    const user: API.UserParams = await form.validateFields();
    user.department = Number(user.department);
    user.sex = user.sex && user.sex[0];
    user.userStatus = user.userStatus && user.userStatus[0];
    user.password = user.password && MD5(user.password).toString();
    setLoading(true);
    const addResult = await addUser(user);
    if (!addResult.data) {
      messageApi.error(t("app.userPage.action.modal.add.tip.fail"));
    } else {
      messageApi.success(t("app.userPage.action.modal.add.tip.success"));
      queryData();
    }
    setLoading(false);
    setOpen(false);
    form.resetFields();
  };

  const handleCancel = async () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <div>
      {contextHolder}
      <AuthWrapper permission="user:add">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          {t("app.userPage.action.add")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.userPage.action.modal.add.title")}
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
          name="addUser"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Form.Item
            label={t("app.userPage.action.modal.add.item.department")}
            name="department"
            rules={[{ required: true }]}
          >
            <TreeSelect
              treeData={getDeptTree(optionsData?.departments)}
              allowClear
              placeholder={t("app.userPage.action.modal.add.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.add.item.username")}
            name="username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.add.item.name")}
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.add.item.sex")}
            name="sex"
            initialValue={["1"]}
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.sex)}
              placeholder={t("app.userPage.action.modal.add.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.add.item.userStatus")}
            name="userStatus"
            initialValue={["0"]}
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.userStatus)}
              placeholder={t("app.userPage.action.modal.add.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.add.item.post")}
            name="posts"
          >
            <Select
              mode="multiple"
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={getPostSelectOptions(optionsData?.posts)}
              placeholder={t("app.userPage.action.modal.add.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.add.item.role")}
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
              placeholder={t("app.userPage.action.modal.add.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.add.item.password")}
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.add.item.phone")}
            name="phone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.add.item.email")}
            name="email"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
