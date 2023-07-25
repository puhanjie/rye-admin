import Mock from 'mockjs';
import { url, success } from '../utils';

const permissionData = [
  {
    id: 1,
    name: 'app:admin',
    info: '管理员',
    menu: '*',
    menuName: '*',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 2,
    name: 'analysis:view',
    info: '查看',
    menu: 'analysis',
    menuName: '分析页',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 3,
    name: 'user:add',
    info: '新增',
    menu: 'user',
    menuName: '用户管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 4,
    name: 'user:delete',
    info: '删除',
    menu: 'user',
    menuName: '用户管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 5,
    name: 'user:update',
    info: '修改',
    menu: 'user',
    menuName: '用户管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 6,
    name: 'user:view',
    info: '查看',
    menu: 'user',
    menuName: '用户管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 7,
    name: 'user:resetPassword',
    info: '重置密码',
    menu: 'user',
    menuName: '用户管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 8,
    name: 'user:batchDelete',
    info: '批量删除',
    menu: 'user',
    menuName: '用户管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 9,
    name: 'role:add',
    info: '新增',
    menu: 'role',
    menuName: '角色管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 10,
    name: 'role:delete',
    info: '删除',
    menu: 'role',
    menuName: '角色管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 11,
    name: 'role:update',
    info: '修改',
    menu: 'role',
    menuName: '角色管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 12,
    name: 'role:view',
    info: '查看',
    menu: 'role',
    menuName: '角色管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 13,
    name: 'role:batchDelete',
    info: '批量删除',
    menu: 'role',
    menuName: '角色管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 14,
    name: 'permission:add',
    info: '新增',
    menu: 'permission',
    menuName: '权限管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 15,
    name: 'permission:delete',
    info: '删除',
    menu: 'permission',
    menuName: '权限管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 16,
    name: 'permission:update',
    info: '修改',
    menu: 'permission',
    menuName: '权限管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 17,
    name: 'permission:view',
    info: '查看',
    menu: 'permission',
    menuName: '权限管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 18,
    name: 'permission:batchDelete',
    info: '批量删除',
    menu: 'permission',
    menuName: '权限管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 19,
    name: 'settings:view',
    info: '查看',
    menu: 'settings',
    menuName: '个人设置',
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

Mock.mock(url('/api/v1/permission'), 'get', () => {
  const pageList: API.PageInfo<API.PermissionInfo[]> = {
    records: permissionData,
    total: permissionData.length,
    size: 2,
    current: 1,
    pages: 10
  };
  return success<API.PageInfo<API.PermissionInfo[]>>(pageList);
});

Mock.mock(url('/api/v1/permission/list'), 'get', () => {
  return success<API.PermissionInfo[]>(permissionData);
});
