import { useAppSelector } from "@/store";

export default function AuthWrapper({
  permission,
  children,
}: {
  permission: string;
  children: React.ReactNode;
}) {
  const { permissions } = useAppSelector((state) => state.user);

  if (!permissions) {
    return null;
  }
  const findData = permissions.filter((item) => item.code === permission);
  if (findData.length <= 0) {
    return null;
  }
  return <>{children}</>;
}
