import { Input, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getUserList } from '@/services/user';
import Query from '@/components/Query';
import PageContent from '@/components/PageContent';
import { getRoles } from '@/services/role';
import { useTranslation } from 'react-i18next';
import Add from './components/Add';
import ResetPassword from './components/ResetPassword';
import BatchDelete from './components/BatchDelete';
import Edit from './components/Edit';
import Delete from './components/Delete';
import type { Key } from 'antd/es/table/interface';
import { getDictionarys } from '@/services/dictionary';
import { userStatusTagColor } from '@/config/statusTagConfig';
import PageWrapper from '@/components/PageWrapper';

type QueryParams = {
  username?: string;
  phone?: string;
  email?: string;
};

const User: React.FC = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<API.PageInfo<API.UserInfo[]>>();
  const [roleData, setRoleData] = useState<API.RoleInfo[]>([]);
  const [userStatusData, setUserStatusData] = useState<API.DictionaryInfo[]>([]);
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const userRes = await getUserList();
      const roleRes = await getRoles();
      const userStatusDataRes = await getDictionarys({ dictName: 'user_status' });
      if (!userRes.data || !roleRes.data || !userStatusDataRes.data) {
        return;
      }
      setUserData(userRes.data);
      setRoleData(roleRes.data);
      setUserStatusData(userStatusDataRes.data);
      setLoading(false);
    })();
  }, []);

  const tableColumns: ColumnsType<API.UserInfo> = [
    {
      title: t('pages.user.username'),
      dataIndex: 'username',
      align: 'center'
    },
    {
      title: t('pages.user.nickname'),
      dataIndex: 'nickname',
      align: 'center'
    },
    {
      title: t('pages.user.userStatus'),
      dataIndex: 'userStatus',
      align: 'center',
      render: (_text, record) => {
        if (!record.userStatus) {
          return null;
        }
        const status = record.userStatus.itemText;
        const tagColor = userStatusTagColor.filter(
          (item) => record.userStatus.itemValue === item.value
        )[0].color;
        return <Tag color={tagColor}>{status}</Tag>;
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
      fixed: 'right',
      render: (_text, record) => {
        // 处理roles对象数组,只保留角色id
        const roles = record?.roles && record.roles.map((item) => item.id);
        const { id, username, nickname, userStatus, phone, avatar, email } = record;
        const data = {
          id,
          username,
          nickname,
          userStatus: userStatus.itemValue,
          phone,
          avatar,
          email,
          roles,
          roleList: roleData,
          userStatusList: userStatusData
        };
        // 传入的data属性名必须和编辑表单中Form.Item的name属性值保持一致,初始数据才能赋值上
        return (
          <Space>
            <Edit userData={data} setUserData={setUserData} />
            <Delete selectId={id} setUserData={setUserData} />
          </Space>
        );
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

  const clearSelectData = () => {
    setSelectKeys([]);
  };

  const queryData = async (params?: API.UserPageQuery) => {
    const res = await getUserList(params);
    if (!res.data) {
      return;
    }
    setUserData(res.data);
  };

  const handleQuery = (values: QueryParams) => {
    // 获取查询数据
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[]) => {
    return userData?.records ? userData.records.filter((item) => keys.indexOf(item.id) >= 0) : [];
  };

  return (
    <PageWrapper>
      <Query queryFields={queryFields} onQuery={handleQuery} onReset={handleReset} />
      <PageContent>
        <Space style={{ width: '100%', marginBottom: '10px' }}>
          <Add roleData={roleData} userStatus={userStatusData} setUserData={setUserData} />
          <ResetPassword selectData={getSelectData(selectKeys)} clearSelectData={clearSelectData} />
          <BatchDelete selectData={getSelectData(selectKeys)} setUserData={setUserData} />
        </Space>
        <Table
          bordered
          columns={tableColumns}
          dataSource={userData?.records}
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
            total: userData?.total,
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

export default User;
