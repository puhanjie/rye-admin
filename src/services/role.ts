import request from '../utils/http';

export async function addRole(data: API.RoleInfo) {
  const res = await request<boolean>({
    url: '/api/v1/role',
    method: 'post',
    data
  });
  return res;
}

export async function removeRole(id: number) {
  const res = await request<boolean>({
    url: `/api/v1/role/${id}`,
    method: 'delete'
  });
  return res;
}

export async function editRole(data: API.RoleInfo) {
  const res = await request<boolean>({
    url: '/api/v1/role',
    method: 'put',
    data
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
