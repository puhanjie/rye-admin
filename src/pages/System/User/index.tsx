import { type FormItemProps, Input, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getUserList, getUserOptions } from '@/services/user';
import { useTranslation } from 'react-i18next';
import Add from './components/Add';
import ResetPassword from './components/ResetPassword';
import Delete from './components/Delete';
import Edit from './components/Edit';
import type { Key } from 'antd/es/table/interface';
import { userStatusTagColor } from '@/config/statusTagConfig';
import PageWrapper from '@/components/PageWrapper';
import View from './components/View';
import styles from './index.module.less';
import TablePro from '@/components/TablePro';

const User: React.FC = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<API.Page<API.UserInfo[]>>();
  const [optionsData, setOptionsData] = useState<API.UserOptions>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const userRes = await getUserList();
      const optionsRes = await getUserOptions();
      if (!userRes.data || !optionsRes.data) {
        return;
      }
      setUserData(userRes.data);
      setOptionsData(optionsRes.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setSelectKeys([]);
  }, [userData]);

  const tableColumns: ColumnsType<API.UserInfo> = [
    {
      title: t('pages.user.department'),
      dataIndex: 'department',
      align: 'center',
      render: (_text, record) => record.department.name
    },
    {
      title: t('pages.user.username'),
      dataIndex: 'username',
      align: 'center'
    },
    {
      title: t('pages.user.name'),
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: t('pages.user.sex'),
      dataIndex: 'sex',
      align: 'center',
      render: (_text, record) => record.sex.dictLabel
    },
    {
      title: t('pages.user.userStatus'),
      dataIndex: 'userStatus',
      align: 'center',
      render: (_text, record) => {
        const status = record.userStatus.dictLabel;
        const tagColor = userStatusTagColor.filter(
          (item) => record.userStatus.dictValue === item.value
        )[0].color;
        return <Tag color={tagColor}>{status}</Tag>;
      }
    },
    {
      title: t('pages.user.post'),
      dataIndex: 'posts',
      align: 'center',
      render: (_text, record) => {
        if (!record.posts) {
          return null;
        }
        return record.posts.map((item, index) => <Tag key={index}>{item.name}</Tag>);
      }
    },
    {
      title: t('pages.user.role'),
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
      title: t('pages.user.phone'),
      dataIndex: 'phone',
      align: 'center'
    },
    {
      title: t('pages.user.email'),
      dataIndex: 'email',
      align: 'center'
    },
    {
      title: t('pages.user.createUser'),
      dataIndex: 'createUser',
      align: 'center',
      render: (_text, record) => record.createUser.name
    },
    {
      title: t('pages.user.updateUser'),
      dataIndex: 'updateUser',
      align: 'center',
      render: (_text, record) => record.updateUser.name
    },
    {
      title: t('pages.user.createTime'),
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: t('pages.user.updateTime'),
      dataIndex: 'updateTime',
      align: 'center'
    }
  ];

  const queryItems: FormItemProps[] = [
    {
      label: t('pages.user.queryForm.username'),
      name: 'username',
      children: <Input placeholder={t('pages.user.queryForm.username.placeholder')} />
    },
    {
      label: t('pages.user.queryForm.name'),
      name: 'name',
      children: <Input placeholder={t('pages.user.queryForm.name.placeholder')} />
    },
    {
      label: t('pages.user.queryForm.phone'),
      name: 'phone',
      children: <Input placeholder={t('pages.user.queryForm.phone.placeholder')} />
    },
    {
      label: t('pages.user.queryForm.email'),
      name: 'email',
      children: <Input placeholder={t('pages.user.queryForm.email.placeholder')} />
    }
  ];

  const clearSelectData = () => {
    setSelectKeys([]);
  };

  const queryData = async (params?: API.UserQuery) => {
    const res = await getUserList(params);
    if (!res.data) {
      return;
    }
    setUserData(res.data);
  };

  const handleQuery = (values: API.UserQuery) => {
    // 获取查询数据
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[]) => {
    return userData?.records ? userData.records.filter((item) => keys.indexOf(item.id) >= 0) : [];
  };

  const actions: React.ReactNode[] = [
    <Add optionsData={optionsData} setUserData={setUserData} />,
    <Edit data={getSelectData(selectKeys)} optionsData={optionsData} setUserData={setUserData} />,
    <View data={getSelectData(selectKeys)} />,
    <ResetPassword data={getSelectData(selectKeys)} clearSelectData={clearSelectData} />,
    <Delete data={getSelectData(selectKeys)} setUserData={setUserData} />
  ];

  return (
    <PageWrapper className={styles['container']}>
      <TablePro
        queryItems={queryItems}
        queryForm={{
          name: 'userQuery',
          layout: 'inline',
          onFinish: handleQuery,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 }
        }}
        actions={actions}
        queryTable={{
          bordered: true,
          columns: tableColumns,
          dataSource: userData?.records,
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
            current: userData?.current,
            defaultPageSize: 10,
            total: userData?.total,
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

export default User;
