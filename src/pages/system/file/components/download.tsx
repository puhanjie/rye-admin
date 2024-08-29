import AuthWrapper from "@/components/auth-wrapper";
import { downloadFile } from "@/services/file";
import { download } from "@/utils/file";
import { App, Button } from "antd";
import { useTranslation } from "react-i18next";

export default function Download({ data }: { data: API.FileInfo }) {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const handleDownload = async () => {
    const res = await downloadFile(data.path);
    download(res);
    message.success(t("app.filePage.action.modal.download.tip.success"));
  };

  return (
    <div>
      <AuthWrapper permission="file:download">
        <Button type="link" onClick={handleDownload} style={{ padding: 0 }}>
          {t("app.filePage.action.download")}
        </Button>
      </AuthWrapper>
    </div>
  );
}
