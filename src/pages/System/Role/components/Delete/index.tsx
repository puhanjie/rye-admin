import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { getRoleList, removeRole } from '@/services/role';
import AuthWrapper from '@/components/AuthWrapper';

type Props = {
  selectData: API.RoleInfo[];
  setRoleData: React.Dispatch<React.SetStateAction<API.PageInfo<API.RoleInfo[]> | undefined>>;
};

const Delete: React.FC<Props> = ({ selectData, setRoleData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    if (selectData.length <= 0) {
      message.warning(t('common.tip.select'));
      return;
    }
    const ids = selectData.map((item) => item.id);
    const deleteResult = await removeRole(ids);
    if (!deleteResult.data) {
      message.error(t('pages.role.delete.tip.fail'));
      return;
    }
    // 删除成功后重新获取角色列表数据
    const queryResult = await getRoleList();
    if (!queryResult.data) {
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
          <Button danger icon={<DeleteOutlined />}>
            {t('pages.role.delete')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default Delete;
