import { type NextRequest, NextResponse } from "next/server";
import { success } from "@/utils/unify";
import { roleData } from "@/data/role";

export function GET(request: NextRequest) {
  const pageList: API.Page<API.RoleInfo[]> = {
    records: roleData,
    total: roleData.length,
    size: 2,
    current: 1,
    pages: 10,
  };
  return NextResponse.json(
    success<API.Page<API.RoleInfo[]>>(request.nextUrl.pathname, pageList)
  );
}
