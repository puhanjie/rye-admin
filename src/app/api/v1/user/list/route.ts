import { type NextRequest, NextResponse } from "next/server";
import { success } from "@/utils/unify";
import { userData } from "@/../mock/user";
import { getUrlParams } from "@/utils/url";

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
  const pageNum = Number(getUrlParams(request.url, "pageNum"))
    ? Number(getUrlParams(request.url, "pageNum"))
    : 1;
  const pageSize = Number(getUrlParams(request.url, "pageSize"))
    ? Number(getUrlParams(request.url, "pageSize"))
    : 10;
  const data = userList.filter((item, index) => {
    return index >= (pageNum - 1) * pageSize && index < pageNum * pageSize;
  });
  const pageList: API.Page<API.UserInfo[]> = {
    records: data,
    total: userList.length,
    size: data.length,
    current: pageNum,
    pages: Math.ceil(userList.length / pageSize),
  };
  return NextResponse.json(
    success<API.Page<API.UserInfo[]>>(request.nextUrl.pathname, pageList)
  );
}
