import AuthWrapper from "@/components/auth-wrapper";
import { removeLog } from "@/services/log";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

export default function Delete({
  data,
  queryData,
}: {
  data: API.LogInfo[];
  queryData: (params?: API.LogQuery) => void;
}) {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const handleConfirm = async () => {
    if (data.length <= 0) {
      messageApi.warning(t("app.logPage.action.modal.delete.select"));
      return;
    }
    const ids = data.map((item) => item.id);
    const deleteResult = await removeLog(ids);
    if (!deleteResult.data) {
      messageApi.error(t("app.logPage.action.modal.delete.tip.fail"));
      return;
    } else {
      messageApi.success(t("app.logPage.action.modal.delete.tip.success"));
      queryData();
    }
  };

  return (
    <div>
      {contextHolder}
      <AuthWrapper permission="log:delete">
        <Popconfirm
          title={t("app.logPage.action.modal.delete.title")}
          description={t("app.logPage.action.modal.delete.tip.description")}
          onConfirm={handleConfirm}
          okText={t("app.logPage.action.modal.delete.ok")}
          cancelText={t("app.logPage.action.modal.delete.cancel")}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t("app.logPage.action.delete")}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
}
