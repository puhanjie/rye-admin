import { departmentData } from "@/../mock/department";
import { success } from "@/utils/unify";
import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json(
    success<API.DepartmentDetailTree[]>(
      request.nextUrl.pathname,
      departmentData
    )
  );
}
