import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { getDictionaryList, removeDictionary } from '@/services/dictionary';

type Props = {
  selectData: API.DictionaryInfo[];
  setDictionaryData: React.Dispatch<
    React.SetStateAction<API.PageInfo<API.DictionaryInfo[]> | undefined>
  >;
};

const BatchDelete: React.FC<Props> = ({ selectData, setDictionaryData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    if (selectData.length <= 0) {
      message.warning(t('common.tip.select'));
      return;
    }
    const ids = selectData.map((item) => item.id);
    const deleteResult = await removeDictionary(ids);
    if (!deleteResult.data) {
      message.error(t('pages.dictionary.batchDelete.tip.fail'));
      return;
    }
    // 删除成功后重新获取字典列表数据
    const queryResult = await getDictionaryList();
    if (!queryResult.data) {
      return;
    }
    setDictionaryData(queryResult.data);
    message.success(t('pages.dictionary.batchDelete.tip.success'));
  };

  return (
    <div>
      <AuthWrapper permission="dictionary:batchDelete">
        <Popconfirm
          title={t('common.tip.batchDelete.title')}
          description={t('common.tip.batchDelete.description')}
          onConfirm={handleConfirm}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t('pages.dictionary.batchDelete')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default BatchDelete;
