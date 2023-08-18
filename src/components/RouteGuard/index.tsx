import routeConfig from '@/router';
import { useAppSelector } from '@/store';
import { getToken } from '@/utils/auth';
import { getAuthRoutes, getDefaultPath } from '@/utils/route';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const RouteGuard: React.FC<Props> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const token = getToken();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { permissions } = useAppSelector((state) => state.user);
  let authRoutes: RouteConfig[] = [];
  if (permissions) {
    authRoutes = getAuthRoutes(
      routeConfig,
      permissions.map((item) => item.name)
    );
  }
  const routeMatch = matchRoutes(authRoutes, pathname);
  const currentRoute = routeMatch && routeMatch.slice(-1)[0].route;

  useEffect(() => {
    document.title =
      currentRoute?.name && currentRoute.path !== '/'
        ? `${t('app.abbreviation')} - ${t(`menu.${currentRoute.name}`)}`
        : t('app.abbreviation');

    // 无token
    if (!token) {
      return navigate('/login', { replace: true });
    }

    if (pathname === '/login') {
      return navigate('/home', { replace: true });
    }

    // 若该路由为分组,则跳转到子路由中第一个路由
    if (currentRoute?.children && currentRoute.children.length > 0) {
      const defaultPath = getDefaultPath(currentRoute);
      return navigate(defaultPath, { replace: true });
    }
  }, [pathname, language, permissions, token]);

  // 必须用空元素包裹children,否则会报类型错误
  return <>{children}</>;
};

export default RouteGuard;
