import React from 'react';
import { resolve } from './path';
import { matchRoutes } from 'react-router-dom';
import type { TagData } from '@/layouts/components/Tags';

type MenuItem = {
  key: string;
  label?: string | undefined;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

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

/**
 * 根据路由配置获取菜单数据
 * @param {*} routes
 * @param {*} parentPath
 * @returns
 */
export function getMenuItems(
  routes: RouteConfig[],
  parentPath: string,
  permissions: { id: number; name: string; info: string }[]
): MenuItem[] {
  const menus = new Array<MenuItem>();
  routes.map((item) => {
    const tmp: MenuItem = {
      key: resolve(parentPath, item.path),
      label: item?.meta?.title,
      icon: item?.meta?.icon
    };

    if (item?.meta?.access) {
      // 无菜单权限，不添加到菜单数组
      const hasPermissions = permissions.filter(
        (permission) => permission.name === item.meta?.access || permission.name === 'app:admin'
      );
      if (hasPermissions.length <= 0) {
        return;
      }
    }

    if (item?.children) {
      tmp.children = getMenuItems(item.children, tmp.key, permissions);
      // 都无菜单分组下子菜单的权限，则屏蔽该菜单分组的显示
      if (tmp.children.length === 0) {
        return;
      }
    }

    menus.push(tmp);
  });

  return menus;
}

/**
 * 获取当前活跃的菜单分组和菜单
 * @param routeConfig
 * @param pathname
 * @returns
 */
export function getActiveMenus(routeConfig: RouteConfig[], pathname: string) {
  const matches = matchRoutes(routeConfig, pathname)?.filter((item) => item.pathname !== '/');
  const matchKeys = matches?.map((item) => item.pathname);
  const openKeys = matchKeys?.slice(0, matchKeys.length - 1);
  const selectKeys = matchKeys?.slice(-1);

  return [openKeys, selectKeys];
}

/**
 * 获取当前路由对应的tag标签数据
 * @param routeConfig
 * @param currentPath
 * @returns
 */
export function getTags(routeConfig: RouteConfig[], currentPath: string, tags: TagData[]) {
  const findData = tags.filter((item) => item.path === currentPath);
  // tag已存在则不添加
  if (findData.length > 0) {
    return tags;
  }
  const currentRoute = matchRoutes(routeConfig, currentPath)?.slice(-1)[0];
  if (currentRoute?.route.meta?.title && currentRoute?.pathname) {
    const currentTag: TagData = {
      name: currentRoute?.route.meta?.title,
      path: currentRoute?.pathname
    };
    return [...tags, currentTag];
  }
}
