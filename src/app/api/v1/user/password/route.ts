import { success } from "@/utils/unify";
import { NextRequest, NextResponse } from "next/server";

export function PUT(request: NextRequest) {
  return NextResponse.json(success<number>(request.nextUrl.pathname, 1));
}
