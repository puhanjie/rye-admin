import { useRouter } from "@/hooks/useRouter";
import { useAppSelector } from "@/store";
import { getToken } from "@/utils/auth";
import { getDefaultPath } from "@/utils/route";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { permissions } = useAppSelector((state) => state.user);
  const { currentRoute } = useRouter();

  const language = i18n.language;
  const token = getToken();

  useEffect(() => {
    document.title =
      currentRoute?.route.name && currentRoute.route.path !== "/"
        ? `${t("app.abbreviation")} - ${t(
            `app.layout.menu.${currentRoute.route.name}`
          )}`
        : t("app.abbreviation");

    // 无token
    if (!token) {
      return navigate("/login", { replace: true });
    }

    if (pathname === "/login") {
      return navigate("/", { replace: true });
    }

    // 若该路由为分组,则跳转到子路由中第一个路由
    if (
      currentRoute?.route.children &&
      currentRoute.route.children.length > 0
    ) {
      const defaultPath = getDefaultPath(currentRoute.route);
      return navigate(defaultPath, { replace: true });
    }
  }, [pathname, language, permissions, token]);

  // 必须用空元素包裹children,否则会报类型错误
  return <>{children}</>;
}
