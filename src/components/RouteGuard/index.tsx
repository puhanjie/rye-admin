import routeConfig from '@/router';
import { getToken } from '@/utils/auth';
import { getDefaultPath } from '@/utils/route';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, matchRoutes, useLocation } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const RouteGuard: React.FC<Props> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const token = getToken();
  const { pathname } = useLocation();
  const routeMatch = matchRoutes(routeConfig, pathname);
  const currentRoute = routeMatch && routeMatch.slice(-1)[0].route;

  useEffect(() => {
    if (currentRoute?.name) {
      document.title = `${t('app.abbreviation')} - ${t(`menu.${currentRoute.name}`)}`;
    }
  }, [pathname, language]);

  // 路由鉴权
  if (token) {
    if (pathname === '/login') {
      return <Navigate to="/" replace />;
    }
    // 若该路由为分组，则跳转到子路由中第一个路由
    if (currentRoute?.children) {
      const defaultPath = getDefaultPath(currentRoute);
      return <Navigate to={defaultPath} replace />;
    }
  } else {
    // 无token
    if (pathname !== '/login') {
      // 访问非登录页面，统一重定向至登录页
      return <Navigate to="/login" replace />;
    }
  }
  // 必须用空元素包裹children，否则会报类型错误
  return <>{children}</>;
};

export default RouteGuard;
