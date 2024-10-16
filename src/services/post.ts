import { clientRequest } from "@/utils/request";

export async function addPost(data: API.PostParams) {
  const res = await clientRequest<boolean>({
    url: "/api/v1/post",
    method: "post",
    data,
  });
  return res;
}

export async function removePost(ids: number[]) {
  const res = await clientRequest<boolean>({
    url: "/api/v1/post",
    method: "delete",
    data: ids,
  });
  return res;
}

export async function editPost(data: API.PostParams) {
  const res = await clientRequest<boolean>({
    url: "/api/v1/post",
    method: "put",
    data,
  });
  return res;
}

export async function getPostList(params?: API.PostQuery) {
  const res = await clientRequest<API.Page<API.PostInfo[]>>({
    url: "/api/v1/post/list",
    method: "get",
    params,
  });
  return res;
}

export async function getPostOptions() {
  const res = await clientRequest<API.PostOptions>({
    url: "/api/v1/post/options",
    method: "get",
  });
  return res;
}
