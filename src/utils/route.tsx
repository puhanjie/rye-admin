import { Outlet, type RouteObject } from 'react-router-dom';
import { resolve } from './path';
import RouteGuard from '@/components/RouteGuard';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

/**
 * 获取路由对象的默认路由，若有children，默认返回第一个children的path，无就是自身path
 * @param {*} route
 * @param {*} parentPath
 * @returns
 */
export function getDefaultPath(route: RouteConfig, parentPath: string = '') {
  const defaultPath = resolve(parentPath, route.path);
  if (route?.children) {
    return getDefaultPath(route.children[0], defaultPath);
  }
  return defaultPath;
}

/**
 * 根据路由配置对象生成路由对象
 * @param routes
 * @returns
 */
export function renderRoutes(routes: RouteConfig[]): RouteObject[] {
  const routeMap = routes.map((item) => {
    const route: RouteObject = {};
    route.path = item.path;
    if (item?.component) {
      route.element = (
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

/**
 * 给路由对象包裹权限认证高阶组件做路由前置认证
 * @param routes
 * @returns
 */
export function renderAuthRoutes(routes: RouteObject[]): RouteObject[] {
  return routes.map((item) => {
    if (item.element) {
      // 最外层路由包裹高阶组件<RouteGuard />做登陆认证校验
      item.element = <RouteGuard>{item.element}</RouteGuard>;
    }
    return item;
  });
}

/**
 * 获取权限路由
 * @param routes
 * @param permissions
 * @returns
 */
export function getAuthRoutes(routes: RouteConfig[], permissions: string[]) {
  const authRoutes: RouteConfig[] = [];
  routes.map((item) => {
    const route: RouteConfig = {
      path: item.path,
      name: item.name,
      component: item.component,
      meta: item.meta
    };
    // 权限判断
    if (item.meta?.access) {
      const permissionData = permissions.filter(
        (permission) => permission === item.meta?.access || permission === 'app:admin'
      );
      // 无路由权限
      if (permissionData.length <= 0) {
        return;
      }
    }

    if (item.children) {
      route.children = getAuthRoutes(item.children, permissions);
      // 若路由对象无children则不添加到认证路由列表
      if (route.children?.length === 0) {
        return;
      }
    }

    authRoutes.push(route);
  });

  return authRoutes;
}
