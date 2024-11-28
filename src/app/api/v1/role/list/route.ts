import { type NextRequest, NextResponse } from "next/server";
import { success } from "@/utils/unify";
import { roleData } from "@/../mock/role";
import { getUrlParams } from "@/utils/url";

export function GET(request: NextRequest) {
  const pageNum = Number(getUrlParams(request.url, "pageNum"))
    ? Number(getUrlParams(request.url, "pageNum"))
    : 1;
  const pageSize = Number(getUrlParams(request.url, "pageSize"))
    ? Number(getUrlParams(request.url, "pageSize"))
    : 10;
  const data = roleData.filter((item, index) => {
    return index >= (pageNum - 1) * pageSize && index < pageNum * pageSize;
  });
  const pageList: API.Page<API.RoleInfo[]> = {
    records: data,
    total: roleData.length,
    size: data.length,
    current: pageNum,
    pages: Math.ceil(roleData.length / pageSize),
  };
  return NextResponse.json(
    success<API.Page<API.RoleInfo[]>>(request.nextUrl.pathname, pageList)
  );
}
