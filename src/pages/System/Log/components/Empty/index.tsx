import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { emptyLog } from '@/services/log';

type Props = {
  queryData: (params?: API.LogQuery) => void;
};

const Empty: React.FC<Props> = ({ queryData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    const emptyResult = await emptyLog();
    if (!emptyResult.data) {
      message.error(t('pages.log.empty.tip.fail'));
      return;
    }
    message.success(t('pages.log.empty.tip.success'));
    // 清空成功后重新获取日志列表数据
    queryData();
  };

  return (
    <div>
      <AuthWrapper permission="log:empty">
        <Popconfirm
          title={t('common.tip.empty.title')}
          description={t('common.tip.empty.description')}
          onConfirm={handleConfirm}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t('pages.log.empty')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default Empty;
