import PageContent from '@/components/PageContent';
import Query from '@/components/Query';
import { Input, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getRoleList } from '@/services/role';
import { getPermissions } from '@/services/permission';
import { useTranslation } from 'react-i18next';
import Add from './components/Add';
import BatchDelete from './components/BatchDelete';
import Edit from './components/Edit';
import Delete from './components/Delete';
import PageWrapper from '@/components/PageWrapper';

type QueryParams = {
  name?: string;
  info?: string;
};

export type TableRoleInfo = {
  key?: number;
} & API.RoleInfo;

const Role: React.FC = () => {
  const { t } = useTranslation();
  const [roleData, setRoleData] = useState<API.PageInfo<TableRoleInfo[]>>();
  const [permissionData, setPermissionData] = useState<API.PermissionInfo[]>([]);
  const [selectData, setSelectData] = useState<TableRoleInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const roleDataRes = await getRoleList();
      const permissionDataRes = await getPermissions();
      if (!roleDataRes.data || !permissionDataRes.data) {
        return;
      }
      const roleData: API.PageInfo<API.RoleInfo[]> = {
        records: roleDataRes.data.records.map((item) => ({ key: item.id, ...item })),
        total: roleDataRes.data.total,
        size: roleDataRes.data.size,
        current: roleDataRes.data.current,
        pages: roleDataRes.data.pages
      };
      setRoleData(roleData);
      setPermissionData(permissionDataRes.data);
      setLoading(false);
    })();
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
      fixed: 'right',
      render: (_text, record) => {
        // 处理permissions对象数组,只保留权限id
        const permissions =
          record?.permissions && record.permissions.map((item) => item.id.toString());
        const { id, name, info } = record;
        const data = { id, name, info, permissions, permissionList: permissionData };
        return (
          <Space>
            <Edit roleData={data} setRoleData={setRoleData} />
            <Delete selectId={id} setRoleData={setRoleData} />
          </Space>
        );
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

  const queryData = async (params?: API.PermissionPageQuery) => {
    const res = await getRoleList(params);
    if (res.data) {
      const data: API.PageInfo<TableRoleInfo[]> = {
        records: res.data.records.map((item) => ({ key: item.id, ...item })),
        total: res.data.total,
        size: res.data.size,
        current: res.data.current,
        pages: res.data.pages
      };
      setRoleData(data);
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
          <Add permissionData={permissionData} setRoleData={setRoleData} />
          <BatchDelete selectData={selectData} setRoleData={setRoleData} />
        </Space>
        <Table
          bordered
          columns={tableColumns}
          dataSource={roleData?.records}
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
            total: roleData?.total,
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

export default Role;
