import Mock from 'mockjs';
import { url, success } from '../utils';
import { dictionaryData } from './dictionary';

export const permissionData = [
  {
    id: 1,
    code: 'user:add',
    name: '新增',
    menu: 'user',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 2,
    code: 'user:delete',
    name: '删除',
    menu: 'user',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 3,
    code: 'user:edit',
    name: '编辑',
    menu: 'user',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 4,
    code: 'user:view',
    name: '查看',
    menu: 'user',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 5,
    code: 'user:resetPassword',
    name: '重置密码',
    menu: 'user',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 6,
    code: 'role:add',
    name: '新增',
    menu: 'role',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 7,
    code: 'role:delete',
    name: '删除',
    menu: 'role',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 8,
    code: 'role:edit',
    name: '编辑',
    menu: 'role',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 9,
    code: 'role:view',
    name: '查看',
    menu: 'role',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 10,
    code: 'permission:add',
    name: '新增',
    menu: 'permission',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 11,
    code: 'permission:delete',
    name: '删除',
    menu: 'permission',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 12,
    code: 'permission:edit',
    name: '编辑',
    menu: 'permission',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 13,
    code: 'permission:view',
    name: '查看',
    menu: 'permission',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 14,
    code: 'dictionary:add',
    name: '新增',
    menu: 'dictionary',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 15,
    code: 'dictionary:delete',
    name: '删除',
    menu: 'dictionary',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 16,
    code: 'dictionary:edit',
    name: '编辑',
    menu: 'dictionary',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 17,
    code: 'dictionary:view',
    name: '查看',
    menu: 'dictionary',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 18,
    code: 'settings:view',
    name: '查看',
    menu: 'settings',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 19,
    code: 'log:delete',
    name: '删除',
    menu: 'log',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 20,
    code: 'log:empty',
    name: '清空',
    menu: 'log',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 21,
    code: 'log:view',
    name: '查看',
    menu: 'log',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 22,
    code: 'post:add',
    name: '新增',
    menu: 'post',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 23,
    code: 'post:delete',
    name: '删除',
    menu: 'post',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 24,
    code: 'post:edit',
    name: '编辑',
    menu: 'post',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 25,
    code: 'post:view',
    name: '查看',
    menu: 'post',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 26,
    code: 'department:add',
    name: '新增',
    menu: 'department',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 27,
    code: 'department:delete',
    name: '删除',
    menu: 'department',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 28,
    code: 'department:edit',
    name: '编辑',
    menu: 'department',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 29,
    code: 'department:view',
    name: '查看',
    menu: 'department',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 30,
    code: 'file:upload',
    name: '上传',
    menu: 'file',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 31,
    code: 'file:delete',
    name: '删除',
    menu: 'file',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 32,
    code: 'file:download',
    name: '下载',
    menu: 'file',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 33,
    code: 'file:view',
    name: '查看',
    menu: 'file',
    permissionStatus: {
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
    updateTime: '2023-06-09 11:15:24'
  }
];

const permissionOptions = {
  permissionStatus: dictionaryData
    .filter((item) => item.dictType === 'permission_status')
    .map((item) => ({
      dictValue: item.dictValue,
      dictLabel: item.dictLabel
    }))
};

Mock.mock(url('/api/v1/permission'), 'post', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/permission'), 'delete', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/permission'), 'put', () => {
  return success<boolean>(true);
});

Mock.mock(RegExp(url('/api/v1/permission/list')), 'get', () => {
  const pageList: API.Page<API.PermissionInfo[]> = {
    records: permissionData,
    total: permissionData.length,
    size: 2,
    current: 1,
    pages: 10
  };
  return success<API.Page<API.PermissionInfo[]>>(pageList);
});

Mock.mock(url('/api/v1/permission/options'), 'get', () => {
  return success<API.PermissionOptions>(permissionOptions);
});
