import AuthWrapper from '@/components/AuthWrapper';
import { downloadFile } from '@/services/file';
import { download } from '@/utils/file';
import { Button, message } from 'antd';
import { useTranslation } from 'react-i18next';

type Props = {
  data: API.FileInfo;
};

const Download: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  const handleDownload = async () => {
    const res = await downloadFile(data.path);
    download(res);
    message.success(t('pages.file.download.tip.success'));
  };

  return (
    <div>
      <AuthWrapper permission="file:download">
        <Button type="link" onClick={handleDownload} style={{ padding: 0 }}>
          {t('pages.file.download')}
        </Button>
      </AuthWrapper>
    </div>
  );
};

export default Download;
