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
    if (res.type === "application/json") {
      // 相应为application/json类型说明下载失败
      const blob = new FileReader();
      blob.readAsText(res, "utf-8");
      blob.onload = () => {
        const data = JSON.parse(blob.result as string);
        message.error(`${data.code} | ${data.message}`);
      };
      return;
    }
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
