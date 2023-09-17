import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { emptyLog, getLogList } from '@/services/log';

type Props = {
  setLogData: React.Dispatch<React.SetStateAction<API.Page<API.LogInfo[]> | undefined>>;
};

const Empty: React.FC<Props> = ({ setLogData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    const emptyResult = await emptyLog();
    if (!emptyResult.data) {
      message.error(t('pages.log.empty.tip.fail'));
      return;
    }
    // 清空成功后重新获取日志列表数据
    const queryResult = await getLogList();
    if (!queryResult.data) {
      return;
    }
    setLogData(queryResult.data);
    message.success(t('pages.log.empty.tip.success'));
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
