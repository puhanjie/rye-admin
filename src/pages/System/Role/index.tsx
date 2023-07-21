import PageContainer from '@/components/PageContainer';
import Query from '@/components/Query';
import { Input, Table } from 'antd';
import RoleAction from './components/RoleAction';
import RoleTableAction from './components/RoleTableAction';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getToken } from '@/utils/auth';
import { getRoleList } from '@/services/role';
import { getPermissions } from '@/services/permission';
import { useTranslation } from 'react-i18next';

type QueryParams = {
  name?: string;
  info?: string;
};

type TableRoleInfo = {
  key?: number;
} & API.RoleInfo;

const Role: React.FC = () => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState<API.PageInfo<API.RoleInfo[]>>();
  const [permissionData, setPermissionData] = useState<API.PermissionInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      (async () => {
        const permissions = await getPermissions();
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
          setPermissionData(permissions.data);
          setLoading(false);
        }
      })();
    }
  }, []);

  const tableColumns: ColumnsType<TableRoleInfo> = [
    {
      title: t('pages.role.name'),
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: t('pages.role.info'),
      dataIndex: 'info',
      align: 'center'
    },
    {
      title: t('pages.role.createTime'),
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: t('pages.role.updateTime'),
      dataIndex: 'updateTime',
      align: 'center'
    },
    {
      title: t('pages.role.action'),
      dataIndex: 'action',
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
      label: t('pages.role.queryForm.name'),
      name: 'name',
      render: <Input placeholder={t('pages.role.queryForm.name.placeholder')} />
    },
    {
      label: t('pages.role.queryForm.info'),
      name: 'info',
      render: <Input placeholder={t('pages.role.queryForm.info.placeholder')} />
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
          showTotal: (total, range) =>
            t('common.table.footer', { start: range[0], end: range[1], total: total })
        }}
      />
    </PageContainer>
  );
};

export default Role;
