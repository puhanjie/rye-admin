import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";

export type Route = {
  path: string; // path必须为绝对路径
  name: string;
  meta?: {
    icon?: React.ReactNode;
    access?: string;
  };
  children?: Route[];
};

const route: Route[] = [
  {
    path: "/system",
    name: "system",
    meta: {
      icon: <AppstoreOutlined />,
    },
    children: [
      {
        path: "/system/user",
        name: "user",
        meta: {
          access: "user:view",
        },
      },
      {
        path: "/system/post",
        name: "post",
        meta: {
          access: "post:view",
        },
      },
      {
        path: "/system/department",
        name: "department",
        meta: {
          access: "department:view",
        },
      },
      {
        path: "/system/role",
        name: "role",
        meta: {
          access: "role:view",
        },
      },
      {
        path: "/system/permission",
        name: "permission",
        meta: {
          access: "permission:view",
        },
      },
      {
        path: "/system/dictionary",
        name: "dictionary",
        meta: {
          access: "dictionary:view",
        },
      },
      {
        path: "/system/file",
        name: "file",
        meta: {
          access: "file:view",
        },
      },
      {
        path: "/system/log",
        name: "log",
        meta: {
          access: "log:view",
        },
      },
    ],
  },
  {
    path: "/account",
    name: "account",
    meta: {
      icon: <UserOutlined />,
    },
    children: [
      {
        path: "/account/settings",
        name: "settings",
        meta: {
          access: "settings:view",
        },
      },
    ],
  },
];

export default route;
