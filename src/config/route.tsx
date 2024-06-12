import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";

export type Route = {
  path: string;
  name: string;
  meta?: {
    icon?: React.ReactNode;
  };
  children?: Route[];
};

export type MenuItem = {
  key: string;
  label?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

export type Tab = {
  key: string;
  label: string;
};

const route: Route[] = [
  {
    path: "/system",
    name: "系统管理",
    meta: {
      icon: <AppstoreOutlined />,
    },
    children: [
      {
        path: "/system/user",
        name: "用户管理",
      },
      {
        path: "/system/post",
        name: "岗位管理",
      },
      {
        path: "/system/department",
        name: "部门管理",
      },
      {
        path: "/system/role",
        name: "角色管理",
      },
      {
        path: "/system/permission",
        name: "权限管理",
      },
      {
        path: "/system/dictionary",
        name: "字典管理",
      },
      {
        path: "/system/file",
        name: "文件管理",
      },
      {
        path: "/system/log",
        name: "日志管理",
      },
    ],
  },
  {
    path: "/account",
    name: "个人中心",
    meta: {
      icon: <UserOutlined />,
    },
    children: [
      {
        path: "/account/settings",
        name: "个人设置",
      },
    ],
  },
];

export const getMenu = (route: Route[]) => {
  const menuItems: MenuItem[] = [];
  route.map((item) => {
    const tmp: MenuItem = {
      key: item.path,
      label: item.name,
      icon: item?.meta?.icon,
    };
    if (item?.children) {
      tmp.children = getMenu(item.children);
    }
    menuItems.push(tmp);
  });
  return menuItems;
};

export const getTabByPath = (route: Route[] | undefined, path: string) => {
  let tab: Tab = {
    key: "",
    label: "",
  };

  if (!route) {
    return tab;
  }

  for (var i = 0; i < route.length; i++) {
    if (route[i].path === path) {
      tab = { key: route[i].path, label: route[i].name };
      break;
    }
    if (route[i].children) {
      tab = getTabByPath(route[i].children, path);
      break;
    }
  }

  return tab;
};

export default route;
