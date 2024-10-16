import { permissionOptions } from "@/data/permission";
import { success } from "@/utils/unify";
import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json(
    success<API.PermissionOptions>(request.nextUrl.pathname, permissionOptions)
  );
}
