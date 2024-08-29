import AuthWrapper from "@/components/auth-wrapper";
import { downloadFile } from "@/services/file";
import { download } from "@/utils/file";
import { Button, message } from "antd";
import { useTranslation } from "react-i18next";

export default function Download({ data }: { data: API.FileInfo }) {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const handleDownload = async () => {
    const res = await downloadFile(data.path);
    download(res);
    messageApi.success(t("app.filePage.action.modal.download.tip.success"));
  };

  return (
    <div>
      {contextHolder}
      <AuthWrapper permission="file:download">
        <Button type="link" onClick={handleDownload} style={{ padding: 0 }}>
          {t("app.filePage.action.download")}
        </Button>
      </AuthWrapper>
    </div>
  );
}
