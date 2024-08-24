import request from "@/utils/request";

export async function login(data: API.LoginParams) {
  const res = await request<string>({
    url: "/api/v1/user/login",
    method: "post",
    data,
  });
  return res;
}

export async function addUser(data: API.UserParams) {
  const res = await request<boolean>({
    url: "/api/v1/user",
    method: "post",
    data,
  });
  return res;
}

export async function removeUser(ids: number[]) {
  const res = await request<boolean>({
    url: "/api/v1/user",
    method: "delete",
    data: ids,
  });
  return res;
}

export async function editUser(data: API.UserParams) {
  const res = await request<boolean>({
    url: "/api/v1/user",
    method: "put",
    data,
  });
  return res;
}

export async function getInfo() {
  const res = await request<API.UserBasicInfo>({
    url: "/api/v1/user/info",
    method: "get",
  });
  return res;
}

export async function editInfo(data: API.BasicInfoParams) {
  const res = await request<boolean>({
    url: "/api/v1/user/info",
    method: "put",
    data,
  });
  return res;
}

export async function getUserList(params?: API.UserQuery) {
  const res = await request<API.Page<API.UserInfo[]>>({
    url: "/api/v1/user/list",
    method: "get",
    params,
  });
  return res;
}

export async function updatePassword(data: API.PasswordParams) {
  const res = await request<number>({
    url: "/api/v1/user/password",
    method: "put",
    data,
  });
  return res;
}

export async function getUserOptions() {
  const res = await request<API.UserOptions>({
    url: "/api/v1/user/options",
    method: "get",
  });
  return res;
}
