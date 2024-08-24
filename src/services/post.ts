import request from "@/utils/request";

export async function addPost(data: API.PostParams) {
  const res = await request<boolean>({
    url: "/api/v1/post",
    method: "post",
    data,
  });
  return res;
}

export async function removePost(ids: number[]) {
  const res = await request<boolean>({
    url: "/api/v1/post",
    method: "delete",
    data: ids,
  });
  return res;
}

export async function editPost(data: API.PostParams) {
  const res = await request<boolean>({
    url: "/api/v1/post",
    method: "put",
    data,
  });
  return res;
}

export async function getPostList(params?: API.PostQuery) {
  const res = await request<API.Page<API.PostInfo[]>>({
    url: "/api/v1/post/list",
    method: "get",
    params,
  });
  return res;
}

export async function getPostOptions() {
  const res = await request<API.PostOptions>({
    url: "/api/v1/post/options",
    method: "get",
  });
  return res;
}
