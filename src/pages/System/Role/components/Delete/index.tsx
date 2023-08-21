import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { getRoleList, removeRole } from '@/services/role';
import AuthWrapper from '@/components/AuthWrapper';

type Props = {
  selectId: number;
  setRoleData: React.Dispatch<React.SetStateAction<API.PageInfo<API.RoleInfo[]> | undefined>>;
};

const Delete: React.FC<Props> = ({ selectId, setRoleData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    if (!selectId) {
      message.error(t('common.tip.id'));
      return;
    }
    const deleteResult = await removeRole([selectId]);
    if (!deleteResult.data) {
      message.error(t('pages.role.delete.tip.fail'));
      return;
    }
    // 删除成功后重新获取角色列表数据
    const queryResult = await getRoleList();
    if (queryResult.data) {
      return;
    }
    setRoleData(queryResult.data);
    message.success(t('pages.role.delete.tip.success'));
  };

  return (
    <div>
      <AuthWrapper permission="role:delete">
        <Popconfirm
          title={t('common.tip.delete.title')}
          description={t('common.tip.delete.description')}
          onConfirm={handleConfirm}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          <Button type="link" size="small" style={{ padding: 0, border: 0, height: 22 }}>
            {t('pages.role.delete')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default Delete;
