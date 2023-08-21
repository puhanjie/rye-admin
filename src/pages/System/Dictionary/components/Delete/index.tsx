import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { getDictionaryList, removeDictionary } from '@/services/dictionary';

type Props = {
  selectId: number;
  setDictionaryData: React.Dispatch<
    React.SetStateAction<API.PageInfo<API.DictionaryInfo[]> | undefined>
  >;
};

const Delete: React.FC<Props> = ({ selectId, setDictionaryData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    if (!selectId) {
      message.error(t('common.tip.id'));
      return;
    }
    const deleteResult = await removeDictionary([selectId]);
    if (!deleteResult.data) {
      message.error(t('pages.dictionary.delete.tip.fail'));
      return;
    }
    // 删除权限成功后重新获取权限列表数据
    const queryResult = await getDictionaryList();
    if (!queryResult.data) {
      return;
    }
    setDictionaryData(queryResult.data);
    message.success(t('pages.dictionary.delete.tip.success'));
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
          <Button type="link" size="small" style={{ padding: 0, border: 0, height: 22 }}>
            {t('pages.dictionary.delete')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default Delete;
