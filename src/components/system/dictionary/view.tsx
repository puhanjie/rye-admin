"use client";

import AuthWrapper from "@/components/auth-wrapper";
import { EyeOutlined } from "@ant-design/icons";
import { App, Button, Descriptions, type DescriptionsProps, Modal } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function View({ data }: { data: API.DictionaryInfo[] }) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const { message } = App.useApp();

  const items: DescriptionsProps["items"] =
    data.length === 1
      ? [
          {
            key: "dictType",
            label: t("app.dictionaryPage.action.modal.view.item.dictType"),
            children: data[0].dictType,
          },
          {
            key: "dictName",
            label: t("app.dictionaryPage.action.modal.view.item.dictName"),
            children: data[0].dictName,
          },
          {
            key: "dictValue",
            label: t("app.dictionaryPage.action.modal.view.item.dictValue"),
            children: data[0].dictValue,
          },
          {
            key: "dictLabel",
            label: t("app.dictionaryPage.action.modal.view.item.dictLabel"),
            children: data[0].dictLabel,
          },
          {
            key: "description",
            label: t("app.dictionaryPage.action.modal.view.item.description"),
            children: data[0].description,
          },
        ]
      : [];

  const handleView = () => {
    if (data.length !== 1) {
      message.warning(t("app.dictionaryPage.action.modal.view.selectOne"));
      return;
    }
    setIsOpen(true);
  };

  return (
    <div>
      <AuthWrapper permission="dictionary:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t("app.dictionaryPage.action.view")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.dictionaryPage.action.modal.view.title")}
        open={isOpen}
        centered
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
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
