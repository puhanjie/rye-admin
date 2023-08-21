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
import { Key } from 'antd/es/table/interface';

type QueryParams = {
  name?: string;
  info?: string;
  menu?: string;
};

const Permission: React.FC = () => {
  const { t } = useTranslation();
  const [permissionData, setPermissionData] = useState<API.PageInfo<API.PermissionInfo[]>>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  useEffect(() => {
    (async () => {
      const permissionRes = await getPermissionList();
      if (!permissionRes.data) {
        return;
      }
      setPermissionData(permissionRes.data);
      setLoading(false);
    })();
  }, []);

  const tableColumns: ColumnsType<API.PermissionInfo> = [
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
    if (!res.data) {
      return;
    }
    setPermissionData(res.data);
  };

  const handleQuery = (values: QueryParams) => {
    // 获取查询数据
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[]) => {
    return permissionData?.records
      ? permissionData.records.filter((item) => keys.indexOf(item.id) >= 0)
      : [];
  };

  return (
    <PageWrapper>
      <Query queryFields={queryFields} onQuery={handleQuery} onReset={handleReset} />
      <PageContent>
        <Space style={{ width: '100%', marginBottom: '10px' }}>
          <Add setPermissionData={setPermissionData} />
          <BatchDelete
            selectData={getSelectData(selectKeys)}
            setPermissionData={setPermissionData}
          />
        </Space>
        <Table
          bordered
          columns={tableColumns}
          dataSource={permissionData?.records}
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
