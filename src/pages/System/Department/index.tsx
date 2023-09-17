import { type FormItemProps, Input, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Add from './components/Add';
import Delete from './components/Delete';
import Edit from './components/Edit';
import type { Key } from 'antd/es/table/interface';
import { departmentStatusTagColor } from '@/config/statusTagConfig';
import PageWrapper from '@/components/PageWrapper';
import View from './components/View';
import styles from './index.module.less';
import TablePro from '@/components/TablePro';
import { getDepartmentList, getDepartmentOptions } from '@/services/department';

const Department: React.FC = () => {
  const { t } = useTranslation();
  const [deptData, setDeptData] = useState<API.DepartmentDetailTree[]>();
  const [optionsData, setOptionsData] = useState<API.DepartmentOptions>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [expands, setExpands] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const deptRes = await getDepartmentList();
      const optionsRes = await getDepartmentOptions();
      if (!deptRes.data || !optionsRes.data) {
        return;
      }
      setDeptData(deptRes.data);
      setOptionsData(optionsRes.data);
      // setExpands(getExpandKeys(deptRes.data));
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setExpands(getExpandKeys(deptData));
  }, [deptData]);

  const tableColumns: ColumnsType<API.DepartmentDetailTree> = [
    {
      title: t('pages.department.name'),
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: t('pages.department.code'),
      dataIndex: 'code',
      align: 'center'
    },
    {
      title: t('pages.department.leader'),
      dataIndex: 'leader',
      align: 'center',
      render: (_text, record) => record.leader.name
    },
    {
      title: t('pages.department.deptStatus'),
      dataIndex: 'deptStatus',
      align: 'center',
      render: (_text, record) => {
        const status = record.deptStatus.dictLabel;
        const tagColor = departmentStatusTagColor.filter(
          (item) => record.deptStatus.dictValue === item.value
        )[0].color;
        return <Tag color={tagColor}>{status}</Tag>;
      }
    },
    {
      title: t('pages.department.role'),
      dataIndex: 'roles',
      align: 'center',
      render: (_text, record) => {
        if (!record.roles) {
          return null;
        }
        return record.roles.map((item, index) => <Tag key={index}>{item.name}</Tag>);
      }
    },
    {
      title: t('pages.department.createUser'),
      dataIndex: 'createUser',
      align: 'center',
      render: (_text, record) => record.createUser.name
    },
    {
      title: t('pages.department.updateUser'),
      dataIndex: 'updateUser',
      align: 'center',
      render: (_text, record) => record.updateUser.name
    },
    {
      title: t('pages.department.createTime'),
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: t('pages.department.updateTime'),
      dataIndex: 'updateTime',
      align: 'center'
    }
  ];

  const queryItems: FormItemProps[] = [
    {
      label: t('pages.department.queryForm.code'),
      name: 'code',
      children: <Input placeholder={t('pages.department.queryForm.code.placeholder')} />
    },
    {
      label: t('pages.department.queryForm.name'),
      name: 'name',
      children: <Input placeholder={t('pages.department.queryForm.name.placeholder')} />
    }
  ];

  const queryData = async (params?: API.DepartmentQuery) => {
    const res = await getDepartmentList(params);
    if (!res.data) {
      return;
    }
    setDeptData(res.data);
  };

  const handleQuery = (values: API.DepartmentQuery) => {
    // 获取查询数据
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[], data?: API.DepartmentDetailTree[]) => {
    const selectDatas: API.DepartmentDetailTree[] = [];
    if (!data) {
      return [];
    }
    for (let i = 0; i < data.length; i++) {
      if (keys.indexOf(data[i].id) >= 0) {
        selectDatas.push(data[i]);
      }
      if (data[i].children && data[i].children?.length !== 0) {
        selectDatas.push(...getSelectData(keys, data[i].children));
      }
    }
    return selectDatas;
  };

  const getExpandKeys = (data?: API.DepartmentDetailTree[]) => {
    const expandList: number[] = [];
    if (!data) {
      return [];
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].children && data[i].children?.length !== 0) {
        expandList.push(data[i].id);
        expandList.push(...getExpandKeys(data[i].children));
      }
    }
    return expandList;
  };

  const actions: React.ReactNode[] = [
    <Add optionsData={optionsData} setDeptData={setDeptData} />,
    <Edit
      data={getSelectData(selectKeys, deptData)}
      optionsData={optionsData}
      setDeptData={setDeptData}
    />,
    <View data={getSelectData(selectKeys, deptData)} />,
    <Delete data={getSelectData(selectKeys, deptData)} setDeptData={setDeptData} />
  ];

  return (
    <PageWrapper className={styles['container']}>
      <TablePro
        queryItems={queryItems}
        queryForm={{
          name: 'deptQuery',
          layout: 'inline',
          onFinish: handleQuery,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 }
        }}
        actions={actions}
        queryTable={{
          bordered: true,
          columns: tableColumns,
          dataSource: deptData,
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
            showSizeChanger: true,
            showTotal: (total, range) =>
              t('common.table.footer', { start: range[0], end: range[1], total: total })
          },
          expandable: {
            expandedRowKeys: expands,
            onExpand: (_expanded, record) => {
              if (expands.indexOf(record.id) >= 0) {
                setExpands(expands.filter((item) => item !== record.id));
              } else {
                setExpands([...expands, record.id]);
              }
            }
          }
        }}
        onReset={handleReset}
      />
    </PageWrapper>
  );
};

export default Department;
