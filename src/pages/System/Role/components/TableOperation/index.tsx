import { Divider, Popconfirm, Space, message } from 'antd';
import { useState } from 'react';
import EditRoleModal, { type EditRoleInfo } from '../EditRoleModal';

type Props = {
  data: EditRoleInfo;
};

const TableOperation: React.FC<Props> = ({ data }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div>
      <Space split={<Divider type="vertical" style={{ margin: '0 1px' }} />}>
        <a
          type="link"
          onClick={() => {
            setIsEditOpen(true);
          }}
        >
          编辑
        </a>
        <Popconfirm
          title="删除提醒"
          description="是否删除当前记录?"
          onConfirm={() => {
            message.success('Click on Yes');
          }}
          onCancel={() => {
            message.error('Click on No');
          }}
          okText="是"
          cancelText="否"
        >
          <a>删除</a>
        </Popconfirm>
      </Space>
      <EditRoleModal initData={data} open={isEditOpen} setIsOpen={setIsEditOpen} />
    </div>
  );
};

export default TableOperation;
