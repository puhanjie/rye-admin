import AuthWrapper from "@/components/auth-wrapper";
import { removeRole } from "@/services/role";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

export default function Delete({
  data,
  queryData,
}: {
  data: API.RoleInfo[];
  queryData: (params?: API.RoleQuery) => void;
}) {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const handleConfirm = async () => {
    if (data.length <= 0) {
      messageApi.warning(t("app.rolePage.action.modal.delete.select"));
      return;
    }
    const ids = data.map((item) => item.id);
    const deleteResult = await removeRole(ids);
    if (!deleteResult.data) {
      messageApi.error(t("app.rolePage.action.modal.delete.tip.fail"));
    } else {
      messageApi.success(t("app.rolePage.action.modal.delete.tip.success"));
      queryData();
    }
  };

  return (
    <div>
      {contextHolder}
      <AuthWrapper permission="role:delete">
        <Popconfirm
          title={t("app.rolePage.action.modal.delete.title")}
          description={t("app.rolePage.action.modal.delete.tip.description")}
          onConfirm={handleConfirm}
          okText={t("app.rolePage.action.modal.delete.ok")}
          cancelText={t("app.rolePage.action.modal.delete.cancel")}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t("app.rolePage.action.delete")}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
}
