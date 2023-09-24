import AuthWrapper from '@/components/AuthWrapper';
import { removeFile } from '@/services/file';
import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';

type Props = {
  data: API.FileInfo;
  queryData: (params?: API.FileQuery) => void;
};

const Delete: React.FC<Props> = ({ data, queryData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    const deleteResult = await removeFile(data.path);
    if (!deleteResult.data) {
      message.error(t('pages.file.delete.tip.fail'));
      return;
    }
    message.success(t('pages.file.delete.tip.success'));
    // 删除成功后重新获取文件列表数据
    queryData();
  };

  return (
    <div>
      <AuthWrapper permission="file:delete">
        <Popconfirm
          title={t('common.tip.delete.title')}
          description={t('common.tip.delete.description')}
          onConfirm={handleConfirm}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          <Button type="link" danger style={{ padding: 0 }}>
            {t('pages.file.delete')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default Delete;
