export const logData = [
  {
    id: 1,
    url: "GET /api/v1/user",
    code: 0,
    message: "成功",
    operateUser: {
      id: 1,
      username: "admin",
      name: "管理员",
    },
    operateTime: "2023-06-09 11:15:24",
  },
  {
    id: 2,
    url: "POST /api/v1/user",
    code: 0,
    message: "成功",
    operateUser: {
      id: 1,
      username: "admin",
      name: "管理员",
    },
    operateTime: "2023-06-09 11:15:24",
  },
  {
    id: 3,
    url: "GET /api/v1/role",
    code: -1,
    message: "失败",
    operateUser: {
      id: 1,
      username: "admin",
      name: "管理员",
    },
    operateTime: "2023-06-09 11:15:24",
  },
];
