import { ADMIN } from '@/config/constant';
import routeConfig from '@/router';
import { useAppSelector } from '@/store';
import { getAuthRoutes } from '@/utils/route';
import { matchRoutes, useLocation } from 'react-router-dom';

/**
 * 获取当前路由和权限路由hook
 * @returns
 */
export function useRouter() {
  const { roles, permissions } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  const isAdmin =
    roles && roles.filter((item) => item.name === ADMIN.name).length > 0 ? true : false;
  const permissionList =
    permissions && permissions.length > 0 ? permissions.map((item) => item.name) : [];

  // 权限匹配路由对象
  const routes = getAuthRoutes(routeConfig, permissionList, isAdmin);

  const routeMatch = matchRoutes(routes, pathname);
  const currentRoute = routeMatch && routeMatch.slice(-1)[0];

  return { currentRoute, routes };
}
