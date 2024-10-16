import { clientRequest } from "@/utils/request";

export async function addRole(data: API.RoleParams) {
  const res = await clientRequest<boolean>({
    url: "/api/v1/role",
    method: "post",
    data,
  });
  return res;
}

export async function removeRole(ids: number[]) {
  const res = await clientRequest<boolean>({
    url: "/api/v1/role",
    method: "delete",
    data: ids,
  });
  return res;
}

export async function editRole(data: API.RoleParams) {
  const res = await clientRequest<boolean>({
    url: "/api/v1/role",
    method: "put",
    data,
  });
  return res;
}

export async function getRoleList(params?: API.RoleQuery) {
  const res = await clientRequest<API.Page<API.RoleInfo[]>>({
    url: "/api/v1/role/list",
    method: "get",
    params,
  });
  return res;
}

export async function getRoleOptions() {
  const res = await clientRequest<API.RoleOptions>({
    url: "/api/v1/role/options",
    method: "get",
  });
  return res;
}
