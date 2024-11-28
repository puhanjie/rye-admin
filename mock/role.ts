import { dictionaryData } from "./dictionary";
import { permissionData } from "./permission";

export const roleData = [
  {
    id: 1,
    code: "admin",
    name: "管理员",
    roleStatus: {
      dictValue: "0",
      dictLabel: "正常",
    },
    createUser: {
      id: 1,
      username: "admin",
      name: "管理员",
    },
    updateUser: {
      id: 1,
      username: "admin",
      name: "管理员",
    },
    createTime: "2023-06-09 11:15:24",
    updateTime: "2023-06-09 11:15:24",
    permissions: permissionData.map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      menu: item.menu,
    })),
  },
  {
    id: 2,
    code: "guest",
    name: "访客",
    roleStatus: {
      dictValue: "0",
      dictLabel: "正常",
    },
    createUser: {
      id: 1,
      username: "admin",
      name: "管理员",
    },
    updateUser: {
      id: 1,
      username: "admin",
      name: "管理员",
    },
    createTime: "2023-06-09 11:15:24",
    updateTime: "2023-06-09 11:15:24",
    permissions: [
      {
        id: 18,
        code: "settings:view",
        name: "查看",
        menu: "settings",
      },
    ],
  },
];

export const roleOptions = {
  roleStatus: dictionaryData
    .filter((item) => item.dictType === "role_status")
    .map((item) => ({
      dictValue: item.dictValue,
      dictLabel: item.dictLabel,
    })),
  permissions: permissionData.map((item) => ({
    id: item.id,
    code: item.code,
    name: item.name,
    menu: item.menu,
  })),
};
