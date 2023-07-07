import { Input, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getUserList } from '@/services/user';
import UserTableAction from './components/UserTableAction';
import UserAction from './components/UserAction';
import Query from '@/components/Query';
import PageContainer from '@/components/PageContainer';
import { getRoleList } from '@/services/role';

type QueryParams = {
  username?: string;
  phone?: string;
  email?: string;
};

export type TableUserInfo = {
  key?: number;
} & API.UserInfo;

const User: React.FC = () => {
  const [tableData, setTableData] = useState<TableUserInfo[]>([]);
  const [roleData, setRoleData] = useState<API.RoleInfo[]>([]);
  const [selectedData, setSelectData] = useState<TableUserInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const roles = await getRoleList();
      const users = await getUserList();
      if (users?.data && roles?.data) {
        const tableData: TableUserInfo[] = users.data.map((item) => {
          return { key: item.id, ...item };
        });
        setTableData(tableData);
        setRoleData(roles.data);
        setLoading(false);
      }
    })();
  }, []);

  const tableColumns: ColumnsType<TableUserInfo> = [
    {
      title: '用户名',
      dataIndex: 'username',
      align: 'center'
    },
    {
      title: '角色',
      align: 'center',
      render: (_text, record) => {
        if (!record?.roles) {
          return;
        }
        return record.roles.map((item, index) => <Tag key={index}>{item.info}</Tag>);
      }
    },
    {
      title: '手机',
      dataIndex: 'phone',
      align: 'center'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'operation',
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
      label: '用户名',
      name: 'username',
      render: <Input placeholder="请输入用户名" />
    },
    {
      label: '手机',
      name: 'phone',
      render: <Input placeholder="请输入手机号" />
    },
    {
      label: '邮箱',
      name: 'email',
      render: <Input placeholder="请输入邮箱" />
    }
  ];

  const handleQuery = (values: QueryParams) => {
    console.log(values);
    // 获取查询数据
  };

  return (
    <PageContainer>
      <Query queryFields={queryFields} onQuery={handleQuery} />
      <UserAction roleList={roleData} selectedData={selectedData} />
      <Table
        bordered
        columns={tableColumns}
        dataSource={tableData}
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
          total: tableData.length,
          showSizeChanger: true,
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`
        }}
      />
    </PageContainer>
  );
};

export default User;
