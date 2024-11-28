import { type NextRequest, NextResponse } from "next/server";
import { fail, success } from "@/utils/unify";
import { userData } from "@/../mock/user";

export function GET(request: NextRequest) {
  const token = request.headers.get("Authorization");
  if (token) {
    const username = token.split(" ")[1].split("-")[0];
    const user = userData.filter((item) => item.username === username)[0];
    if (user) {
      const {
        id,
        username,
        name,
        sex,
        phone,
        avatar,
        email,
        roles,
        permissions,
      } = user;
      return NextResponse.json(
        success<API.UserBasicInfo>(request.nextUrl.pathname, {
          id,
          username,
          name,
          sex,
          phone,
          avatar,
          email,
          roles,
          permissions,
        })
      );
    }
  }
  return NextResponse.json(fail(request.nextUrl.pathname, "查询失败"));
}

export function PUT(request: NextRequest) {
  return NextResponse.json(success<boolean>(request.nextUrl.pathname, true));
}
