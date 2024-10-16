import { departmentData } from "./department";
import { dictionaryData } from "./dictionary";
import { permissionData } from "./permission";
import { postData } from "./post";
import { roleData } from "./role";

export const userData = [
  {
    id: 1,
    department: {
      id: 1,
      code: "100",
      name: "Rye集团",
    },
    username: "admin",
    name: "管理员",
    sex: {
      dictValue: "1",
      dictLabel: "男",
    },
    userStatus: {
      dictValue: "0",
      dictLabel: "正常",
    },
    password: "21232f297a57a5a743894a0e4a801fc3",
    phone: "15887280652",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    email: "hanjie.pu@outlook.com",
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
    createTime: "2023-06-06 11:15:20",
    updateTime: "2023-06-06 11:15:20",
    posts: [
      {
        id: 1,
        code: "100001",
        name: "董事长",
      },
    ],
    roles: [
      {
        id: 1,
        code: "admin",
        name: "管理员",
      },
    ],
    permissions: permissionData.map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      menu: item.menu,
    })),
  },
  {
    id: 2,
    department: {
      id: 3,
      code: "102",
      name: "财务部",
    },
    username: "guest",
    name: "访客",
    sex: {
      dictValue: "2",
      dictLabel: "女",
    },
    userStatus: {
      dictValue: "0",
      dictLabel: "正常",
    },
    password: "084e0343a0486ff05530df6c705c8bb4",
    phone: "18650329448",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    email: "example@exp.com",
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
    createTime: "2023-06-06 11:15:20",
    updateTime: "2023-06-06 11:15:20",
    posts: [
      {
        id: 3,
        code: "102001",
        name: "财务部总经理",
      },
    ],
    roles: [
      {
        id: 2,
        code: "guest",
        name: "访客",
      },
    ],
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

export const getDeptTreeData = (deptData: API.DepartmentDetailTree[]) => {
  return deptData.map((item) => {
    const deptTree: API.DepartmentTree = {
      id: item.id,
      parentId: item.parentId,
      code: item.code,
      name: item.name,
    };
    if (item.children && item.children.length !== 0) {
      deptTree.children = getDeptTreeData(item.children);
    }
    return deptTree;
  });
};

export const userOptions = {
  departments: getDeptTreeData(departmentData),
  posts: postData.map((item) => ({
    id: item.id,
    code: item.code,
    name: item.name,
  })),
  roles: roleData.map((item) => ({
    id: item.id,
    code: item.code,
    name: item.name,
  })),
  sex: dictionaryData
    .filter((item) => item.dictType === "sex")
    .map((item) => ({
      dictValue: item.dictValue,
      dictLabel: item.dictLabel,
    })),
  userStatus: dictionaryData
    .filter((item) => item.dictType === "user_status")
    .map((item) => ({
      dictValue: item.dictValue,
      dictLabel: item.dictLabel,
    })),
};
