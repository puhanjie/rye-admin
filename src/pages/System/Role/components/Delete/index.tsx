import { Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import type { TableRoleInfo } from '../..';
import { getRoles, removeRole } from '@/services/role';

type Props = {
  selectId: number;
  setRoleData: React.Dispatch<React.SetStateAction<API.PageInfo<TableRoleInfo[]> | undefined>>;
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
    const queryResult = await getRoles();
    if (queryResult.data) {
      const data: API.PageInfo<TableRoleInfo[]> = {
        records: queryResult.data.records.map((item) => {
          return { key: item.id, ...item };
        }),
        total: queryResult.data.total,
        size: queryResult.data.size,
        current: queryResult.data.current,
        pages: queryResult.data.pages
      };
      setRoleData(data);
    }
    message.success(t('pages.role.delete.tip.success'));
  };

  return (
    <div>
      <Popconfirm
        title={t('common.tip.delete.title')}
        description={t('common.tip.delete.description')}
        onConfirm={handleConfirm}
        okText={t('common.yes')}
        cancelText={t('common.no')}
      >
        <a>{t('pages.role.delete')}</a>
      </Popconfirm>
    </div>
  );
};

export default Delete;
