import { userOptions } from "@/../mock/user";
import { success } from "@/utils/unify";
import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json(
    success<API.UserOptions>(request.nextUrl.pathname, userOptions)
  );
}
