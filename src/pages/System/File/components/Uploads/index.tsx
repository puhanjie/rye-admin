import AuthWrapper from '@/components/AuthWrapper';
import { getFileList, uploadFile } from '@/services/file';
import { CloudUploadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Upload, message } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  setFileData: React.Dispatch<React.SetStateAction<API.Page<API.FileInfo[]> | undefined>>;
};

const Uploads: React.FC<Props> = ({ setFileData }) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file as RcFile);
    });
    const uploadResult = await uploadFile(formData);
    if (!uploadResult.data) {
      message.error(t('pages.file.upload.tip.fail'));
      return;
    }
    setLoading(false);
    message.success(t('pages.file.upload.tip.success'));
    setFiles([]);
    setIsOpen(false);
    // 上传文件成功后重新获取文件列表数据
    const queryResult = await getFileList();
    if (!queryResult.data) {
      return;
    }
    setFileData(queryResult.data);
  };

  const handleCancel = () => {
    setFiles([]);
    setIsOpen(false);
  };

  return (
    <div>
      <AuthWrapper permission="file:upload">
        <Button type="primary" icon={<UploadOutlined />} onClick={() => setIsOpen(true)}>
          {t('pages.file.upload')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.file.uploadModal.title')}
        open={isOpen}
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{
          padding: '12px',
          marginTop: '12px',
          borderTop: '2px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Upload.Dragger
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
          <p className="ant-upload-text">{t('pages.file.upload.text')}</p>
          <p className="ant-upload-hint">{t('pages.file.upload.hint')}</p>
        </Upload.Dragger>
      </Modal>
    </div>
  );
};

export default Uploads;
