import { AppstoreOutlined, DashboardOutlined, UserOutlined } from '@ant-design/icons';
import { type RouteObject, createBrowserRouter, Outlet } from 'react-router-dom';
import { lazy } from 'react';
import Auth from '@/components/Auth';

export const routeConfig: RouteConfig[] = [
  {
    path: '*',
    name: 'not-found',
    component: lazy(() => import('@/pages/Exception/404')),
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: lazy(() => import('@/pages/Login')),
    meta: {
      auth: true
    }
  },
  {
    path: '/',
    name: 'index',
    component: lazy(() => import('@/layouts')),
    meta: {
      auth: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          icon: <DashboardOutlined />
        },
        children: [
          {
            path: 'analysis',
            name: 'analysis',
            component: lazy(() => import('@/pages/Dashboard/Analysis')),
            meta: {
              access: 'analysis:view'
            }
          }
        ]
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

// 生成路由
function renderRoutes(routes: RouteConfig[]): RouteObject[] {
  const routeMap = routes.map((item) => {
    const route: RouteObject = {};
    route.path = item.path;
    if (item?.component) {
      // 有认证标识的路由组件上包裹高阶组件<Auth />做登陆认证校验
      route.element = item?.meta?.auth ? (
        <Auth>
          <item.component />
        </Auth>
      ) : (
        <item.component />
      );
    } else {
      // 无component配置项的路由为菜单分组，用<Outlet />代替
      route.element = <Outlet />;
    }
    if (item?.children) {
      route.children = renderRoutes(item.children);
    }
    return route;
  });
  return routeMap;
}

const routes = renderRoutes(routeConfig);
const router = createBrowserRouter(routes);

export default router;
