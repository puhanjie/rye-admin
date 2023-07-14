import { Button, Popconfirm, Space, message } from 'antd';
import { useState } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AddRoleModal from '../AddRoleModal';
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string;
  permissionList: API.PermissionInfo[];
};

const RoleAction: React.FC<Props> = ({ className, permissionList }) => {
  const { t } = useTranslation();
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className={className}>
      <Space style={{ width: '100%', marginBottom: '10px' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddOpen(true)}>
          {t('pages.role.add')}
        </Button>
        <Popconfirm
          title={t('common.tip.batchDelete.title')}
          description={t('common.tip.batchDelete.description')}
          onConfirm={() => {
            message.success('Click on Yes');
          }}
          onCancel={() => {
            message.error('Click on No');
          }}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t('pages.role.batchDelete')}
          </Button>
        </Popconfirm>
      </Space>
      <AddRoleModal open={isAddOpen} setIsOpen={setIsAddOpen} permissionList={permissionList} />
    </div>
  );
};

export default RoleAction;
