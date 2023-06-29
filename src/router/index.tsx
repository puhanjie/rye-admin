import { AppstoreOutlined, DashboardOutlined, UserOutlined } from '@ant-design/icons';
import { type RouteObject, createBrowserRouter, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Auth from '@/components/Auth';
import Loading from '@/components/Loading';

export const routeConfig: RouteConfig[] = [
  {
    path: '*',
    name: 'exception',
    component: lazy(() => import('@/pages/Exception/404')),
    meta: {
      title: 'Not Found'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: lazy(() => import('@/pages/Login')),
    meta: {
      auth: true,
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'index',
    component: lazy(() => import('@/layouts')),
    meta: {
      auth: true,
      title: 'index'
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          title: 'Dashboard',
          icon: <DashboardOutlined />
        },
        children: [
          {
            path: 'analysis',
            name: 'analysis',
            component: lazy(() => import('@/pages/Dashboard/Analysis')),
            meta: {
              title: '分析页',
              access: 'analysis:view'
            }
          }
        ]
      },
      {
        path: 'system',
        name: 'system',
        meta: {
          title: '系统管理',
          icon: <AppstoreOutlined />
        },
        children: [
          {
            path: 'user',
            name: 'user',
            component: lazy(() => import('@/pages/System/User')),
            meta: {
              title: '用户管理',
              access: 'user:view'
            }
          },
          {
            path: 'role',
            name: 'role',
            component: lazy(() => import('@/pages/System/Role')),
            meta: {
              title: '角色管理',
              access: 'role:view'
            }
          },
          {
            path: 'permission',
            name: 'permission',
            component: lazy(() => import('@/pages/System/Permission')),
            meta: {
              title: '权限管理',
              access: 'permission:view'
            }
          }
        ]
      },
      {
        path: 'account',
        name: 'account',
        meta: {
          title: '个人中心',
          icon: <UserOutlined />
        },
        children: [
          {
            path: 'settings',
            name: 'settings',
            component: lazy(() => import('@/pages/Account/Settings')),
            meta: {
              title: '个人设置',
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
          <Suspense fallback={<Loading />}>
            <item.component />
          </Suspense>
        </Auth>
      ) : (
        <Suspense fallback={<Loading />}>
          <item.component />
        </Suspense>
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
