import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { getUserList, removeUser } from '@/services/user';
import AuthWrapper from '@/components/AuthWrapper';

type Props = {
  selectId: number;
  setUserData: React.Dispatch<React.SetStateAction<API.PageInfo<API.UserInfo[]> | undefined>>;
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
    const queryResult = await getUserList();
    if (!queryResult.data) {
      return;
    }
    setUserData(queryResult.data);
    message.success(t('pages.user.delete.tip.success'));
  };

  return (
    <div>
      <AuthWrapper permission="user:delete">
        <Popconfirm
          title={t('common.tip.delete.title')}
          description={t('common.tip.delete.description')}
          onConfirm={handleConfirm}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          <Button type="link" size="small" style={{ padding: 0, border: 0, height: 22 }}>
            {t('pages.user.delete')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default Delete;
