import { type NextRequest, NextResponse } from "next/server";
import { success } from "@/utils/unify";
import { userData } from "@/data/user";

export function GET(request: NextRequest) {
  const userList: API.UserInfo[] = userData.map((item) => {
    return {
      id: item.id,
      department: item.department,
      username: item.username,
      name: item.name,
      sex: item.sex,
      userStatus: item.userStatus,
      phone: item.phone,
      avatar: item.avatar,
      email: item.email,
      createUser: item.createUser,
      updateUser: item.updateUser,
      createTime: item.createTime,
      updateTime: item.updateTime,
      posts: item.posts,
      roles: item.roles,
    };
  });
  const pageList: API.Page<API.UserInfo[]> = {
    records: userList,
    total: userList.length,
    size: 2,
    current: 1,
    pages: 10,
  };
  return NextResponse.json(
    success<API.Page<API.UserInfo[]>>(request.nextUrl.pathname, pageList)
  );
}
