import { lazy } from "react";

export type Route = {
  path: string;
  name: string;
  component?: React.FC;
  meta?: {
    icon?: string;
    access?: string;
  };
  children?: Route[];
};

const route: Route[] = [
  {
    path: "*",
    name: "not-found",
    component: lazy(() => import("@/pages/exception/not-found")),
  },
  {
    path: "/login",
    name: "login",
    component: lazy(() => import("@/pages/login")),
  },
  {
    path: "/",
    name: "layouts",
    component: lazy(() => import("@/layout")),
    children: [
      {
        path: "system",
        name: "system",
        meta: {
          icon: "AppstoreOutlined",
        },
        children: [
          {
            path: "user",
            name: "user",
            component: lazy(() => import("@/pages/system/user")),
            meta: {
              access: "user:view",
            },
          },
          {
            path: "post",
            name: "post",
            component: lazy(() => import("@/pages/system/post")),
            meta: {
              access: "post:view",
            },
          },
          {
            path: "department",
            name: "department",
            component: lazy(() => import("@/pages/system/department")),
            meta: {
              access: "department:view",
            },
          },
          {
            path: "role",
            name: "role",
            component: lazy(() => import("@/pages/system/role")),
            meta: {
              access: "role:view",
            },
          },
          {
            path: "permission",
            name: "permission",
            component: lazy(() => import("@/pages/system/permission")),
            meta: {
              access: "permission:view",
            },
          },
          {
            path: "dictionary",
            name: "dictionary",
            component: lazy(() => import("@/pages/system/dictionary")),
            meta: {
              access: "dictionary:view",
            },
          },
          {
            path: "file",
            name: "file",
            component: lazy(() => import("@/pages/system/file")),
            meta: {
              access: "file:view",
            },
          },
          {
            path: "log",
            name: "log",
            component: lazy(() => import("@/pages/system/log")),
            meta: {
              access: "log:view",
            },
          },
        ],
      },
      {
        path: "account",
        name: "account",
        meta: {
          icon: "UserOutlined",
        },
        children: [
          {
            path: "settings",
            name: "settings",
            component: lazy(() => import("@/pages/account/settings")),
            meta: {
              access: "settings:view",
            },
          },
        ],
      },
    ],
  },
];

export default route;
