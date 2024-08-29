import { removeDepartment } from "@/services/department";
import { App, Button, Popconfirm } from "antd";
import AuthWrapper from "@/components/auth-wrapper";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export default function Delete({
  data,
  queryData,
}: {
  data: API.DepartmentDetailTree[];
  queryData: (params?: API.DepartmentQuery) => void;
}) {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const handleConfirm = async () => {
    if (data.length <= 0) {
      message.warning(t("app.departmentPage.action.modal.delete.select"));
      return;
    }
    const ids = data.map((item) => item.id);
    const deleteResult = await removeDepartment(ids);
    if (!deleteResult.data) {
      message.error(t("app.departmentPage.action.modal.delete.tip.fail"));
    } else {
      message.success(t("app.departmentPage.action.modal.delete.tip.success"));
      queryData();
    }
  };

  return (
    <div>
      <AuthWrapper permission="department:delete">
        <Popconfirm
          title={t("app.departmentPage.action.modal.delete.title")}
          description={t(
            "app.departmentPage.action.modal.delete.tip.description"
          )}
          onConfirm={handleConfirm}
          okText={t("app.departmentPage.action.modal.delete.ok")}
          cancelText={t("app.departmentPage.action.modal.delete.cancel")}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t("app.departmentPage.action.delete")}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
}
