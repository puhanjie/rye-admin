import Mock from 'mockjs';
import { url, success } from '../utils';
import { permissionData } from './permission';
import { dictionaryData } from './dictionary';

export const roleData = [
  {
    id: 1,
    code: 'admin',
    name: '管理员',
    roleStatus: {
      dictValue: '0',
      dictLabel: '正常'
    },
    createUser: {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    updateUser: {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24',
    permissions: permissionData.map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      menu: item.menu
    }))
  },
  {
    id: 2,
    code: 'guest',
    name: '访客',
    roleStatus: {
      dictValue: '0',
      dictLabel: '正常'
    },
    createUser: {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    updateUser: {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24',
    permissions: [
      {
        id: 18,
        code: 'settings:view',
        name: '查看',
        menu: 'settings'
      }
    ]
  }
];

const roleOptions = {
  roleStatus: dictionaryData
    .filter((item) => item.dictType === 'role_status')
    .map((item) => ({
      dictValue: item.dictValue,
      dictLabel: item.dictLabel
    })),
  permissions: permissionData.map((item) => ({
    id: item.id,
    code: item.code,
    name: item.name,
    menu: item.menu
  }))
};

Mock.mock(url('/api/v1/role'), 'post', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/role'), 'delete', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/role'), 'put', () => {
  return success<boolean>(true);
});

Mock.mock(RegExp(url('/api/v1/role/list')), 'get', () => {
  const pageList: API.Page<API.RoleInfo[]> = {
    records: roleData,
    total: roleData.length,
    size: 2,
    current: 1,
    pages: 10
  };
  return success<API.Page<API.RoleInfo[]>>(pageList);
});

Mock.mock(url('/api/v1/role/options'), 'get', () => {
  return success<API.RoleOptions>(roleOptions);
});
