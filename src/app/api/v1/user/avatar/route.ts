import { success } from "@/utils/unify";
import { type NextRequest, NextResponse } from "next/server";

export function PUT(request: NextRequest) {
  return NextResponse.json(
    success<string>(
      request.nextUrl.pathname,
      "http://localhost:8088/res/upload/20230726/e041970e-87c8-4009-b434-1ede1aa0ce61.png"
    )
  );
}
