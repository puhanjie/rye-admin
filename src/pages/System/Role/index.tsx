import PageContainer from '@/components/PageContainer';
import Query from '@/components/Query';
import { Input, Table } from 'antd';
import RoleAction from './components/RoleAction';
import RoleTableAction from './components/RoleTableAction';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getToken } from '@/utils/auth';
import { getRoleList } from '@/services/role';
import { getPermissionList } from '@/services/permission';

type QueryParams = {
  name?: string;
  info?: string;
};

type TableRoleInfo = {
  key?: number;
} & API.RoleInfo;

const Role: React.FC = () => {
  const [tableData, setTableData] = useState<API.PageInfo<API.RoleInfo[]>>();
  const [permissionData, setPermissionData] = useState<API.PermissionInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      (async () => {
        const permissions = await getPermissionList();
        const rolePages = await getRoleList();
        if (rolePages?.data && permissions?.data) {
          const roleData: TableRoleInfo[] = rolePages.data.records.map((item) => {
            return { key: item.id, ...item };
          });
          const tablePages: API.PageInfo<API.RoleInfo[]> = {
            records: roleData,
            total: rolePages.data.total,
            size: rolePages.data.size,
            current: rolePages.data.current,
            pages: rolePages.data.pages
          };
          setTableData(tablePages);
          setPermissionData(permissions.data.records);
          setLoading(false);
        }
      })();
    }
  }, []);

  const tableColumns: ColumnsType<TableRoleInfo> = [
    {
      title: '角色名',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '角色信息',
      dataIndex: 'info',
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
        // 处理permissions对象数组，只保留权限id
        const permissions =
          record?.permissions && record.permissions.map((item) => item.id.toString());
        const { id, name, info } = record;
        const data = { id, name, info, permissions, permissionList: permissionData };
        return <RoleTableAction data={data} />;
      }
    }
  ];

  const queryFields: QueryField[] = [
    {
      label: '角色名',
      name: 'name',
      render: <Input placeholder="请输入角色名" />
    },
    {
      label: '角色信息',
      name: 'info',
      render: <Input placeholder="请输入角色信息" />
    }
  ];

  const handleQuery = (values: QueryParams) => {
    console.log(values);
    // 获取查询数据
  };

  return (
    <PageContainer>
      <Query queryFields={queryFields} onQuery={handleQuery} />
      <RoleAction permissionList={permissionData} />
      <Table
        bordered
        columns={tableColumns}
        dataSource={tableData?.records}
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
          total: tableData?.total,
          showSizeChanger: true,
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`
        }}
      />
    </PageContainer>
  );
};

export default Role;
