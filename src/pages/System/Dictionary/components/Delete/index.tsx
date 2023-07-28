import { Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import type { TableDictionaryInfo } from '../..';
import AuthWrapper from '@/components/AuthWrapper';
import { getDictionarys, removeDictionary } from '@/services/dictionary';

type Props = {
  selectId: number;
  setDictionaryData: React.Dispatch<
    React.SetStateAction<API.PageInfo<TableDictionaryInfo[]> | undefined>
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
    const queryResult = await getDictionarys();
    if (queryResult.data) {
      const data: API.PageInfo<TableDictionaryInfo[]> = {
        records: queryResult.data.records.map((item) => {
          return { key: item.id, ...item };
        }),
        total: queryResult.data.total,
        size: queryResult.data.size,
        current: queryResult.data.current,
        pages: queryResult.data.pages
      };
      setDictionaryData(data);
    }
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
          <a>{t('pages.dictionary.delete')}</a>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default Delete;
