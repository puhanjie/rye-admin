import { removePost } from "@/services/post";
import { Button, message, Popconfirm } from "antd";
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
  const [messageApi, contextHolder] = message.useMessage();

  const handleConfirm = async () => {
    if (data.length <= 0) {
      messageApi.warning(t("app.postPage.action.modal.delete.select"));
      return;
    }
    const ids = data.map((item) => item.id);
    const deleteResult = await removePost(ids);
    if (!deleteResult.data) {
      messageApi.error(t("app.postPage.action.modal.delete.tip.fail"));
      return;
    } else {
      messageApi.success(t("app.postPage.action.modal.delete.tip.success"));
      queryData();
    }
  };

  return (
    <div>
      {contextHolder}
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
