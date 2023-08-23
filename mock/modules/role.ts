import Mock from 'mockjs';
import { url, success } from '../utils';

const roleData = [
  {
    id: 1,
    name: 'admin',
    info: '管理员',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24',
    permissions: [
      {
        id: 1,
        name: 'app:name',
        info: '管理员'
      }
    ]
  },
  {
    id: 2,
    name: 'guest',
    info: '访客',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24',
    permissions: [
      {
        id: 18,
        name: 'settings:view',
        info: '查看'
      }
    ]
  }
];

Mock.mock(url('/api/v1/role'), 'post', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/role'), 'delete', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/role'), 'put', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/role/list'), 'get', () => {
  const pageList: API.PageInfo<API.RoleInfo[]> = {
    records: roleData,
    total: roleData.length,
    size: 2,
    current: 1,
    pages: 10
  };
  return success<API.PageInfo<API.RoleInfo[]>>(pageList);
});

Mock.mock(url('/api/v1/role'), 'get', () => {
  return success<API.RoleInfo[]>(roleData);
});
