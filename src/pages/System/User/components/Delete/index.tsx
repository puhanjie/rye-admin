import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { removeUser } from '@/services/user';
import AuthWrapper from '@/components/AuthWrapper';

type Props = {
  data: API.UserInfo[];
  queryData: (params?: API.UserQuery) => void;
};

const Delete: React.FC<Props> = ({ data, queryData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    if (data.length <= 0) {
      message.warning(t('common.tip.select'));
      return;
    }
    const ids = data.map((item) => item.id);
    const deleteResult = await removeUser(ids);
    if (!deleteResult.data) {
      message.error(t('pages.user.delete.tip.fail'));
      return;
    }
    message.success(t('pages.user.delete.tip.success'));
    // 删除成功后重新获取用户列表数据
    queryData();
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
          <Button danger icon={<DeleteOutlined />}>
            {t('pages.user.delete')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default Delete;
