import { clientRequest } from "@/utils/request";

export async function removeLog(ids: number[]) {
  const res = await clientRequest<boolean>({
    url: "/api/v1/log",
    method: "delete",
    data: ids,
  });
  return res;
}

export async function emptyLog() {
  const res = await clientRequest<boolean>({
    url: "/api/v1/log/empty",
    method: "delete",
  });
  return res;
}

export async function getLogList(params?: API.LogQuery) {
  const res = await clientRequest<API.Page<API.LogInfo[]>>({
    url: "/api/v1/log/list",
    method: "get",
    params,
  });
  return res;
}
