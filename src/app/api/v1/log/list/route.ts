import { type NextRequest, NextResponse } from "next/server";
import { success } from "@/utils/unify";
import { logData } from "@/data/log";

export function GET(request: NextRequest) {
  const pageList: API.Page<API.LogInfo[]> = {
    records: logData,
    total: logData.length,
    size: 3,
    current: 1,
    pages: 10,
  };
  return NextResponse.json(
    success<API.Page<API.LogInfo[]>>(request.nextUrl.pathname, pageList)
  );
}
