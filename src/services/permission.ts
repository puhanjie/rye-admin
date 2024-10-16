import { clientRequest } from "@/utils/request";

export async function addPermission(data: API.PermissionParams) {
  const res = await clientRequest<boolean>({
    url: "/api/v1/permission",
    method: "post",
    data,
  });
  return res;
}

export async function removePermission(ids: number[]) {
  const res = await clientRequest<boolean>({
    url: "/api/v1/permission",
    method: "delete",
    data: ids,
  });
  return res;
}

export async function editPermission(data: API.PermissionParams) {
  const res = await clientRequest<boolean>({
    url: "/api/v1/permission",
    method: "put",
    data,
  });
  return res;
}

export async function getPermissionList(params?: API.PermissionQuery) {
  const res = await clientRequest<API.Page<API.PermissionInfo[]>>({
    url: "/api/v1/permission/list",
    method: "get",
    params,
  });
  return res;
}

export async function getPermissionOptions() {
  const res = await clientRequest<API.PermissionOptions>({
    url: "/api/v1/permission/options",
    method: "get",
  });
  return res;
}
