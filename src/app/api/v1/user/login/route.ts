import { userData } from "@/data/user";
import { fail, success } from "@/utils/unify";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const user = userData.filter((item) => item.username === username)[0];

  if (!user) {
    return NextResponse.json(fail(request.nextUrl.pathname, "用户不存在"));
  }
  if (user.password !== password) {
    return NextResponse.json(fail(request.nextUrl.pathname, "密码错误"));
  }
  return NextResponse.json(
    success<string>(request.nextUrl.pathname, `${user.username}-token`)
  );
}
