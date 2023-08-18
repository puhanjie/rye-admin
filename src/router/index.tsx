import { AppstoreOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
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
    name: '/',
    component: lazy(() => import('@/layouts')),
    children: [
      {
        path: 'home',
        name: 'home',
        component: lazy(() => import('@/pages/Home')),
        meta: {
          icon: <HomeOutlined />
        }
      },
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
