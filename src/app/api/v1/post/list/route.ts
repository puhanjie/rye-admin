import { type NextRequest, NextResponse } from "next/server";
import { success } from "@/utils/unify";
import { postData } from "@/../mock/post";
import { getUrlParams } from "@/utils/url";

export function GET(request: NextRequest) {
  const pageNum = Number(getUrlParams(request.url, "pageNum"))
    ? Number(getUrlParams(request.url, "pageNum"))
    : 1;
  const pageSize = Number(getUrlParams(request.url, "pageSize"))
    ? Number(getUrlParams(request.url, "pageSize"))
    : 10;
  const data = postData.filter((item, index) => {
    return index >= (pageNum - 1) * pageSize && index < pageNum * pageSize;
  });
  const pageList: API.Page<API.PostInfo[]> = {
    records: data,
    total: postData.length,
    size: data.length,
    current: pageNum,
    pages: Math.ceil(postData.length / pageSize),
  };
  return NextResponse.json(
    success<API.Page<API.PostInfo[]>>(request.nextUrl.pathname, pageList)
  );
}
