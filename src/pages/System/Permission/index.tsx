import PageContainer from '@/components/PageContainer';
import Query from '@/components/Query';
import { Divider, Input, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getToken } from '@/utils/auth';
import { getPermissions } from '@/services/permission';
import { useTranslation } from 'react-i18next';
import Add from './components/Add';
import BatchDelete from './components/BatchDelete';
import Edit from './components/Edit';
import Delete from './components/Delete';

type QueryParams = {
  name?: string;
  info?: string;
  menuName?: string;
};

export type TablePermissionInfo = {
  key?: number;
} & API.PermissionInfo;

const Permission: React.FC = () => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState<API.PageInfo<TablePermissionInfo[]>>();
  const [selectData, setSelectData] = useState<TablePermissionInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      (async () => {
        const permissionPages = await getPermissions();
        if (permissionPages?.data) {
          const permissionData: TablePermissionInfo[] = permissionPages.data.records.map((item) => {
            return { key: item.id, ...item };
          });
          const tablePages: API.PageInfo<TablePermissionInfo[]> = {
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
        return (
          <Space split={<Divider type="vertical" style={{ margin: '0 1px' }} />}>
            <Edit permissionData={data} setPermissionData={setTableData} />
            <Delete selectId={id} setPermissionData={setTableData} />
          </Space>
        );
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

  const queryData = async (params?: API.PermissionPageQuery) => {
    const res = await getPermissions(params);
    if (res.data) {
      const data: API.PageInfo<TablePermissionInfo[]> = {
        records: res.data.records.map((item) => {
          return { key: item.id, ...item };
        }),
        total: res.data.total,
        size: res.data.size,
        current: res.data.current,
        pages: res.data.pages
      };
      setTableData(data);
    }
  };

  const handleQuery = (values: QueryParams) => {
    // 获取查询数据
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  return (
    <PageContainer>
      <Query queryFields={queryFields} onQuery={handleQuery} onReset={handleReset} />
      <Space style={{ width: '100%', marginBottom: '10px' }}>
        <Add setPermissionData={setTableData} />
        <BatchDelete selectData={selectData} setPermissionData={setTableData} />
      </Space>
      <Table
        bordered
        columns={tableColumns}
        dataSource={tableData?.records}
        loading={loading}
        size="small"
        rowSelection={{
          type: 'checkbox',
          onChange: (_selectedRowKeys, selectedRows) => {
            setSelectData(selectedRows);
          }
        }}
        scroll={{ x: 'max-content' }}
        pagination={{
          defaultPageSize: 10,
          total: tableData?.total,
          showSizeChanger: true,
          showTotal: (total, range) =>
            t('common.table.footer', { start: range[0], end: range[1], total: total }),
          onChange: (page, pageSize) => {
            queryData({ pageNum: page, pageSize: pageSize });
          }
        }}
      />
    </PageContainer>
  );
};

export default Permission;
