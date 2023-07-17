import { resolve } from './path';

/**
 * 获取路由对象的默认路由，若有children，默认返回第一个children的path，无就是自身path
 * @param {*} route
 * @param {*} parentPath
 * @returns
 */
export function getDefaultPath(route: RouteConfig, parentPath: string = ''): string {
  const defaultPath = resolve(parentPath, route.path);
  if (route?.children) {
    return getDefaultPath(route.children[0], defaultPath);
  }
  return defaultPath;
}
