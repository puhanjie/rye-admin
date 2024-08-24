import AuthWrapper from "@/components/auth-wrapper";
import { EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Descriptions,
  type DescriptionsProps,
  message,
  Modal,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function View({ data }: { data: API.LogInfo[] }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const items: DescriptionsProps["items"] =
    data.length === 1
      ? [
          {
            key: "url",
            label: t("app.logPage.action.modal.view.item.url"),
            children: data[0].url,
          },
          {
            key: "code",
            label: t("app.logPage.action.modal.view.item.code"),
            children: data[0].code,
          },
          {
            key: "message",
            label: t("app.logPage.action.modal.view.item.message"),
            children: data[0].message,
          },
          {
            key: "operateUser",
            label: t("app.logPage.action.modal.view.item.operateUser"),
            children: data[0].operateUser.name,
          },
          {
            key: "operateTime",
            label: t("app.logPage.action.modal.view.item.operateTime"),
            children: data[0].operateTime,
          },
        ]
      : [];

  const handleView = () => {
    if (data.length !== 1) {
      messageApi.warning(t("app.logPage.action.modal.view.selectOne"));
      return;
    }
    setOpen(true);
  };

  return (
    <div>
      {contextHolder}
      <AuthWrapper permission="log:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t("app.logPage.action.view")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.logPage.action.modal.view.title")}
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
        <Descriptions bordered column={1} items={items} />
      </Modal>
    </div>
  );
}
