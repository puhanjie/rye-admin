import route from "@/config/route";
import { useUserStore } from "@/store/user";
import { getAuthRoute } from "@/utils/route";

export function useAuthRoute() {
  const permissions = useUserStore((state) => state.permissions);

  const authRoute = permissions
    ? getAuthRoute(
        route,
        permissions.map((item) => item.code)
      )
    : [];

  return authRoute;
}
