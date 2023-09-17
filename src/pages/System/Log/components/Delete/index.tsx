import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { getLogList, removeLog } from '@/services/log';

type Props = {
  data: API.LogInfo[];
  setLogData: React.Dispatch<React.SetStateAction<API.Page<API.LogInfo[]> | undefined>>;
};

const Delete: React.FC<Props> = ({ data, setLogData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    if (data.length <= 0) {
      message.warning(t('common.tip.select'));
      return;
    }
    const ids = data.map((item) => item.id);
    const deleteResult = await removeLog(ids);
    if (!deleteResult.data) {
      message.error(t('pages.log.delete.tip.fail'));
      return;
    }
    // 删除成功后重新获取日志列表数据
    const queryResult = await getLogList();
    if (!queryResult.data) {
      return;
    }
    setLogData(queryResult.data);
    message.success(t('pages.log.delete.tip.success'));
  };

  return (
    <div>
      <AuthWrapper permission="log:delete">
        <Popconfirm
          title={t('common.tip.delete.title')}
          description={t('common.tip.delete.description')}
          onConfirm={handleConfirm}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t('pages.log.delete')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default Delete;
