import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { lazy } from 'react';

const routeConfig: RouteConfig[] = [
  {
    path: '*',
    name: 'not-found',
    component: lazy(() => import('@/pages/Exception/404'))
  },
  {
    path: '/login',
    name: 'login',
    component: lazy(() => import('@/pages/Login'))
  },
  {
    path: '/',
    name: 'layouts',
    component: lazy(() => import('@/layouts')),
    children: [
      {
        path: 'system',
        name: 'system',
        meta: {
          icon: <AppstoreOutlined />
        },
        children: [
          {
            path: 'user',
            name: 'user',
            component: lazy(() => import('@/pages/System/User')),
            meta: {
              access: 'user:view'
            }
          },
          {
            path: 'post',
            name: 'post',
            component: lazy(() => import('@/pages/System/Post')),
            meta: {
              access: 'post:view'
            }
          },
          {
            path: 'department',
            name: 'department',
            component: lazy(() => import('@/pages/System/Department')),
            meta: {
              access: 'department:view'
            }
          },
          {
            path: 'role',
            name: 'role',
            component: lazy(() => import('@/pages/System/Role')),
            meta: {
              access: 'role:view'
            }
          },
          {
            path: 'permission',
            name: 'permission',
            component: lazy(() => import('@/pages/System/Permission')),
            meta: {
              access: 'permission:view'
            }
          },
          {
            path: 'dictionary',
            name: 'dictionary',
            component: lazy(() => import('@/pages/System/Dictionary')),
            meta: {
              access: 'dictionary:view'
            }
          },
          {
            path: 'file',
            name: 'file',
            component: lazy(() => import('@/pages/System/File')),
            meta: {
              access: 'file:view'
            }
          },
          {
            path: 'log',
            name: 'log',
            component: lazy(() => import('@/pages/System/Log')),
            meta: {
              access: 'log:view'
            }
          }
        ]
      },
      {
        path: 'account',
        name: 'account',
        meta: {
          icon: <UserOutlined />
        },
        children: [
          {
            path: 'settings',
            name: 'settings',
            component: lazy(() => import('@/pages/Account/Settings')),
            meta: {
              access: 'settings:view'
            }
          }
        ]
      }
    ]
  }
];

export default routeConfig;
