import { editDepartment } from "@/services/department";
import { App, Button, Form, Input, Modal, Select, TreeSelect } from "antd";
import { useState } from "react";
import AuthWrapper from "@/components/auth-wrapper";
import { EditOutlined } from "@ant-design/icons";
import {
  getDeptTree,
  getDictSelectOptions,
  getRoleSelectOptions,
  getUserSelectOptions,
} from "@/utils/options";
import { useTranslation } from "react-i18next";

export default function Edit({
  data,
  optionsData,
  queryData,
}: {
  data?: API.DepartmentDetailTree[];
  optionsData?: API.DepartmentOptions;
  queryData: (params?: API.DepartmentQuery) => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const getInitData = () => {
    if (!data) {
      return;
    }
    const { id, parentId, code, name, leader, deptStatus, roles } = data[0];
    return {
      id,
      parentId: parentId.toString(),
      code,
      name,
      leader: leader.id,
      deptStatus: deptStatus.dictValue,
      roles: roles?.map((item) => item.id),
    };
  };

  const handleEdit = () => {
    if (!data || data.length !== 1) {
      message.warning(t("app.departmentPage.action.modal.edit.selectOne"));
      return;
    }
    form.setFieldsValue(getInitData());
    setOpen(true);
  };

  const handleOk = async () => {
    const department: API.DepartmentParams = await form.validateFields();
    department.parentId = Number(department.parentId);
    department.deptStatus = department.deptStatus && department.deptStatus[0];
    setLoading(true);
    const editResult = await editDepartment(department);
    if (editResult.code !== 0) {
      message.error(
        `${t("app.departmentPage.action.modal.edit.tip.fail")} : ${
          editResult.code
        } | ${editResult.message}`
      );
    } else {
      message.success(t("app.departmentPage.action.modal.edit.tip.success"));
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
      <AuthWrapper permission="department:edit">
        <Button icon={<EditOutlined />} onClick={handleEdit}>
          {t("app.departmentPage.action.edit")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.departmentPage.action.modal.edit.title")}
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
          name="editDepartment"
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
            label={t("app.departmentPage.action.modal.edit.item.parentDept")}
            name="parentId"
            hidden={data && data.length === 1 ? data[0].parentId === 0 : false}
            rules={[{ required: true }]}
          >
            <TreeSelect
              treeData={getDeptTree(optionsData?.departments)}
              allowClear
              placeholder={t(
                "app.departmentPage.action.modal.edit.placeholder"
              )}
            />
          </Form.Item>
          <Form.Item
            label={t("app.departmentPage.action.modal.edit.item.code")}
            name="code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.departmentPage.action.modal.edit.item.name")}
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("app.departmentPage.action.modal.edit.item.leader")}
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
              placeholder={t(
                "app.departmentPage.action.modal.edit.placeholder"
              )}
            />
          </Form.Item>
          <Form.Item
            label={t("app.departmentPage.action.modal.edit.item.deptStatus")}
            name="deptStatus"
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.deptStatus)}
              placeholder={t(
                "app.departmentPage.action.modal.edit.placeholder"
              )}
            />
          </Form.Item>
          <Form.Item
            label={t("app.departmentPage.action.modal.edit.item.role")}
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
              placeholder={t(
                "app.departmentPage.action.modal.edit.placeholder"
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
