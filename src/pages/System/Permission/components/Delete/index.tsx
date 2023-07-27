import { Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import type { TablePermissionInfo } from '../..';
import { getPermissions, removePermission } from '@/services/permission';
import AuthWrapper from '@/components/AuthWrapper';

type Props = {
  selectId: number;
  setPermissionData: React.Dispatch<
    React.SetStateAction<API.PageInfo<TablePermissionInfo[]> | undefined>
  >;
};

const Delete: React.FC<Props> = ({ selectId, setPermissionData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    if (!selectId) {
      message.error(t('common.tip.id'));
      return;
    }
    const deleteResult = await removePermission([selectId]);
    if (!deleteResult.data) {
      message.error(t('pages.permission.delete.tip.fail'));
      return;
    }
    // 删除权限成功后重新获取权限列表数据
    const queryResult = await getPermissions();
    if (queryResult.data) {
      const data: API.PageInfo<TablePermissionInfo[]> = {
        records: queryResult.data.records.map((item) => {
          return { key: item.id, ...item };
        }),
        total: queryResult.data.total,
        size: queryResult.data.size,
        current: queryResult.data.current,
        pages: queryResult.data.pages
      };
      setPermissionData(data);
    }
    message.success(t('pages.permission.delete.tip.success'));
  };

  return (
    <div>
      <AuthWrapper permission="permission:delete">
        <Popconfirm
          title={t('common.tip.delete.title')}
          description={t('common.tip.delete.description')}
          onConfirm={handleConfirm}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          <a>{t('pages.permission.delete')}</a>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default Delete;
