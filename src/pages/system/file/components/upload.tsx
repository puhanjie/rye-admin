import AuthWrapper from "@/components/auth-wrapper";
import { uploadFile } from "@/services/file";
import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload as AntdUpload, App } from "antd";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const { Dragger } = AntdUpload;

export default function Upload({
  queryData,
}: {
  queryData: (params?: API.FileQuery) => void;
}) {
  const { t } = useTranslation();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  const handleOk = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file as RcFile);
    });
    setLoading(true);
    const uploadResult = await uploadFile(formData);
    if (!uploadResult.data) {
      message.error(t("app.filePage.action.modal.upload.tip.fail"));
    } else {
      message.success(t("app.filePage.action.modal.upload.tip.success"));
      queryData();
    }
    setLoading(false);
    setFiles([]);
    setOpen(false);
  };

  const handleCancel = () => {
    setFiles([]);
    setOpen(false);
  };

  return (
    <div>
      <AuthWrapper permission="file:upload">
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => setOpen(true)}
        >
          {t("app.filePage.action.upload")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.filePage.action.modal.upload.title")}
        open={open}
        confirmLoading={loading}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        styles={{
          body: {
            padding: "12px",
            marginTop: "12px",
            borderTop: "2px solid rgba(0, 0, 0, 0.06)",
          },
        }}
      >
        <Dragger
          name="files"
          multiple={true}
          fileList={files}
          onRemove={(file) => {
            const index = files.indexOf(file);
            const newFiles = files.slice();
            newFiles.splice(index, 1);
            setFiles(newFiles);
          }}
          beforeUpload={(_file, fileList) => {
            setFiles([...files, ...fileList]);
            return false;
          }}
        >
          <p className="ant-upload-drag-icon">
            <CloudUploadOutlined />
          </p>
          <p className="ant-upload-text">
            {t("app.filePage.action.modal.upload.text")}
          </p>
          <p className="ant-upload-hint">
            {t("app.filePage.action.modal.upload.hint")}
          </p>
        </Dragger>
      </Modal>
    </div>
  );
}
