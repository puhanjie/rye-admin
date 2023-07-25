import { Input, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getUsers } from '@/services/user';
import UserTableAction from './components/UserTableAction';
import UserAction from './components/UserAction';
import Query from '@/components/Query';
import PageContainer from '@/components/PageContainer';
import { getRoleList } from '@/services/role';
import { useTranslation } from 'react-i18next';

type QueryParams = {
  username?: string;
  phone?: string;
  email?: string;
};

export type TableUserInfo = {
  key?: number;
} & API.UserInfo;

const User: React.FC = () => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState<API.PageInfo<API.UserInfo[]>>();
  const [roleData, setRoleData] = useState<API.RoleInfo[]>([]);
  const [selectedData, setSelectData] = useState<TableUserInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const roles = await getRoleList();
      const userPages = await getUsers();
      if (userPages?.data && roles?.data) {
        const userData: TableUserInfo[] = userPages.data.records.map((item) => {
          return { key: item.id, ...item };
        });
        const tablePages: API.PageInfo<TableUserInfo[]> = {
          records: userData,
          total: userPages.data.total,
          size: userPages.data.size,
          current: userPages.data.current,
          pages: userPages.data.pages
        };
        setTableData(tablePages);
        setRoleData(roles.data);
        setLoading(false);
      }
    })();
  }, []);

  const tableColumns: ColumnsType<TableUserInfo> = [
    {
      title: t('pages.user.username'),
      dataIndex: 'username',
      align: 'center'
    },
    {
      title: t('pages.user.role'),
      align: 'center',
      render: (_text, record) => {
        if (!record?.roles) {
          return;
        }
        return record.roles.map((item, index) => <Tag key={index}>{item.info}</Tag>);
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
      title: t('pages.user.createTime'),
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: t('pages.user.updateTime'),
      dataIndex: 'updateTime',
      align: 'center'
    },
    {
      title: t('pages.user.action'),
      dataIndex: 'action',
      align: 'center',
      render: (_text, record) => {
        // 处理roles对象数组，只保留角色id
        const roles = record?.roles && record.roles.map((item) => item.id);
        const { id, username, phone, avatar, email } = record;
        const data = { id, username, phone, avatar, email, roles, roleList: roleData };
        // 传入的data属性名必须和编辑表单中Form.Item的name属性值保持一致，初始数据才能赋值上
        return <UserTableAction data={data} />;
      }
    }
  ];

  const queryFields: QueryField[] = [
    {
      label: t('pages.user.queryForm.username'),
      name: 'username',
      render: <Input placeholder={t('pages.user.queryForm.username.placeholder')} />
    },
    {
      label: t('pages.user.queryForm.phone'),
      name: 'phone',
      render: <Input placeholder={t('pages.user.queryForm.phone.placeholder')} />
    },
    {
      label: t('pages.user.queryForm.email'),
      name: 'email',
      render: <Input placeholder={t('pages.user.queryForm.email.placeholder')} />
    }
  ];

  const queryData = async (params?: API.UserPageQuery) => {
    const res = await getUsers(params);
    if (res.data) {
      const data: API.PageInfo<TableUserInfo[]> = {
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
  }

  return (
    <PageContainer>
      <Query queryFields={queryFields} onQuery={handleQuery} onReset={handleReset} />
      <UserAction roleList={roleData} selectedData={selectedData} />
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

export default User;
