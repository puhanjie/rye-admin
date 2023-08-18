import PageContent from '@/components/PageContent';
import Query from '@/components/Query';
import { Input, Space, Table, TreeSelect } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getPermissionList } from '@/services/permission';
import { useTranslation } from 'react-i18next';
import Add from './components/Add';
import BatchDelete from './components/BatchDelete';
import Edit from './components/Edit';
import Delete from './components/Delete';
import { getMenuTree } from '@/utils/general';
import routeConfig from '@/router';
import PageWrapper from '@/components/PageWrapper';

type QueryParams = {
  name?: string;
  info?: string;
  menu?: string;
};

export type TablePermissionInfo = {
  key?: number;
} & API.PermissionInfo;

const Permission: React.FC = () => {
  const { t } = useTranslation();
  const [permissionData, setPermissionData] = useState<API.PageInfo<TablePermissionInfo[]>>();
  const [selectData, setSelectData] = useState<TablePermissionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const filterRoute = routeConfig.filter((item) => item.path === '/')[0].children;
  const menuData = filterRoute ? filterRoute.filter((item) => item.name !== 'home') : [];

  useEffect(() => {
    (async () => {
      const permissionDataRes = await getPermissionList();
      if (!permissionDataRes.data) {
        return;
      }
      const permissionData: API.PageInfo<TablePermissionInfo[]> = {
        records: permissionDataRes.data.records.map((item) => ({ key: item.id, ...item })),
        total: permissionDataRes.data.total,
        size: permissionDataRes.data.size,
        current: permissionDataRes.data.current,
        pages: permissionDataRes.data.pages
      };
      setPermissionData(permissionData);
      setLoading(false);
    })();
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
      align: 'center',
      render: (_text, record) => t(`menu.${record.menu}`)
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
      fixed: 'right',
      render: (_text, record) => {
        const { id, name, info, menu } = record;
        const data = { id, name, info, menu };
        return (
          <Space>
            <Edit permissionData={data} setPermissionData={setPermissionData} />
            <Delete selectId={id} setPermissionData={setPermissionData} />
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
      label: t('pages.permission.queryForm.menu'),
      name: 'menu',
      render: (
        <TreeSelect
          treeData={getMenuTree(menuData)}
          allowClear
          showCheckedStrategy="SHOW_CHILD"
          placeholder={t('pages.permission.queryForm.menu.placeholder')}
        />
      )
    }
  ];

  const queryData = async (params?: API.PermissionPageQuery) => {
    const res = await getPermissionList(params);
    if (res.data) {
      const data: API.PageInfo<TablePermissionInfo[]> = {
        records: res.data.records.map((item) => ({ key: item.id, ...item })),
        total: res.data.total,
        size: res.data.size,
        current: res.data.current,
        pages: res.data.pages
      };
      setPermissionData(data);
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
    <PageWrapper>
      <Query queryFields={queryFields} onQuery={handleQuery} onReset={handleReset} />
      <PageContent>
        <Space style={{ width: '100%', marginBottom: '10px' }}>
          <Add setPermissionData={setPermissionData} />
          <BatchDelete selectData={selectData} setPermissionData={setPermissionData} />
        </Space>
        <Table
          bordered
          columns={tableColumns}
          dataSource={permissionData?.records}
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
            total: permissionData?.total,
            showSizeChanger: true,
            showTotal: (total, range) =>
              t('common.table.footer', { start: range[0], end: range[1], total: total }),
            onChange: (page, pageSize) => {
              queryData({ pageNum: page, pageSize: pageSize });
            }
          }}
        />
      </PageContent>
    </PageWrapper>
  );
};

export default Permission;
