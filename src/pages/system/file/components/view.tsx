import AuthWrapper from "@/components/auth-wrapper";
import { EyeOutlined } from "@ant-design/icons";
import { App, Button, Descriptions, Modal, type DescriptionsProps } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function View({ data }: { data: API.FileInfo[] }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { message } = App.useApp();

  const items: DescriptionsProps["items"] =
    data.length === 1
      ? [
          {
            key: "path",
            label: t("app.filePage.action.modal.view.item.path"),
            children: data[0].path,
          },
          {
            key: "name",
            label: t("app.filePage.action.modal.view.item.name"),
            children: data[0].name,
          },
          {
            key: "fileSize",
            label: t("app.filePage.action.modal.view.item.fileSize"),
            children: data[0].fileSize,
          },
          {
            key: "uuid",
            label: t("app.filePage.action.modal.view.item.uuid"),
            children: data[0].uuid,
          },
        ]
      : [];

  const handleView = () => {
    if (data.length !== 1) {
      message.warning(t("app.filePage.action.modal.view.selectOne"));
      return;
    }
    setOpen(true);
  };

  return (
    <div>
      <AuthWrapper permission="file:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t("app.filePage.action.view")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.filePage.action.modal.view.title")}
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
