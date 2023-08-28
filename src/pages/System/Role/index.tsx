import Query from '@/components/Query';
import { Card, Input, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getRoleList } from '@/services/role';
import { getPermissions } from '@/services/permission';
import { useTranslation } from 'react-i18next';
import Add from './components/Add';
import Delete from './components/Delete';
import Edit from './components/Edit';
import PageWrapper from '@/components/PageWrapper';
import { Key } from 'antd/es/table/interface';
import View from './components/View';
import styles from './index.module.less';

type QueryParams = {
  name?: string;
  info?: string;
};

export type RoleDetail = {
  selectData: API.RoleInfo[];
  permissionList: API.PermissionInfo[];
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

  const getDetail = () => {
    const data: RoleDetail = {
      selectData: getSelectData(selectKeys),
      permissionList: permissionData
    };
    return data;
  };

  return (
    <PageWrapper className={styles['container']}>
      <Query queryFields={queryFields} onQuery={handleQuery} onReset={handleReset} />
      <Card bordered={false} className={styles['content']}>
        <Space style={{ width: '100%', marginBottom: '10px' }}>
          <Add permissionData={permissionData} setRoleData={setRoleData} />
          <Edit data={getDetail()} setRoleData={setRoleData} />
          <View data={getDetail()} />
          <Delete selectData={getSelectData(selectKeys)} setRoleData={setRoleData} />
        </Space>
        <Table
          bordered
          columns={tableColumns}
          dataSource={roleData?.records}
          loading={loading}
          size="small"
          rowSelection={{
            type: 'checkbox',
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
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
      </Card>
    </PageWrapper>
  );
};

export default Role;
