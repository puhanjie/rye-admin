import { removePost } from "@/services/post";
import { App, Button, Popconfirm } from "antd";
import AuthWrapper from "@/components/auth-wrapper";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export default function Delete({
  data,
  queryData,
}: {
  data: API.PostInfo[];
  queryData: (params?: API.PostQuery) => void;
}) {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const handleConfirm = async () => {
    if (data.length <= 0) {
      message.warning(t("app.postPage.action.modal.delete.select"));
      return;
    }
    const ids = data.map((item) => item.id);
    const deleteResult = await removePost(ids);
    if (deleteResult.code !== 0) {
      message.error(
        `${t("app.postPage.action.modal.delete.tip.fail")} : ${
          deleteResult.code
        } | ${deleteResult.message}`
      );
      return;
    } else {
      message.success(t("app.postPage.action.modal.delete.tip.success"));
      queryData();
    }
  };

  return (
    <div>
      <AuthWrapper permission="post:delete">
        <Popconfirm
          title={t("app.postPage.action.modal.delete.title")}
          description={t("app.postPage.action.modal.delete.tip.description")}
          onConfirm={handleConfirm}
          okText={t("app.postPage.action.modal.delete.ok")}
          cancelText={t("app.postPage.action.modal.delete.cancel")}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t("app.postPage.action.delete")}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
}
