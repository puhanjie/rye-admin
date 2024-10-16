import type { Route } from "@/config/route";

export type SelectOptions = {
  label?: string;
  value?: number | string;
};

export type SelectTreeOptions = {
  key?: string;
  value?: string;
  title?: React.ReactNode;
  selectable?: boolean;
  children?: SelectTreeOptions[];
};

/**
 * 获取字典选项框数据
 * @param dictionarys
 * @returns
 */
export function getDictSelectOptions(dictionarys?: API.Dictionary[]) {
  if (!dictionarys) {
    return;
  }
  const options: SelectOptions[] = dictionarys.map((item) => {
    return { label: item.dictLabel, value: item.dictValue };
  });
  return options;
}

/**
 * 通过用户数据获取用户选项框数据
 * @param users
 * @returns
 */
export function getUserSelectOptions(users?: API.User[]) {
  if (!users) {
    return;
  }
  const options: SelectOptions[] = users.map((item) => {
    return { label: item.name, value: item.id };
  });
  return options;
}

/**
 * 通过角色数据获取角色选项框数据
 * @param roles
 * @returns
 */
export function getRoleSelectOptions(roles?: API.Role[]) {
  if (!roles) {
    return;
  }
  const options: SelectOptions[] = roles.map((item) => {
    return { label: item.name, value: item.id };
  });
  return options;
}

/**
 * 通过岗位数据获取岗位选项框数据
 * @param roles
 * @returns
 */
export function getPostSelectOptions(posts?: API.Post[]) {
  if (!posts) {
    return;
  }
  const options: SelectOptions[] = posts.map((item) => {
    return { label: item.name, value: item.id };
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
  permissions: API.Permission[]
) {
  const data = permissions.filter((item) => item.menu === routeName);
  const menuPermission: SelectTreeOptions[] = data.map((item) => {
    return {
      key: item.id.toString(),
      value: item.id.toString(),
      title: item.name,
    };
  });
  return menuPermission;
}

/**
 * 获取权限树选项数据
 * @param t
 * @param route
 * @param permissions
 * @returns
 */
export function getPermissionTreeData(
  t: (key: string) => string,
  route?: Route[],
  permissions?: API.Permission[]
) {
  if (!route || !permissions) {
    return;
  }

  const treeData: SelectTreeOptions[] = [];
  if (route) {
    route.map((item) => {
      const tmp: SelectTreeOptions = {
        key: item.path,
        value: item.path,
        title: t(`app.layout.menu.${item.name}`),
      };
      if (item?.children) {
        tmp.children = getPermissionTreeData(t, item.children, permissions);
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
 * @param route
 * @returns
 */
export function getMenuTree(t: (key: string) => string, route?: Route[]) {
  if (!route) {
    return;
  }
  return route.map((item) => {
    const tree: SelectTreeOptions = {
      key: item.name,
      value: item.name,
      title: t(`app.layout.menu.${item.name}`),
    };
    if (item.children) {
      tree.selectable = false;
      tree.children = getMenuTree(t, item.children);
    }
    return tree;
  });
}

/**
 * 获取部门树选项数据
 * @param departmentTree
 * @returns
 */
export function getDeptTree(departmentTree?: API.DepartmentTree[]) {
  if (!departmentTree) {
    return;
  }
  return departmentTree.map((item) => {
    const treeItem: SelectTreeOptions = {
      key: item.id.toString(),
      value: item.id.toString(),
      title: item.name,
    };
    if (item.children && item.children.length !== 0) {
      treeItem.children = getDeptTree(item.children);
    }
    return treeItem;
  });
}
