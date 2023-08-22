import routeConfig from '@/router';
import { useAppSelector } from '@/store';
import { getAuthRoutes } from '@/utils/route';
import { matchRoutes, useLocation } from 'react-router-dom';

/**
 * 获取当前路由和权限路由hook
 * @returns
 */
export function useRouter() {
  const { permissions } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  const permissionList =
    permissions && permissions.length > 0 ? permissions.map((item) => item.name) : [];

  // 权限匹配路由对象
  const routes = getAuthRoutes(routeConfig, permissionList);

  const routeMatch = matchRoutes(routes, pathname);
  const currentRoute = routeMatch && routeMatch.slice(-1)[0];

  return { currentRoute, routes };
}
