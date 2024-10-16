import { type NextRequest, NextResponse } from "next/server";
import { success } from "@/utils/unify";
import { permissionData } from "@/data/permission";

export function GET(request: NextRequest) {
  const pageList: API.Page<API.PermissionInfo[]> = {
    records: permissionData,
    total: permissionData.length,
    size: 2,
    current: 1,
    pages: 10,
  };
  return NextResponse.json(
    success<API.Page<API.PermissionInfo[]>>(request.nextUrl.pathname, pageList)
  );
}
