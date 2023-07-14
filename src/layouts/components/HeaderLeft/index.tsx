import React from 'react';
import styles from './index.module.less';
import { Breadcrumb } from 'antd';
import { matchRoutes, useLocation } from 'react-router-dom';
import { routeConfig } from '@/router';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string | undefined;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderLeft: React.FC<Props> = ({ className, collapsed, setCollapsed }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const Trigger = () => {
    return React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: styles['trigger'],
      onClick: () => setCollapsed(!collapsed)
    });
  };

  // 生成面包屑
  const renderBreadcrumbs = (routeConfig: RouteConfig[], currentPath: string) => {
    const routeMatch = matchRoutes(routeConfig, currentPath);
    if (routeMatch) {
      const match = routeMatch.filter((item) => item.pathname !== '/');
      const breadcrumbs = match.map((item) => {
        return {
          className: styles['breadcrumb-items'],
          title: t(`menu.${item.route.name}`)
        };
      });
      return breadcrumbs;
    }
  };

  return (
    <div className={className}>
      <Trigger />
      <Breadcrumb
        className={styles['breadcrumb']}
        items={renderBreadcrumbs(routeConfig, pathname)}
      />
    </div>
  );
};

export default HeaderLeft;
