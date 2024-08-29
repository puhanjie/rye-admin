import { editUser } from "@/services/user";
import { App, Button, Form, Input, Modal, Select, TreeSelect } from "antd";
import { useState } from "react";
import AuthWrapper from "@/components/auth-wrapper";
import { EditOutlined } from "@ant-design/icons";
import {
  getDeptTree,
  getDictSelectOptions,
  getPostSelectOptions,
  getRoleSelectOptions,
} from "@/utils/options";
import { useTranslation } from "react-i18next";

export default function Edit({
  data,
  optionsData,
  queryData,
}: {
  data: API.UserInfo[];
  optionsData?: API.UserOptions;
  queryData: (params?: API.UserQuery) => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const getInitData = () => {
    const {
      id,
      department,
      username,
      name,
      sex,
      userStatus,
      phone,
      email,
      roles,
      posts,
    } = data[0];
    return {
      id,
      department: department.id.toString(),
      username,
      name,
      sex: sex.dictValue,
      userStatus: userStatus.dictValue,
      phone,
      email,
      roles: roles?.map((item) => item.id),
      posts: posts?.map((item) => item.id),
    };
  };

  const handleEdit = () => {
    if (data.length !== 1) {
      message.warning(t("app.userPage.action.modal.edit.selectOne"));
      return;
    }
    form.setFieldsValue(getInitData());
    setOpen(true);
  };

  const handleOk = async () => {
    const user: API.UserParams = await form.validateFields();
    user.department = Number(user.department);
    user.sex = user.sex && user.sex[0];
    user.userStatus = user.userStatus && user.userStatus[0];
    setLoading(true);
    const editResult = await editUser(user);
    if (!editResult.data) {
      message.error(t("app.userPage.action.modal.edit.tip.fail"));
    } else {
      message.success(t("app.userPage.action.modal.edit.tip.success"));
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
      <AuthWrapper permission="user:edit">
        <Button icon={<EditOutlined />} onClick={handleEdit}>
          {t("app.userPage.action.edit")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.userPage.action.modal.edit.title")}
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
          name="editUser"
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
            label={t("app.userPage.action.modal.edit.item.department")}
            name="department"
            rules={[{ required: true }]}
          >
            <TreeSelect
              treeData={getDeptTree(optionsData?.departments)}
              allowClear
              placeholder={t("app.userPage.action.modal.edit.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.edit.item.username")}
            name="username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.edit.item.name")}
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.edit.item.sex")}
            name="sex"
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.sex)}
              placeholder={t("app.userPage.action.modal.edit.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.edit.item.userStatus")}
            name="userStatus"
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.userStatus)}
              placeholder={t("app.userPage.action.modal.edit.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.edit.item.post")}
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
              placeholder={t("app.userPage.action.modal.edit.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.edit.item.role")}
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
              placeholder={t("app.userPage.action.modal.edit.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.edit.item.phone")}
            name="phone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.userPage.action.modal.edit.item.email")}
            name="email"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
