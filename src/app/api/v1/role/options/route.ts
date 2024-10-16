import { roleOptions } from "@/data/role";
import { success } from "@/utils/unify";
import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json(
    success<API.RoleOptions>(request.nextUrl.pathname, roleOptions)
  );
}
