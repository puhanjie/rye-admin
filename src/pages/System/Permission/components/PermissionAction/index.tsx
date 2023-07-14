import { Button, Popconfirm, Space, message } from 'antd';
import { useState } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AddPermissionModal from '../AddPermissionModal';
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string;
};

const PermissionAction: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className={className}>
      <Space style={{ width: '100%', marginBottom: '10px' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddOpen(true)}>
          {t('pages.permission.add')}
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
            {t('pages.permission.batchDelete')}
          </Button>
        </Popconfirm>
      </Space>
      <AddPermissionModal open={isAddOpen} setIsOpen={setIsAddOpen} />
    </div>
  );
};

export default PermissionAction;
