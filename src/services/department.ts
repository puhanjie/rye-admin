import request from "@/utils/request";

export async function addDepartment(data: API.DepartmentParams) {
  const res = await request<boolean>({
    url: "/api/v1/department",
    method: "post",
    data,
  });
  return res;
}

export async function removeDepartment(ids: number[]) {
  const res = await request<boolean>({
    url: "/api/v1/department",
    method: "delete",
    data: ids,
  });
  return res;
}

export async function editDepartment(data: API.PostParams) {
  const res = await request<boolean>({
    url: "/api/v1/department",
    method: "put",
    data,
  });
  return res;
}

export async function getDepartmentList(params?: API.DepartmentQuery) {
  const res = await request<API.DepartmentDetailTree[]>({
    url: "/api/v1/department/list",
    method: "get",
    params,
  });
  return res;
}

export async function getDepartmentOptions() {
  const res = await request<API.DepartmentOptions>({
    url: "/api/v1/department/options",
    method: "get",
  });
  return res;
}
