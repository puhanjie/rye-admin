import i18n from 'i18next';

export type SelectOptions = {
  label?: string;
  value?: number | string;
};

export type SelectTreeOptions = {
  key?: string;
  value?: string;
  title?: string;
  selectable?: boolean;
  children?: SelectTreeOptions[];
};

/**
 * 通过角色数据获取角色选项框数据
 * @param roles
 * @returns
 */
export function getRoleSelectOptions(roles: API.RoleInfo[]) {
  const options: SelectOptions[] = roles.map((item) => {
    return { label: item.info, value: item.id };
  });
  return options;
}

/**
 * 通过权限数据获取某个路由菜单下功能权限数据
 * @param routeName
 * @param permissions
 * @returns
 */
export function getMenuPermissions(
  routeName: string | undefined,
  permissions: API.PermissionInfo[]
) {
  const data = permissions.filter((item) => item.menu === routeName);
  const menuPermission: SelectTreeOptions[] = data.map((item) => {
    return {
      key: item.id.toString(),
      value: item.id.toString(),
      title: item.info
    };
  });
  return menuPermission;
}

/**
 * 获取权限树选项数据
 * @param routeConfig
 * @param permissions
 * @returns
 */
export function getPermissionTreeData(
  routeConfig: RouteConfig[] | undefined,
  permissions: API.PermissionInfo[]
) {
  const treeData: SelectTreeOptions[] = [];
  if (routeConfig) {
    routeConfig.map((item) => {
      let tmp: SelectTreeOptions = {
        key: item.path,
        value: item.path,
        title: i18n.t(`menu.${item.name}`)
      };
      if (item?.children) {
        tmp.children = getPermissionTreeData(item.children, permissions);
      } else {
        tmp.children = getMenuPermissions(item.name, permissions);
      }
      treeData.push(tmp);
    });
  }
  return treeData;
}

/**
 * 获取菜单树
 * @param routeConfig
 * @returns
 */
export function getMenuTree(routeConfig?: RouteConfig[]) {
  if (!routeConfig) {
    return;
  }
  return routeConfig.map((item) => {
    const tree: SelectTreeOptions = {
      key: item.name,
      value: item.name,
      title: i18n.t(`menu.${item.name}`)
    };
    if (item.children) {
      tree.selectable = false;
      tree.children = getMenuTree(item.children);
    }
    return tree;
  });
}
