import { postOptions } from "@/../mock/post";
import { success } from "@/utils/unify";
import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json(
    success<API.PostOptions>(request.nextUrl.pathname, postOptions)
  );
}
