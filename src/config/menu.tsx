import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";

export type Menu = {
  path: string;
  name: string;
  meta?: {
    icon?: React.ReactNode;
  };
  children?: Menu[];
};

type MenuItem = {
  key: string;
  label?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

const menu: Menu[] = [
  {
    path: "system",
    name: "系统管理",
    meta: {
      icon: <AppstoreOutlined />,
    },
    children: [
      {
        path: "/user",
        name: "用户管理",
      },
      {
        path: "/post",
        name: "岗位管理",
      },
      {
        path: "/department",
        name: "部门管理",
      },
      {
        path: "/role",
        name: "角色管理",
      },
      {
        path: "/permission",
        name: "权限管理",
      },
      {
        path: "/dictionary",
        name: "字典管理",
      },
      {
        path: "/file",
        name: "文件管理",
      },
      {
        path: "/log",
        name: "日志管理",
      },
    ],
  },
  {
    path: "account",
    name: "个人中心",
    meta: {
      icon: <UserOutlined />,
    },
    children: [
      {
        path: "/settings",
        name: "个人设置",
      },
    ],
  },
];

export const getMenu = (menu: Menu[]) => {
  const menuItems: MenuItem[] = [];
  menu.map((item) => {
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

export default menu;
