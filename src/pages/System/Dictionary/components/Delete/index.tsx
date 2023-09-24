import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { removeDictionary } from '@/services/dictionary';

type Props = {
  data: API.DictionaryInfo[];
  queryData: (params?: API.DictionaryQuery) => void;
};

const Delete: React.FC<Props> = ({ data, queryData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    if (data.length <= 0) {
      message.warning(t('common.tip.select'));
      return;
    }
    const ids = data.map((item) => item.id);
    const deleteResult = await removeDictionary(ids);
    if (!deleteResult.data) {
      message.error(t('pages.dictionary.delete.tip.fail'));
      return;
    }
    message.success(t('pages.dictionary.delete.tip.success'));
    // 删除成功后重新获取字典列表数据
    queryData();
  };

  return (
    <div>
      <AuthWrapper permission="dictionary:delete">
        <Popconfirm
          title={t('common.tip.delete.title')}
          description={t('common.tip.delete.description')}
          onConfirm={handleConfirm}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t('pages.dictionary.delete')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default Delete;
