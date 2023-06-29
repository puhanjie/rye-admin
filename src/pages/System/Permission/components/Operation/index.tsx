import { Button, Popconfirm, Space, message } from 'antd';
import { useState } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AddPermissionModal from '../AddPermissionModal';

type Props = {
  className?: string;
};

const Operation: React.FC<Props> = ({ className }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className={className}>
      <Space style={{ width: '100%', marginBottom: '10px' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddOpen(true)}>
          新增
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
      <AddPermissionModal open={isAddOpen} setIsOpen={setIsAddOpen} />
    </div>
  );
};

export default Operation;
