import { clientRequest } from "@/utils/request";

export async function uploadFile(data: FormData) {
  const res = await clientRequest<API.File[]>({
    url: "/api/v1/file",
    method: "post",
    data,
  });
  return res;
}

export async function removeFile(path: string) {
  const res = await clientRequest<boolean>({
    url: "/api/v1/file",
    method: "delete",
    data: path,
  });
  return res;
}

export async function downloadFile(path: string) {
  const res = await clientRequest<Blob>({
    url: "/api/v1/file",
    method: "get",
    responseType: "blob",
    params: { path },
  });
  return res;
}

export async function getFileList(params?: API.FileQuery) {
  const res = await clientRequest<API.Page<API.FileInfo[]>>({
    url: "/api/v1/file/list",
    method: "get",
    params,
  });
  return res;
}
