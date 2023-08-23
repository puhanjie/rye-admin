import Mock from 'mockjs';
import { url, success } from '../utils';

export const permissionData = [
  {
    id: 1,
    name: 'user:add',
    info: '新增',
    menu: 'user',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 2,
    name: 'user:delete',
    info: '删除',
    menu: 'user',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 3,
    name: 'user:edit',
    info: '编辑',
    menu: 'user',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 4,
    name: 'user:view',
    info: '查看',
    menu: 'user',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 5,
    name: 'user:resetPassword',
    info: '重置密码',
    menu: 'user',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 6,
    name: 'role:add',
    info: '新增',
    menu: 'role',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 7,
    name: 'role:delete',
    info: '删除',
    menu: 'role',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 8,
    name: 'role:edit',
    info: '编辑',
    menu: 'role',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 9,
    name: 'role:view',
    info: '查看',
    menu: 'role',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 10,
    name: 'permission:add',
    info: '新增',
    menu: 'permission',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 11,
    name: 'permission:delete',
    info: '删除',
    menu: 'permission',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 12,
    name: 'permission:edit',
    info: '编辑',
    menu: 'permission',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 13,
    name: 'permission:view',
    info: '查看',
    menu: 'permission',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 14,
    name: 'dictionary:add',
    info: '新增',
    menu: 'dictionary',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 15,
    name: 'dictionary:delete',
    info: '删除',
    menu: 'dictionary',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 16,
    name: 'dictionary:edit',
    info: '编辑',
    menu: 'dictionary',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 17,
    name: 'dictionary:view',
    info: '查看',
    menu: 'dictionary',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 18,
    name: 'settings:view',
    info: '查看',
    menu: 'settings',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  }
];

Mock.mock(url('/api/v1/permission'), 'post', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/permission'), 'delete', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/permission'), 'put', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/permission/list'), 'get', () => {
  const pageList: API.PageInfo<API.PermissionInfo[]> = {
    records: permissionData,
    total: permissionData.length,
    size: 2,
    current: 1,
    pages: 10
  };
  return success<API.PageInfo<API.PermissionInfo[]>>(pageList);
});

Mock.mock(url('/api/v1/permission'), 'get', () => {
  return success<API.PermissionInfo[]>(permissionData);
});
