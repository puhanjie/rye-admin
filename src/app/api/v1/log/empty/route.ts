import { success } from "@/utils/unify";
import { type NextRequest, NextResponse } from "next/server";

export function DELETE(request: NextRequest) {
  return NextResponse.json(success<boolean>(request.nextUrl.pathname, true));
}