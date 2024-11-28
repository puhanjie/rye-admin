import { type NextRequest, NextResponse } from "next/server";
import { success } from "@/utils/unify";
import { logData } from "@/../mock/log";
import { getUrlParams } from "@/utils/url";

export function GET(request: NextRequest) {
  const pageNum = Number(getUrlParams(request.url, "pageNum"))
    ? Number(getUrlParams(request.url, "pageNum"))
    : 1;
  const pageSize = Number(getUrlParams(request.url, "pageSize"))
    ? Number(getUrlParams(request.url, "pageSize"))
    : 10;
  const data = logData.filter((item, index) => {
    return index >= (pageNum - 1) * pageSize && index < pageNum * pageSize;
  });
  const pageList: API.Page<API.LogInfo[]> = {
    records: data,
    total: logData.length,
    size: data.length,
    current: pageNum,
    pages: Math.ceil(logData.length / pageSize),
  };
  return NextResponse.json(
    success<API.Page<API.LogInfo[]>>(request.nextUrl.pathname, pageList)
  );
}
