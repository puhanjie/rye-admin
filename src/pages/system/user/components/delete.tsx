import { removeUser } from "@/services/user";
import { App, Button, Popconfirm } from "antd";
import AuthWrapper from "@/components/auth-wrapper";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export default function Delete({
  data,
  queryData,
}: {
  data: API.UserInfo[];
  queryData: (params?: API.UserQuery) => void;
}) {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const handleConfirm = async () => {
    if (data.length <= 0) {
      message.warning(t("app.userPage.action.modal.delete.select"));
      return;
    }
    const ids = data.map((item) => item.id);
    const deleteResult = await removeUser(ids);
    if (!deleteResult.data) {
      message.error(t("app.userPage.action.modal.delete.tip.fail"));
    } else {
      message.success(t("app.userPage.action.modal.delete.tip.success"));
      queryData();
    }
  };

  return (
    <div>
      <AuthWrapper permission="user:delete">
        <Popconfirm
          title={t("app.userPage.action.modal.delete.title")}
          description={t("app.userPage.action.modal.delete.tip.description")}
          onConfirm={handleConfirm}
          okText={t("app.userPage.action.modal.delete.ok")}
          cancelText={t("app.userPage.action.modal.delete.cancel")}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t("app.userPage.action.delete")}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
}
