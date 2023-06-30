import { Button, Popconfirm, Space, message } from 'antd';
import { useState } from 'react';
import { DeleteOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import AddUserModal from '../AddUserModal';
import ResetPasswordModal from '../ResetPasswordModal';

type Props = {
  className?: string;
  roleList: API.RoleInfo[];
};

const UserAction: React.FC<Props> = ({ className, roleList }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  return (
    <div className={className}>
      <Space style={{ width: '100%', marginBottom: '10px' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddOpen(true)}>
          新增
        </Button>
        <Button icon={<ReloadOutlined />} onClick={() => setIsResetOpen(true)}>
          重置密码
        </Button>
        <Popconfirm
          title="批量删除提醒"
          description="是否删除选中记录?"
          onConfirm={() => {
            message.success('Click on Yes');
          }}
          onCancel={() => {
            message.error('Click on No');
          }}
          okText="是"
          cancelText="否"
        >
          <Button danger icon={<DeleteOutlined />}>
            批量删除
          </Button>
        </Popconfirm>
      </Space>
      <AddUserModal open={isAddOpen} setIsOpen={setIsAddOpen} roleList={roleList} />
      <ResetPasswordModal open={isResetOpen} setIsOpen={setIsResetOpen} />
    </div>
  );
};

export default UserAction;
