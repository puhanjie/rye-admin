import { type NextRequest, NextResponse } from "next/server";
import { success } from "@/utils/unify";

export function POST(request: NextRequest) {
  return NextResponse.json(success<boolean>(request.nextUrl.pathname, true));
}

export function DELETE(request: NextRequest) {
  return NextResponse.json(success<boolean>(request.nextUrl.pathname, true));
}

export function PUT(request: NextRequest) {
  return NextResponse.json(success<boolean>(request.nextUrl.pathname, true));
}
