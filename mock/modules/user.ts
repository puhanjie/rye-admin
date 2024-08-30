import Mock from "mockjs";
import { url, fail, success } from "../utils";
import { getToken } from "@/utils/auth";
import { permissionData } from "./permission";
import { departmentData } from "./department";
import { postData } from "./post";
import { roleData } from "./role";
import { dictionaryData } from "./dictionary";

const userData = [
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

const getDeptTreeData = (deptData: API.DepartmentDetailTree[]) => {
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

const userOptions = {
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

Mock.mock(url("/api/v1/user/login"), "post", (params) => {
  const { username, password } = JSON.parse(params.body);
  const user = userData.filter((item) => item.username === username)[0];

  if (!user) {
    return fail("用户不存在");
  }
  if (user.password !== password) {
    return fail("密码错误");
  }
  return success<string>(`${user.username}-token`);
});

Mock.mock(url("/api/v1/user"), "post", () => {
  return success<boolean>(true);
});

Mock.mock(url("/api/v1/user"), "delete", () => {
  return success<boolean>(true);
});

Mock.mock(url("/api/v1/user"), "put", () => {
  return success<boolean>(true);
});

Mock.mock(url("/api/v1/user/info"), "get", () => {
  const token = getToken();
  if (token) {
    const username = token.split("-")[0];
    const user = userData.filter((item) => item.username === username)[0];
    if (user) {
      const {
        id,
        username,
        name,
        sex,
        phone,
        avatar,
        email,
        roles,
        permissions,
      } = user;
      return success<API.UserBasicInfo>({
        id,
        username,
        name,
        sex,
        phone,
        avatar,
        email,
        roles,
        permissions,
      });
    }
  }
  return fail("查询失败");
});

Mock.mock(url("/api/v1/user/info"), "put", () => {
  return success<boolean>(true);
});

Mock.mock(RegExp(url("/api/v1/user/list")), "get", () => {
  const userList: API.UserInfo[] = userData.map((item) => {
    return {
      id: item.id,
      department: item.department,
      username: item.username,
      name: item.name,
      sex: item.sex,
      userStatus: item.userStatus,
      phone: item.phone,
      avatar: item.avatar,
      email: item.email,
      createUser: item.createUser,
      updateUser: item.updateUser,
      createTime: item.createTime,
      updateTime: item.updateTime,
      posts: item.posts,
      roles: item.roles,
    };
  });
  const pageList: API.Page<API.UserInfo[]> = {
    records: userList,
    total: userList.length,
    size: 2,
    current: 1,
    pages: 10,
  };
  return success<API.Page<API.UserInfo[]>>(pageList);
});

Mock.mock(url("/api/v1/user/password"), "put", () => {
  return success<number>(1);
});

Mock.mock(url("/api/v1/user/avatar"), "put", () => {
  return success<string>(
    "http://localhost:8088/res/upload/20230726/e041970e-87c8-4009-b434-1ede1aa0ce61.png"
  );
});

Mock.mock(url("/api/v1/user/options"), "get", () => {
  return success<API.UserOptions>(userOptions);
});
