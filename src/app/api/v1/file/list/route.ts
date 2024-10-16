import { type NextRequest, NextResponse } from "next/server";
import { success } from "@/utils/unify";
import { fileData } from "@/data/file";

export function GET(request: NextRequest) {
  const pageList: API.Page<API.FileInfo[]> = {
    records: fileData,
    total: fileData.length,
    size: 2,
    current: 1,
    pages: 10,
  };
  return NextResponse.json(
    success<API.Page<API.FileInfo[]>>(request.nextUrl.pathname, pageList)
  );
}
