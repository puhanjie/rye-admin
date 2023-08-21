import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { getPermissionList, removePermission } from '@/services/permission';
import AuthWrapper from '@/components/AuthWrapper';

type Props = {
  selectData: API.PermissionInfo[];
  setPermissionData: React.Dispatch<
    React.SetStateAction<API.PageInfo<API.PermissionInfo[]> | undefined>
  >;
};

const BatchDelete: React.FC<Props> = ({ selectData, setPermissionData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    if (selectData.length <= 0) {
      message.warning(t('common.tip.select'));
      return;
    }
    const ids = selectData.map((item) => item.id);
    const deleteResult = await removePermission(ids);
    if (!deleteResult.data) {
      message.error(t('pages.permission.batchDelete.tip.fail'));
      return;
    }
    // 删除成功后重新获取权限列表数据
    const queryResult = await getPermissionList();
    if (!queryResult.data) {
      return;
    }
    setPermissionData(queryResult.data);
    message.success(t('pages.permission.batchDelete.tip.success'));
  };

  return (
    <div>
      <AuthWrapper permission="permission:batchDelete">
        <Popconfirm
          title={t('common.tip.batchDelete.title')}
          description={t('common.tip.batchDelete.description')}
          onConfirm={handleConfirm}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t('pages.permission.batchDelete')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default BatchDelete;
