import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import type { TableUserInfo } from '../..';
import { getUsers, removeUser } from '@/services/user';
import AuthWrapper from '@/components/AuthWrapper';

type Props = {
  selectData: TableUserInfo[];
  setUserData: React.Dispatch<React.SetStateAction<API.PageInfo<TableUserInfo[]> | undefined>>;
};

const BatchDelete: React.FC<Props> = ({ selectData, setUserData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    if (selectData.length <= 0) {
      message.warning(t('common.tip.select'));
      return;
    }
    const ids = selectData.map((item) => item.id);
    const deleteResult = await removeUser(ids);
    if (!deleteResult.data) {
      message.error(t('pages.user.batchDelete.tip.fail'));
      return;
    }
    // 删除成功后重新获取用户列表数据
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
    message.success(t('pages.user.batchDelete.tip.success'));
  };

  return (
    <div>
      <AuthWrapper permission="user:batchDelete">
        <Popconfirm
          title={t('common.tip.batchDelete.title')}
          description={t('common.tip.batchDelete.description')}
          onConfirm={handleConfirm}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t('pages.user.batchDelete')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default BatchDelete;
