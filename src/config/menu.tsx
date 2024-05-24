import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";

const menu = [
  {
    key: "system",
    label: "系统管理",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "user",
        label: "用户管理",
      },
      {
        key: "post",
        label: "岗位管理",
      },
      {
        key: "department",
        label: "部门管理",
      },
      {
        key: "role",
        label: "角色管理",
      },
      {
        key: "permission",
        label: "权限管理",
      },
      {
        key: "dictionary",
        label: "字典管理",
      },
      {
        key: "file",
        label: "文件管理",
      },
      {
        key: "log",
        label: "日志管理",
      },
    ],
  },
  {
    key: "account",
    label: "个人中心",
    icon: <UserOutlined />,
    children: [
      {
        key: "settings",
        label: "个人设置",
      },
    ],
  },
];

export default menu;
