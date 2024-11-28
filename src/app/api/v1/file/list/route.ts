import { type NextRequest, NextResponse } from "next/server";
import { success } from "@/utils/unify";
import { fileData } from "@/../mock/file";
import { getUrlParams } from "@/utils/url";

export function GET(request: NextRequest) {
  const pageNum = Number(getUrlParams(request.url, "pageNum"))
    ? Number(getUrlParams(request.url, "pageNum"))
    : 1;
  const pageSize = Number(getUrlParams(request.url, "pageSize"))
    ? Number(getUrlParams(request.url, "pageSize"))
    : 10;
  const data = fileData.filter((item, index) => {
    return index >= (pageNum - 1) * pageSize && index < pageNum * pageSize;
  });
  const pageList: API.Page<API.FileInfo[]> = {
    records: data,
    total: fileData.length,
    size: data.length,
    current: pageNum,
    pages: Math.ceil(fileData.length / pageSize),
  };
  return NextResponse.json(
    success<API.Page<API.FileInfo[]>>(request.nextUrl.pathname, pageList)
  );
}
