import { type FormItemProps, Input, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getRoleList, getRoleOptions } from '@/services/role';
import { useTranslation } from 'react-i18next';
import Add from './components/Add';
import Delete from './components/Delete';
import Edit from './components/Edit';
import PageWrapper from '@/components/PageWrapper';
import type { Key } from 'antd/es/table/interface';
import View from './components/View';
import styles from './index.module.less';
import TablePro from '@/components/TablePro';
import { roleStatusTagColor } from '@/config/statusTagConfig';

const Role: React.FC = () => {
  const { t } = useTranslation();
  const [roleData, setRoleData] = useState<API.Page<API.RoleInfo[]>>();
  const [optionsData, setOptionsData] = useState<API.RoleOptions>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const roleRes = await getRoleList();
      const optionsRes = await getRoleOptions();
      if (!roleRes.data || !optionsRes.data) {
        return;
      }
      setRoleData(roleRes.data);
      setOptionsData(optionsRes.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setSelectKeys([]);
  }, [roleData]);

  const tableColumns: ColumnsType<API.RoleInfo> = [
    {
      title: t('pages.role.code'),
      dataIndex: 'code',
      align: 'center'
    },
    {
      title: t('pages.role.name'),
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: t('pages.role.roleStatus'),
      dataIndex: 'roleStatus',
      align: 'center',
      render: (_text, record) => {
        const status = record.roleStatus.dictLabel;
        const tagColor = roleStatusTagColor.filter(
          (item) => record.roleStatus.dictValue === item.value
        )[0].color;
        return <Tag color={tagColor}>{status}</Tag>;
      }
    },
    {
      title: t('pages.role.createUser'),
      dataIndex: 'createUser',
      align: 'center',
      render: (_text, record) => record.createUser.name
    },
    {
      title: t('pages.role.updateUser'),
      dataIndex: 'updateUser',
      align: 'center',
      render: (_text, record) => record.updateUser.name
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

  const queryItems: FormItemProps[] = [
    {
      label: t('pages.role.queryForm.code'),
      name: 'code',
      children: <Input placeholder={t('pages.role.queryForm.code.placeholder')} />
    },
    {
      label: t('pages.role.queryForm.name'),
      name: 'name',
      children: <Input placeholder={t('pages.role.queryForm.name.placeholder')} />
    }
  ];

  const queryData = async (params?: API.RoleQuery) => {
    const res = await getRoleList(params);
    if (!res.data) {
      return;
    }
    setRoleData(res.data);
  };

  const handleQuery = (values: API.RoleQuery) => {
    // 获取查询数据
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[]) => {
    return roleData?.records ? roleData.records.filter((item) => keys.indexOf(item.id) >= 0) : [];
  };

  const actions: React.ReactNode[] = [
    <Add optionsData={optionsData} setRoleData={setRoleData} />,
    <Edit data={getSelectData(selectKeys)} optionsData={optionsData} setRoleData={setRoleData} />,
    <View data={getSelectData(selectKeys)} optionsData={optionsData} />,
    <Delete data={getSelectData(selectKeys)} setRoleData={setRoleData} />
  ];

  return (
    <PageWrapper className={styles['container']}>
      <TablePro
        queryItems={queryItems}
        queryForm={{
          name: 'roleQuery',
          layout: 'inline',
          onFinish: handleQuery,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 }
        }}
        actions={actions}
        queryTable={{
          bordered: true,
          columns: tableColumns,
          dataSource: roleData?.records,
          loading: loading,
          size: 'small',
          rowSelection: {
            type: 'checkbox',
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
            selectedRowKeys: selectKeys,
            onChange: (selectedRowKeys) => {
              setSelectKeys(selectedRowKeys);
            }
          },
          onRow: (record) => ({
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
          }),
          rowKey: (record) => record.id, // 设置每条记录的id为rowKey
          scroll: { x: 'max-content' },
          pagination: {
            current: roleData?.current,
            defaultPageSize: 10,
            total: roleData?.total,
            showSizeChanger: true,
            showTotal: (total, range) =>
              t('common.table.footer', { start: range[0], end: range[1], total: total }),
            onChange: (page, pageSize) => {
              queryData({ pageNum: page, pageSize: pageSize });
            }
          }
        }}
        onReset={handleReset}
      />
    </PageWrapper>
  );
};

export default Role;
