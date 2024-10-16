import route, { Route } from "@/config/route";
import { defaultLocale, locales } from "@/navigation";
import { getPermissions } from "@/services/user";
import type { NextRequest } from "next/server";

/**
 * 匹配当前路径对应路由对象
 * @param path
 * @param route
 * @returns
 */
export function matchRoute(path: string, route: Route[]) {
  let findRoute: Route = {
    path: "",
    name: "",
  };

  if (path === "/") {
    return route[0];
  }

  for (let i = 0; i < route.length; i++) {
    if (route[i].path === path) {
      findRoute = route[i];
      break;
    }
    if (route[i].children) {
      findRoute = matchRoute(path, route[i].children as Route[]);
      if (findRoute.path !== "") {
        break;
      }
    }
  }
  return findRoute;
}

/**
 * 获取权限路由
 * @param route
 * @param permissions
 * @returns
 */
export function getAuthRoute(route: Route[], permissions: string[]) {
  const authRoute: Route[] = [];
  route.map((item) => {
    const route: Route = {
      path: item.path,
      name: item.name,
      meta: item.meta,
    };
    // 权限判断
    if (item.meta?.access) {
      const permissionData = permissions.filter(
        (permission) => permission === item.meta?.access
      );
      // 无路由权限
      if (permissionData.length <= 0) {
        return;
      }
    }

    if (item.children) {
      route.children = getAuthRoute(item.children, permissions);
      // 若路由对象无children则不添加到认证路由列表
      if (route.children?.length === 0 && route.path !== "/") {
        return;
      }
    }

    authRoute.push(route);
  });

  return authRoute;
}

/**
 * 获取当前匹配路由对象的默认paht
 * @param route
 * @returns
 */
export function getDefaultPath(route: Route) {
  const defaultPath: string = route.children
    ? getDefaultPath(route.children[0])
    : route.path;
  return defaultPath;
}

/**
 * 路由守卫函数
 * @param request
 * @returns
 */
export async function getAccessPath(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.pathname;
  const urlArray = url.split("/").filter((item) => item !== "");
  const locale =
    locales.indexOf(urlArray[0]) === -1 ? defaultLocale : urlArray[0];
  const pathname =
    locale === defaultLocale ? url : `/${urlArray.slice(1).join("/")}`;

  // 登陆状态访问登陆页面重定向到首页
  if (token && pathname === "/login") {
    const path = locale === defaultLocale ? "/" : `/${locale}/`;
    return `${request.nextUrl.origin}${path}`;
  }

  // 非登陆状态访问需要登录权限的页面,则重定向至登录页
  if (!token && pathname !== "/login") {
    const path = locale === defaultLocale ? "/login" : `/${locale}/login`;
    return `${request.nextUrl.origin}${path}`;
  }

  const permissions = token && (await getPermissions(token));
  const authRoute = permissions
    ? getAuthRoute(
        route,
        permissions.map((item) => item.code)
      )
    : [];

  // 访问的路由为分组,则跳转至该分组下第一个路由
  const routeByauth = matchRoute(pathname, authRoute);
  if (routeByauth.path !== "" && routeByauth.children) {
    const path =
      locale === defaultLocale
        ? getDefaultPath(routeByauth)
        : `/${locale}/${getDefaultPath(routeByauth)}`;
    return `${request.nextUrl.origin}${path}`;
  }

  // 无路由访问权限则跳转至首页
  const routeByall = matchRoute(pathname, route);
  if (routeByauth.path === "" && routeByall.path !== "") {
    const path =
      locale === defaultLocale
        ? getDefaultPath(routeByauth)
        : `/${locale}/${getDefaultPath(routeByauth)}`;
    return `${request.nextUrl.origin}${path}`;
  }
}
