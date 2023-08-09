import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import type { TableRoleInfo } from '../..';
import { getRoleList, removeRole } from '@/services/role';
import AuthWrapper from '@/components/AuthWrapper';

type Props = {
  selectData: TableRoleInfo[];
  setRoleData: React.Dispatch<React.SetStateAction<API.PageInfo<TableRoleInfo[]> | undefined>>;
};

const BatchDelete: React.FC<Props> = ({ selectData, setRoleData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    if (selectData.length <= 0) {
      message.warning(t('common.tip.select'));
      return;
    }
    const ids = selectData.map((item) => item.id);
    const deleteResult = await removeRole(ids);
    if (!deleteResult.data) {
      message.error(t('pages.role.batchDelete.tip.fail'));
      return;
    }
    // 删除成功后重新获取角色列表数据
    const queryResult = await getRoleList();
    if (queryResult.data) {
      const data: API.PageInfo<TableRoleInfo[]> = {
        records: queryResult.data.records.map((item) => ({ key: item.id, ...item })),
        total: queryResult.data.total,
        size: queryResult.data.size,
        current: queryResult.data.current,
        pages: queryResult.data.pages
      };
      setRoleData(data);
    }
    message.success(t('pages.role.batchDelete.tip.success'));
  };

  return (
    <div>
      <AuthWrapper permission="role:batchDelete">
        <Popconfirm
          title={t('common.tip.batchDelete.title')}
          description={t('common.tip.batchDelete.description')}
          onConfirm={handleConfirm}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t('pages.role.batchDelete')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default BatchDelete;
