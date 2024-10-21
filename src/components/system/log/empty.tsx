"use client";

import AuthWrapper from "@/components/auth-wrapper";
import { emptyLog } from "@/services/log";
import { DeleteOutlined } from "@ant-design/icons";
import { App, Button, Popconfirm } from "antd";
import { useTranslations } from "next-intl";

export default function Empty({
  queryData,
}: {
  queryData: (params?: API.LogQuery) => void;
}) {
  const t = useTranslations();
  const { message } = App.useApp();

  const handleConfirm = async () => {
    const emptyResult = await emptyLog();
    if (emptyResult.code !== 0) {
      message.error(
        `${t("app.logPage.action.modal.empty.tip.fail")} : ${
          emptyResult.code
        } | ${emptyResult.message}`
      );
      return;
    } else {
      message.success(t("app.logPage.action.modal.empty.tip.success"));
      queryData();
    }
  };

  return (
    <AuthWrapper permission="log:empty">
      <Popconfirm
        title={t("app.logPage.action.modal.empty.title")}
        description={t("app.logPage.action.modal.empty.tip.description")}
        onConfirm={handleConfirm}
        okText={t("app.logPage.action.modal.empty.ok")}
        cancelText={t("app.logPage.action.modal.empty.cancel")}
      >
        <Button danger icon={<DeleteOutlined />}>
          {t("app.logPage.action.empty")}
        </Button>
      </Popconfirm>
    </AuthWrapper>
  );
}
