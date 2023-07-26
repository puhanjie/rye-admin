import { Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import type { TableUserInfo } from '../..';
import { getUsers, removeUser } from '@/services/user';

type Props = {
  selectId: number;
  setUserData: React.Dispatch<React.SetStateAction<API.PageInfo<TableUserInfo[]> | undefined>>;
};

const Delete: React.FC<Props> = ({ selectId, setUserData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    if (!selectId) {
      message.error(t('common.tip.id'));
      return;
    }
    const deleteResult = await removeUser([selectId]);
    if (!deleteResult.data) {
      message.error(t('pages.user.delete.tip.fail'));
      return;
    }
    // 删除用户成功后重新获取用户列表数据
    const queryResult = await getUsers();
    if (queryResult.data) {
      const data: API.PageInfo<TableUserInfo[]> = {
        records: queryResult.data.records.map((item) => {
          return { key: item.id, ...item };
        }),
        total: queryResult.data.total,
        size: queryResult.data.size,
        current: queryResult.data.current,
        pages: queryResult.data.pages
      };
      setUserData(data);
    }
    message.success(t('pages.user.delete.tip.success'));
  };

  return (
    <div>
      <Popconfirm
        title={t('common.tip.delete.title')}
        description={t('common.tip.delete.description')}
        onConfirm={handleConfirm}
        okText={t('common.yes')}
        cancelText={t('common.no')}
      >
        <a>{t('pages.user.delete')}</a>
      </Popconfirm>
    </div>
  );
};

export default Delete;
