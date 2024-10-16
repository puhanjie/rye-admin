import { clientRequest, serverRequest } from "@/utils/request";

export async function login(data: API.LoginParams) {
  const res = await clientRequest<string>({
    url: "/api/v1/user/login",
    method: "post",
    data,
  });
  return res;
}

export async function addUser(data: API.UserParams) {
  const res = await clientRequest<boolean>({
    url: "/api/v1/user",
    method: "post",
    data,
  });
  return res;
}

export async function removeUser(ids: number[]) {
  const res = await clientRequest<boolean>({
    url: "/api/v1/user",
    method: "delete",
    data: ids,
  });
  return res;
}

export async function editUser(data: API.UserParams) {
  const res = await clientRequest<boolean>({
    url: "/api/v1/user",
    method: "put",
    data,
  });
  return res;
}

export async function getInfo() {
  const res = await clientRequest<API.UserBasicInfo>({
    url: "/api/v1/user/info",
    method: "get",
  });
  return res;
}

export async function editInfo(data: API.BasicInfoParams) {
  const res = await clientRequest<boolean>({
    url: "/api/v1/user/info",
    method: "put",
    data,
  });
  return res;
}

export async function getUserList(params?: API.UserQuery) {
  const res = await clientRequest<API.Page<API.UserInfo[]>>({
    url: "/api/v1/user/list",
    method: "get",
    params,
  });
  return res;
}

export async function updatePassword(data: API.PasswordParams) {
  const res = await clientRequest<number>({
    url: "/api/v1/user/password",
    method: "put",
    data,
  });
  return res;
}

export async function getUserOptions() {
  const res = await clientRequest<API.UserOptions>({
    url: "/api/v1/user/options",
    method: "get",
  });
  return res;
}

export async function getPermissions(token: string) {
  const res = await serverRequest<API.UserBasicInfo>({
    url: "/api/v1/user/info",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data?.permissions;
}
