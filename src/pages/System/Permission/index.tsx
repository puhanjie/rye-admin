import PageContainer from '@/components/PageContainer';
import Query from '@/components/Query';
import { Input, Table } from 'antd';
import PermissionAction from './components/PermissionAction';
import type { ColumnsType } from 'antd/es/table';
import PermissionTableAction from './components/PermissionTableAction';
import { useEffect, useState } from 'react';
import { getToken } from '@/utils/auth';
import { getPermissionList } from '@/services/permission';

type QueryParams = {
  name?: string;
  info?: string;
  menuName?: string;
};

type TablePermissionInfo = {
  key?: number;
} & API.PermissionInfo;

const Permission: React.FC = () => {
  const [data, setData] = useState<API.PermissionInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      (async () => {
        const res = await getPermissionList();
        if (res?.data) {
          const data: TablePermissionInfo[] = res.data.map((item) => {
            return { key: item.id, ...item };
          });
          setData(data);
          setLoading(false);
        }
      })();
    }
  }, []);

  const tableColumns: ColumnsType<TablePermissionInfo> = [
    {
      title: '权限名',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '权限信息',
      dataIndex: 'info',
      align: 'center'
    },
    {
      title: '菜单',
      dataIndex: 'menu',
      align: 'center'
    },
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      render: (_text, record) => {
        const { id, name, info, menu, menuName } = record;
        const data = { id, name, info, menu, menuName };
        return <PermissionTableAction data={data} />;
      }
    }
  ];

  const queryFields: QueryField[] = [
    {
      label: '权限名',
      name: 'name',
      render: <Input placeholder="请输入权限名" />
    },
    {
      label: '权限信息',
      name: 'info',
      render: <Input placeholder="请输入权限信息" />
    },
    {
      label: '菜单',
      name: 'menu',
      render: <Input placeholder="请输入菜单标识" />
    },
    {
      label: '菜单名称',
      name: 'menuName',
      render: <Input placeholder="请输入菜单名称" />
    }
  ];

  const handleQuery = (values: QueryParams) => {
    console.log(values);
    // 获取查询数据
  };

  return (
    <PageContainer>
      <Query queryFields={queryFields} onQuery={handleQuery} />
      <PermissionAction />
      <Table
        bordered
        columns={tableColumns}
        dataSource={data}
        loading={loading}
        size="small"
        rowSelection={{
          type: 'checkbox',
          onChange: (_selectedRowKeys, selectedRows) => {
            console.log(selectedRows);
          }
        }}
        scroll={{ x: 'max-content' }}
        pagination={{
          defaultPageSize: 10,
          total: data.length,
          showSizeChanger: true,
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`
        }}
      />
    </PageContainer>
  );
};

export default Permission;
