import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { getPermissionList, removePermission } from '@/services/permission';
import AuthWrapper from '@/components/AuthWrapper';

type Props = {
  selectId: number;
  setPermissionData: React.Dispatch<
    React.SetStateAction<API.PageInfo<API.PermissionInfo[]> | undefined>
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
    const queryResult = await getPermissionList();
    if (!queryResult.data) {
      return;
    }
    setPermissionData(queryResult.data);
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
          <Button type="link" size="small" style={{ padding: 0, border: 0, height: 22 }}>
            {t('pages.permission.delete')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default Delete;
