import { departmentOptions } from "@/../mock/department";
import { success } from "@/utils/unify";
import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json(
    success<API.DepartmentOptions>(request.nextUrl.pathname, departmentOptions)
  );
}
