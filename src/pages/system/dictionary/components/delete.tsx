import AuthWrapper from "@/components/auth-wrapper";
import { removeDictionary } from "@/services/dictionary";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

export default function Delete({
  data,
  queryData,
}: {
  data: API.DictionaryInfo[];
  queryData: (params?: API.DictionaryQuery) => void;
}) {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const handleConfirm = async () => {
    if (data.length <= 0) {
      messageApi.warning(t("app.dictionaryPage.action.modal.delete.select"));
      return;
    }
    const ids = data.map((item) => item.id);
    const deleteResult = await removeDictionary(ids);
    if (!deleteResult.data) {
      messageApi.error(t("app.dictionaryPage.action.modal.delete.tip.fail"));
      return;
    } else {
      messageApi.success(
        t("app.dictionaryPage.action.modal.delete.tip.success")
      );
      queryData();
    }
  };

  return (
    <div>
      {contextHolder}
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
