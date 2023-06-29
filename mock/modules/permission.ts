import Mock from 'mockjs';
import { url, success } from '../utils';

const PermissionData = [
  {
    id: 1,
    name: 'app:admin',
    info: '管理员',
    menu: '*',
    menuName: 'all',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 2,
    name: 'analysis:view',
    info: '分析页:查看',
    menu: 'analysis',
    menuName: '分析页',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 3,
    name: 'user:add',
    info: '用户管理:新增',
    menu: 'user',
    menuName: '用户管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 4,
    name: 'user:delete',
    info: '用户管理:删除',
    menu: 'user',
    menuName: '用户管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 5,
    name: 'user:update',
    info: '用户管理:修改',
    menu: 'user',
    menuName: '用户管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 6,
    name: 'user:view',
    info: '用户管理:查看',
    menu: 'user',
    menuName: '用户管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 7,
    name: 'role:add',
    info: '角色管理:新增',
    menu: 'role',
    menuName: '角色管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 8,
    name: 'role:delete',
    info: '角色管理:删除',
    menu: 'role',
    menuName: '角色管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 9,
    name: 'role:update',
    info: '角色管理:修改',
    menu: 'role',
    menuName: '角色管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 10,
    name: 'role:view',
    info: '角色管理:查看',
    menu: 'role',
    menuName: '角色管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 11,
    name: 'permission:add',
    info: '权限管理:新增',
    menu: 'permission',
    menuName: '权限管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 12,
    name: 'permission:delete',
    info: '权限管理:删除',
    menu: 'permission',
    menuName: '权限管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 13,
    name: 'permission:update',
    info: '权限管理:修改',
    menu: 'permission',
    menuName: '权限管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 14,
    name: 'permission:view',
    info: '权限管理:查看',
    menu: 'permission',
    menuName: '权限管理',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 15,
    name: 'settings:view',
    info: '个人设置:查看',
    menu: 'settings',
    menuName: '个人设置',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  }
];

Mock.mock(url('/api/v1/permission'), 'post', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/permission/'), 'delete', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/permission'), 'put', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/permission/list'), 'get', () => {
  return success<API.PermissionInfo[]>(PermissionData);
});
