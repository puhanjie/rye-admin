import { userStatusTagColor } from "@/config/statusTag";
import {
  App,
  Button,
  Descriptions,
  Modal,
  Tag,
  type DescriptionsProps,
} from "antd";
import { useState } from "react";
import AuthWrapper from "@/components/auth-wrapper";
import { EyeOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export default function View({ data }: { data: API.UserInfo[] }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { message } = App.useApp();

  const items: DescriptionsProps["items"] =
    data.length === 1
      ? [
          {
            key: "department",
            label: t("app.userPage.action.modal.view.item.department"),
            children: data[0].department.name,
          },
          {
            key: "username",
            label: t("app.userPage.action.modal.view.item.username"),
            children: data[0].username,
          },
          {
            key: "name",
            label: t("app.userPage.action.modal.view.item.name"),
            children: data[0].name,
          },
          {
            key: "sex",
            label: t("app.userPage.action.modal.view.item.sex"),
            children: data[0].sex.dictLabel,
          },
          {
            key: "userStatus",
            label: t("app.userPage.action.modal.view.item.userStatus"),
            children: (
              <Tag
                color={
                  userStatusTagColor.filter(
                    (item) => data[0].userStatus.dictValue === item.value
                  )[0].color
                }
              >
                {data[0].userStatus.dictLabel}
              </Tag>
            ),
          },
          {
            key: "post",
            label: t("app.userPage.action.modal.view.item.post"),
            children: data[0].posts?.map((item) => (
              <Tag key={item.id}>{item.name}</Tag>
            )),
          },
          {
            key: "role",
            label: t("app.userPage.action.modal.view.item.role"),
            children: data[0].roles?.map((item) => (
              <Tag key={item.id}>{item.name}</Tag>
            )),
          },
          {
            key: "phone",
            label: t("app.userPage.action.modal.view.item.phone"),
            children: data[0].phone,
          },
          {
            key: "email",
            label: t("app.userPage.action.modal.view.item.email"),
            children: data[0].email,
          },
        ]
      : [];

  const handleView = () => {
    if (data.length !== 1) {
      message.warning(t("app.userPage.action.modal.view.selectOne"));
      return;
    }
    setOpen(true);
  };

  return (
    <div>
      <AuthWrapper permission="user:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t("app.userPage.action.view")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.userPage.action.modal.view.title")}
        open={open}
        centered
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        styles={{
          body: {
            padding: "12px",
            marginTop: "12px",
            borderTop: "2px solid rgba(0, 0, 0, 0.06)",
          },
        }}
      >
        <Descriptions bordered column={2} items={items} />
      </Modal>
    </div>
  );
}
