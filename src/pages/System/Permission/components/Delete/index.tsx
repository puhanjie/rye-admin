import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { removePermission } from '@/services/permission';
import AuthWrapper from '@/components/AuthWrapper';

type Props = {
  data: API.PermissionInfo[];
  queryData: (params?: API.PermissionQuery) => void;
};

const Delete: React.FC<Props> = ({ data, queryData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    if (data.length <= 0) {
      message.warning(t('common.tip.select'));
      return;
    }
    const ids = data.map((item) => item.id);
    const deleteResult = await removePermission(ids);
    if (!deleteResult.data) {
      message.error(t('pages.permission.delete.tip.fail'));
      return;
    }
    message.success(t('pages.permission.delete.tip.success'));
    // 删除成功后重新获取权限列表数据
    queryData();
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
          <Button danger icon={<DeleteOutlined />}>
            {t('pages.permission.delete')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default Delete;
