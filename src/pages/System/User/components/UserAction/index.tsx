import { Button, Popconfirm, Space, message } from 'antd';
import { useState } from 'react';
import { DeleteOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import AddUserModal from '../AddUserModal';
import ResetPasswordModal from '../ResetPasswordModal';
import type { TableUserInfo } from '../..';
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string;
  roleList: API.RoleInfo[];
  selectedData: TableUserInfo[];
};

const UserAction: React.FC<Props> = ({ className, roleList, selectedData }) => {
  const { t } = useTranslation();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const handleReset = () => {
    if (selectedData.length !== 1) {
      message.warning(t('common.tip.selectOne'));
      return;
    }
    setIsResetOpen(true);
  };

  return (
    <div className={className}>
      <Space style={{ width: '100%', marginBottom: '10px' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddOpen(true)}>
          {t('pages.user.add')}
        </Button>
        <Button icon={<ReloadOutlined />} onClick={handleReset}>
          {t('pages.user.resetPassword')}
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
            {t('pages.user.batchDelete')}
          </Button>
        </Popconfirm>
      </Space>
      <AddUserModal open={isAddOpen} setIsOpen={setIsAddOpen} roleList={roleList} />
      {selectedData.length === 1 && (
        <ResetPasswordModal
          open={isResetOpen}
          setIsOpen={setIsResetOpen}
          selectedData={selectedData}
        />
      )}
    </div>
  );
};

export default UserAction;
