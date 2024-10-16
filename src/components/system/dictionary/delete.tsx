"use client";

import AuthWrapper from "@/components/auth-wrapper";
import { removeDictionary } from "@/services/dictionary";
import { DeleteOutlined } from "@ant-design/icons";
import { App, Button, Popconfirm } from "antd";
import { useTranslations } from "next-intl";

export default function Delete({
  data,
  queryData,
}: {
  data: API.DictionaryInfo[];
  queryData: (params?: API.DictionaryQuery) => void;
}) {
  const t = useTranslations();
  const { message } = App.useApp();

  const handleConfirm = async () => {
    if (data.length <= 0) {
      message.warning(t("app.dictionaryPage.action.modal.delete.select"));
      return;
    }
    const ids = data.map((item) => item.id);
    const deleteResult = await removeDictionary(ids);
    if (deleteResult.code !== 0) {
      message.error(
        `${t("app.dictionaryPage.action.modal.delete.tip.fail")} : ${
          deleteResult.code
        } | ${deleteResult.message}`
      );
      return;
    } else {
      message.success(t("app.dictionaryPage.action.modal.delete.tip.success"));
      queryData();
    }
  };

  return (
    <div>
      <AuthWrapper permission="dictionary:delete">
        <Popconfirm
          title={t("app.dictionaryPage.action.modal.delete.title")}
          description={t(
            "app.dictionaryPage.action.modal.delete.tip.description"
          )}
          onConfirm={handleConfirm}
          okText={t("app.dictionaryPage.action.modal.delete.ok")}
          cancelText={t("app.dictionaryPage.action.modal.delete.cancel")}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t("app.dictionaryPage.action.delete")}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
}
