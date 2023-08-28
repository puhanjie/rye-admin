import { Layout, Menu, theme } from 'antd';
import styles from './index.module.less';
import { Outlet, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import HeaderRight from './components/HeaderRight';
import { getToken } from '@/utils/auth';
import { getInfo } from '@/services/user';
import { setUserInfo } from '@/store/modules/user';
import { useDispatch } from 'react-redux';
import HeaderLeft from '@/layouts/components/HeaderLeft';
import Footer from '@/components/Footer';
import Logo from '@/layouts/components/Logo';
import Loading from '@/components/Loading';
import Tags from './components/Tags';
import { resolve } from '@/utils/path';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@/hooks/useRouter';

type MenuItem = {
  key: string;
  label?: string | undefined;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

const Layouts: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { permissions } = useAppSelector((state) => state.user);
  const { menuWidth, collapsedWidth, menuTheme } = useAppSelector((state) => state.app);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(permissions && permissions.length > 0 ? false : true);
  const { routes } = useRouter();
  const token = getToken();

  // 获取菜单数据
  const getMenuItems = (routes: RouteConfig[], parentPath: string = '') => {
    const menus: MenuItem[] = [];
    routes.map((item) => {
      const tmp: MenuItem = {
        key: resolve(parentPath, item.path),
        label: t(`menu.${item.name}`),
        icon: item?.meta?.icon
      };

      if (item?.children) {
        tmp.children = getMenuItems(item.children, tmp.key);
      }

      menus.push(tmp);
    });

    return menus;
  };

  // 获取活跃的菜单分组和菜单
  const getActiveMenus = (routeConfig: RouteConfig[], pathname: string) => {
    const matches = matchRoutes(routeConfig, pathname)?.filter((item) => item.pathname !== '/');
    const matchKeys = matches?.map((item) => item.pathname);
    const openKeys = matchKeys?.slice(0, matchKeys.length - 1);
    const selectKeys = matchKeys?.slice(-1);

    return [openKeys, selectKeys];
  };

  useEffect(() => {
    if (!permissions) {
      return;
    }
    // 刷新时重新获取权限
    if (token && permissions.length === 0) {
      // IIFE方式调用异步接口获取用户信息和权限数据,存入store
      (async () => {
        const res = await getInfo();
        dispatch(setUserInfo(res.data));
        setLoading(false);
      })();
    }
  }, [pathname, token]);

  // 根据路由配置获取菜单项
  const menuRoutes =
    routes.length > 0 ? routes.filter((item) => item.path === '/')[0].children : [];
  const menuItems = menuRoutes ? getMenuItems(menuRoutes) : [];

  const [openKeys, selectKeys] = getActiveMenus(routes, pathname);

  // 获取antd的背景色token值
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return loading ? (
    <Loading />
  ) : (
    <Layout className={styles['container']}>
      <Layout.Sider
        width={menuWidth}
        theme={menuTheme}
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={collapsedWidth}
        className={styles['sider']}
      >
        <Logo collapsed={collapsed} />
        <Menu
          theme={menuTheme}
          mode="inline"
          items={menuItems}
          defaultOpenKeys={openKeys}
          selectedKeys={selectKeys}
          onClick={(event) => navigate(event.key)}
          className={`${styles['menu']} scrollbar-dark`}
        />
      </Layout.Sider>
      <Layout className={styles['main']}>
        <Layout.Header style={{ backgroundColor: colorBgContainer }} className={styles['header']}>
          <HeaderLeft
            className={styles['header-left']}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
          <HeaderRight />
        </Layout.Header>
        <Tags />
        <Layout.Content className={`${styles['content']} scrollbar-light`}>
          <Outlet />
        </Layout.Content>
        <Layout.Footer className={styles['footer']}>
          <Footer />
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default Layouts;
