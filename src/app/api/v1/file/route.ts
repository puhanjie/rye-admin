import { success } from "@/utils/unify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("files");

  return NextResponse.json(
    success<API.File>(request.nextUrl.pathname, {
      path: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
      name: file?.toString.name as string,
    })
  );
}

export function DELETE(request: NextRequest) {
  return NextResponse.json(success<boolean>(request.nextUrl.pathname, true));
}

export function GET(request: NextRequest) {
  return NextResponse.json(success<boolean>(request.nextUrl.pathname, true));
}
