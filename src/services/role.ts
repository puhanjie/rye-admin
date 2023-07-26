import request from '../utils/http';

export async function addRole(data: API.RoleParams) {
  const res = await request<boolean>({
    url: '/api/v1/role',
    method: 'post',
    data
  });
  return res;
}

export async function removeRole(ids: number[]) {
  const res = await request<boolean>({
    url: `/api/v1/role`,
    method: 'delete',
    data: ids
  });
  return res;
}

export async function editRole(data: API.RoleParams) {
  const res = await request<boolean>({
    url: '/api/v1/role',
    method: 'put',
    data
  });
  return res;
}

export async function getRoles(params?: API.RolePageQuery) {
  const res = await request<API.PageInfo<API.RoleInfo[]>>({
    url: '/api/v1/role',
    method: 'get',
    params
  });
  return res;
}

export async function getRoleList() {
  const res = await request<API.RoleInfo[]>({
    url: '/api/v1/role/list',
    method: 'get'
  });
  return res;
}
