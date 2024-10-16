"use client";

import { useUserStore } from "@/store/user";

export default function AuthWrapper({
  permission,
  children,
}: {
  permission: string;
  children: React.ReactNode;
}) {
  const permissions = useUserStore((state) => state.permissions);

  if (!permissions) {
    return null;
  }
  const findData = permissions.filter((item) => item.code === permission);
  if (findData.length <= 0) {
    return null;
  }
  return <>{children}</>;
}
