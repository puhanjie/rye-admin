import route from "@/router";
import { useAppSelector } from "@/store";
import { getAuthRoute } from "@/utils/route";
import { matchRoutes, useLocation } from "react-router-dom";

/**
 * 获取当前路由和权限路由hook
 * @returns
 */
export function useRouter() {
  const { permissions } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  const permissionList =
    permissions && permissions.length > 0
      ? permissions.map((item) => item.code)
      : [];

  // 权限匹配路由对象
  const authRoute = getAuthRoute(route, permissionList);

  const routeMatch = matchRoutes(authRoute, pathname);
  const currentRoute = routeMatch && routeMatch.slice(-1)[0];

  return { currentRoute, authRoute };
}
