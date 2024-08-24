import AuthWrapper from "@/components/auth-wrapper";
import { removeFile } from "@/services/file";
import { Button, message, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

export default function Delete({
  data,
  queryData,
}: {
  data: API.FileInfo;
  queryData: (params?: API.FileQuery) => void;
}) {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const handleConfirm = async () => {
    const deleteResult = await removeFile(data.path);
    if (!deleteResult.data) {
      messageApi.error(t("app.filePage.action.modal.delete.tip.fail"));
      return;
    } else {
      messageApi.success(t("app.filePage.action.modal.delete.tip.success"));
      queryData();
    }
  };

  return (
    <div>
      {contextHolder}
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
    </div>
  );
}
