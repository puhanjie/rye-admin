import PageContainer from '@/components/PageContainer';
import Query from '@/components/Query';
import { Input, Table } from 'antd';
import PermissionAction from './components/PermissionAction';
import type { ColumnsType } from 'antd/es/table';
import PermissionTableAction from './components/PermissionTableAction';
import { useEffect, useState } from 'react';
import { getToken } from '@/utils/auth';
import { getPermissionList } from '@/services/permission';
import { useTranslation } from 'react-i18next';

type QueryParams = {
  name?: string;
  info?: string;
  menuName?: string;
};

type TablePermissionInfo = {
  key?: number;
} & API.PermissionInfo;

const Permission: React.FC = () => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState<API.PageInfo<API.PermissionInfo[]>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      (async () => {
        const permissionPages = await getPermissionList();
        if (permissionPages?.data) {
          const permissionData: TablePermissionInfo[] = permissionPages.data.records.map((item) => {
            return { key: item.id, ...item };
          });
          const tablePages: API.PageInfo<API.PermissionInfo[]> = {
            records: permissionData,
            total: permissionPages.data.total,
            size: permissionPages.data.size,
            current: permissionPages.data.current,
            pages: permissionPages.data.pages
          };
          setTableData(tablePages);
          setLoading(false);
        }
      })();
    }
  }, []);

  const tableColumns: ColumnsType<TablePermissionInfo> = [
    {
      title: t('pages.permission.name'),
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: t('pages.permission.info'),
      dataIndex: 'info',
      align: 'center'
    },
    {
      title: t('pages.permission.menu'),
      dataIndex: 'menu',
      align: 'center'
    },
    {
      title: t('pages.permission.menuName'),
      dataIndex: 'menuName',
      align: 'center'
    },
    {
      title: t('pages.permission.createTime'),
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: t('pages.permission.updateTime'),
      dataIndex: 'updateTime',
      align: 'center'
    },
    {
      title: t('pages.permission.action'),
      dataIndex: 'action',
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
      label: t('pages.permission.queryForm.name'),
      name: 'name',
      render: <Input placeholder={t('pages.permission.queryForm.name.placeholder')} />
    },
    {
      label: t('pages.permission.queryForm.info'),
      name: 'info',
      render: <Input placeholder={t('pages.permission.queryForm.info.placeholder')} />
    },
    {
      label: t('pages.permission.queryForm.menuName'),
      name: 'menuName',
      render: <Input placeholder={t('pages.permission.queryForm.menuName.placeholder')} />
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

export default Permission;
