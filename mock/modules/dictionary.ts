import Mock from 'mockjs';
import { url, success } from '../utils';

export const dictionaryData = [
  {
    id: 1,
    dictType: 'user_status',
    dictName: '用户状态',
    dictValue: '0',
    dictLabel: '正常',
    description: '用户账户状态',
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
    dictType: 'user_status',
    dictName: '用户状态',
    dictValue: '1',
    dictLabel: '冻结',
    description: '用户账户状态',
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
    dictType: 'user_status',
    dictName: '用户状态',
    dictValue: '2',
    dictLabel: '注销',
    description: '用户账户状态',
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
    dictType: 'sex',
    dictName: '性别',
    dictValue: '1',
    dictLabel: '男',
    description: '性别',
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
    dictType: 'sex',
    dictName: '性别',
    dictValue: '2',
    dictLabel: '女',
    description: '性别',
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
    dictType: 'sex',
    dictName: '性别',
    dictValue: '3',
    dictLabel: '未知',
    description: '性别',
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
    dictType: 'role_status',
    dictName: '角色状态',
    dictValue: '0',
    dictLabel: '正常',
    description: '角色状态',
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
    dictType: 'role_status',
    dictName: '角色状态',
    dictValue: '1',
    dictLabel: '停用',
    description: '角色状态',
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
    dictType: 'permission_status',
    dictName: '权限状态',
    dictValue: '0',
    dictLabel: '正常',
    description: '权限状态',
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
    dictType: 'permission_status',
    dictName: '权限状态',
    dictValue: '1',
    dictLabel: '停用',
    description: '权限状态',
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
    dictType: 'dept_status',
    dictName: '部门状态',
    dictValue: '0',
    dictLabel: '正常',
    description: '部门状态',
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
    dictType: 'dept_status',
    dictName: '部门状态',
    dictValue: '1',
    dictLabel: '停用',
    description: '部门状态',
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
    dictType: 'post_status',
    dictName: '岗位状态',
    dictValue: '0',
    dictLabel: '正常',
    description: '岗位状态',
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
    dictType: 'post_status',
    dictName: '岗位状态',
    dictValue: '1',
    dictLabel: '停用',
    description: '岗位状态',
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

Mock.mock(url('/api/v1/dictionary'), 'post', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/dictionary'), 'delete', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/dictionary'), 'put', () => {
  return success<boolean>(true);
});

Mock.mock(RegExp(url('/api/v1/dictionary/list')), 'get', () => {
  const pageList: API.Page<API.DictionaryInfo[]> = {
    records: dictionaryData,
    total: dictionaryData.length,
    size: 14,
    current: 1,
    pages: 10
  };
  return success<API.Page<API.DictionaryInfo[]>>(pageList);
});

Mock.mock(RegExp(url('/api/v1/dictionary/items')), 'get', (params) => {
  const url = new URL(params.url);
  const dictType = url.searchParams.get('dictType');
  const data = dictionaryData.filter((item) => item.dictType === dictType);
  return success<API.DictionaryInfo[]>(data);
});
