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
import { Key } from 'antd/es/table/interface';

type QueryParams = {
  name?: string;
  info?: string;
};

const Role: React.FC = () => {
  const { t } = useTranslation();
  const [roleData, setRoleData] = useState<API.PageInfo<API.RoleInfo[]>>();
  const [permissionData, setPermissionData] = useState<API.PermissionInfo[]>([]);
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const roleRes = await getRoleList();
      const permissionRes = await getPermissions();
      if (!roleRes.data || !permissionRes.data) {
        return;
      }
      setRoleData(roleRes.data);
      setPermissionData(permissionRes.data);
      setLoading(false);
    })();
  }, []);

  const tableColumns: ColumnsType<API.RoleInfo> = [
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
    if (!res.data) {
      return;
    }
    setRoleData(res.data);
  };

  const handleQuery = (values: QueryParams) => {
    // 获取查询数据
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[]) => {
    return roleData?.records ? roleData.records.filter((item) => keys.indexOf(item.id) >= 0) : [];
  };

  return (
    <PageWrapper>
      <Query queryFields={queryFields} onQuery={handleQuery} onReset={handleReset} />
      <PageContent>
        <Space style={{ width: '100%', marginBottom: '10px' }}>
          <Add permissionData={permissionData} setRoleData={setRoleData} />
          <BatchDelete selectData={getSelectData(selectKeys)} setRoleData={setRoleData} />
        </Space>
        <Table
          bordered
          columns={tableColumns}
          dataSource={roleData?.records}
          loading={loading}
          size="small"
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectKeys,
            onChange: (selectedRowKeys) => {
              setSelectKeys(selectedRowKeys);
            }
          }}
          onRow={(record) => ({
            onClick: () => {
              if (selectKeys.indexOf(record.id) < 0) {
                // 添加选中数据
                const keys = selectKeys.concat();
                keys.push(record.id);
                setSelectKeys(keys);
              } else {
                // 清除选中数据
                const keys = selectKeys.filter((item) => item !== record.id);
                setSelectKeys(keys);
              }
            }
          })}
          rowKey={(record) => record.id} // 设置每条记录的id为rowKey
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
