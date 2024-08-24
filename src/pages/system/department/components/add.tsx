import { addDepartment } from "@/services/department";
import { Button, Form, Input, message, Modal, Select, TreeSelect } from "antd";
import { useState } from "react";
import AuthWrapper from "@/components/auth-wrapper";
import { PlusOutlined } from "@ant-design/icons";
import {
  getDeptTree,
  getDictSelectOptions,
  getRoleSelectOptions,
  getUserSelectOptions,
} from "@/utils/options";
import { useTranslation } from "react-i18next";

export default function Add({
  optionsData,
  queryData,
}: {
  optionsData?: API.DepartmentOptions;
  queryData: (params?: API.DepartmentQuery) => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = async () => {
    const department: API.DepartmentParams = await form.validateFields();
    department.parentId = Number(department.parentId);
    department.deptStatus = department.deptStatus && department.deptStatus[0];
    setLoading(true);
    const addResult = await addDepartment(department);
    if (!addResult.data) {
      messageApi.error(t("app.departmentPage.action.modal.add.tip.fail"));
      form.resetFields();
      return;
    } else {
      messageApi.success(t("app.departmentPage.action.modal.add.tip.success"));
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
      {contextHolder}
      <AuthWrapper permission="department:add">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          {t("app.departmentPage.action.add")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.departmentPage.action.modal.add.title")}
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
          name="addDepartment"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Form.Item
            label={t("app.departmentPage.action.modal.add.item.parentDept")}
            name="parentId"
            rules={[{ required: true }]}
          >
            <TreeSelect
              treeData={getDeptTree(optionsData?.departments)}
              allowClear
              placeholder={t("app.departmentPage.action.modal.add.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.departmentPage.action.modal.add.item.code")}
            name="code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.departmentPage.action.modal.add.item.name")}
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.departmentPage.action.modal.add.item.leader")}
            name="leader"
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={getUserSelectOptions(optionsData?.users)}
              placeholder={t("app.departmentPage.action.modal.add.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.departmentPage.action.modal.add.item.deptStatus")}
            name="deptStatus"
            initialValue={["0"]}
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.deptStatus)}
              placeholder={t("app.departmentPage.action.modal.add.placeholder")}
            />
          </Form.Item>
          <Form.Item
            label={t("app.departmentPage.action.modal.add.item.role")}
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
              placeholder={t("app.departmentPage.action.modal.add.placeholder")}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
