import request from '../utils/http';

export async function addPermission(data: API.PermissionParams) {
  const res = await request<boolean>({
    url: '/api/v1/permission',
    method: 'post',
    data
  });
  return res;
}

export async function removePermission(ids: number[]) {
  const res = await request<boolean>({
    url: `/api/v1/permission`,
    method: 'delete',
    data: ids
  });
  return res;
}

export async function editPermission(data: API.PermissionParams) {
  const res = await request<boolean>({
    url: '/api/v1/permission',
    method: 'put',
    data
  });
  return res;
}

export async function getPermissionList(params?: API.PermissionPageQuery) {
  const res = await request<API.PageInfo<API.PermissionInfo[]>>({
    url: '/api/v1/permission/list',
    method: 'get',
    params
  });
  return res;
}

export async function getPermissions() {
  const res = await request<API.PermissionInfo[]>({
    url: '/api/v1/permission',
    method: 'get'
  });
  return res;
}
