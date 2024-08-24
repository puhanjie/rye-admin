import { MenuItem } from "@/layouts/components/sider-bar";
import { Route } from "@/router";
import { resolve } from "./path";
import { t } from "i18next";
import { matchRoutes } from "react-router-dom";
import React from "react";
import * as Icon from "@ant-design/icons";

const antIcon: { [key: string]: any } = Icon;

/**
 * 获取菜单
 * @param route
 * @param parentPath
 * @returns
 */
export function getMenu(route: Route[], parentPath: string = "") {
  const menus: MenuItem[] = [];
  route.map((item) => {
    const tmp: MenuItem = {
      key: resolve(parentPath, item.path),
      label: t(`app.layout.menu.${item.name}`),
      icon: item.meta?.icon && React.createElement(antIcon[item.meta?.icon]),
    };

    if (item?.children) {
      tmp.children = getMenu(item.children, tmp.key);
    }

    menus.push(tmp);
  });

  return menus;
}

/**
 * 获取活跃的菜单分组和菜单
 * @param route
 * @param pathname
 * @returns
 */
export function getActiveMenu(route: Route[], pathname: string) {
  const matches = matchRoutes(route, pathname)?.filter(
    (item) => item.pathname !== "/"
  );
  const matchKeys = matches?.map((item) => item.pathname);
  const openKeys = matchKeys?.slice(0, matchKeys.length - 1);
  const selectKeys = matchKeys?.slice(-1);

  return [openKeys, selectKeys];
}
