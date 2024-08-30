import AuthWrapper from "@/components/auth-wrapper";
import { removePermission } from "@/services/permission";
import { DeleteOutlined } from "@ant-design/icons";
import { App, Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

export default function Delete({
  data,
  queryData,
}: {
  data: API.PermissionInfo[];
  queryData: (params?: API.PermissionQuery) => void;
}) {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const handleConfirm = async () => {
    if (data.length <= 0) {
      message.warning(t("app.permissionPage.action.modal.delete.select"));
      return;
    }
    const ids = data.map((item) => item.id);
    const deleteResult = await removePermission(ids);
    if (deleteResult.code !== 0) {
      message.error(
        `${t("app.permissionPage.action.modal.delete.tip.fail")} : ${
          deleteResult.code
        } | ${deleteResult.message}`
      );
    } else {
      message.success(t("app.permissionPage.action.modal.delete.tip.success"));
      queryData();
    }
  };

  return (
    <div>
      <AuthWrapper permission="permission:delete">
        <Popconfirm
          title={t("app.permissionPage.action.modal.delete.title")}
          description={t(
            "app.permissionPage.action.modal.delete.tip.description"
          )}
          onConfirm={handleConfirm}
          okText={t("app.permissionPage.action.modal.delete.ok")}
          cancelText={t("app.permissionPage.action.modal.delete.cancel")}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t("app.permissionPage.action.delete")}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
}
