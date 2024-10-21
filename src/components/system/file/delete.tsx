"use client";

import AuthWrapper from "@/components/auth-wrapper";
import { removeFile } from "@/services/file";
import { App, Button, Popconfirm } from "antd";
import { useTranslations } from "next-intl";

export default function Delete({
  data,
  queryData,
}: {
  data: API.FileInfo;
  queryData: (params?: API.FileQuery) => void;
}) {
  const t = useTranslations();
  const { message } = App.useApp();

  const handleConfirm = async () => {
    const deleteResult = await removeFile(data.path);
    if (deleteResult.code !== 0) {
      message.error(
        `${t("app.filePage.action.modal.delete.tip.fail")} : ${
          deleteResult.code
        } | ${deleteResult.message}`
      );
      return;
    } else {
      message.success(t("app.filePage.action.modal.delete.tip.success"));
      queryData();
    }
  };

  return (
    <AuthWrapper permission="file:delete">
      <Popconfirm
        title={t("app.filePage.action.modal.delete.title")}
        description={t("app.filePage.action.modal.delete.tip.description")}
        onConfirm={handleConfirm}
        okText={t("app.filePage.action.modal.delete.ok")}
        cancelText={t("app.filePage.action.modal.delete.cancel")}
      >
        <Button type="link" danger style={{ padding: 0 }}>
          {t("app.filePage.action.delete")}
        </Button>
      </Popconfirm>
    </AuthWrapper>
  );
}
