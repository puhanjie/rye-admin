import { type NextRequest, NextResponse } from "next/server";
import { success } from "@/utils/unify";
import { postData } from "@/data/post";

export function GET(request: NextRequest) {
  const pageList: API.Page<API.PostInfo[]> = {
    records: postData,
    total: postData.length,
    size: 4,
    current: 1,
    pages: 10,
  };
  return NextResponse.json(
    success<API.Page<API.PostInfo[]>>(request.nextUrl.pathname, pageList)
  );
}
