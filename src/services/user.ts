import request from '../utils/http';

export async function login(data: API.LoginParams) {
  const res = await request<API.Token>({
    url: '/api/v1/user/login',
    method: 'post',
    data
  });
  return res;
}

export async function addUser(data: API.UserParams) {
  const res = await request<boolean>({
    url: '/api/v1/user',
    method: 'post',
    data
  });
  return res;
}

export async function removeUser(ids: number[]) {
  const res = await request<boolean>({
    url: `/api/v1/user`,
    method: 'delete',
    data: ids
  });
  return res;
}

export async function editUser(data: API.UserParams) {
  const res = await request<boolean>({
    url: '/api/v1/user',
    method: 'put',
    data
  });
  return res;
}

export async function getInfo() {
  const res = await request<API.UserBasicInfo>({
    url: '/api/v1/user/info',
    method: 'get'
  });
  return res;
}

export async function getUsers(params?: API.UserPageQuery) {
  const res = await request<API.PageInfo<API.UserInfo[]>>({
    url: '/api/v1/user',
    method: 'get',
    params
  });
  return res;
}

export async function updatePassword(data: API.Password) {
  const res = await request<number>({
    url: '/api/v1/user/password',
    method: 'put',
    data
  });
  return res;
}
