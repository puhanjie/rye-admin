import { Layout, Menu, theme } from 'antd';
import styles from './index.module.less';
import { getMenuItems, getActiveMenus, getTags } from '../utils/route';
import { routeConfig } from '../router';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import HeaderRight from './components/HeaderRight';
import { getToken } from '@/utils/auth';
import { getCurrentUser } from '@/services/user';
import { setUserInfo } from '@/store/modules/user';
import { useDispatch } from 'react-redux';
import HeaderLeft from '@/layouts/components/HeaderLeft';
import Footer from '@/components/Footer';
import Logo from '@/layouts/components/Logo';
import Loading from '@/components/Loading';
import Tags from './components/Tags';
import { setAppTags } from '@/store/modules/app';

const Layouts: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { permissions } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(permissions && permissions.length > 0 ? false : true);
  const token = getToken();
  const [openKeys, selectKeys] = getActiveMenus(routeConfig, pathname);
  const { tags } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (!permissions) {
      return;
    }
    // 刷新时重新获取权限
    if (token && permissions.length === 0) {
      // IIFE方式调用异步接口获取用户信息和权限数据，存入store
      (async () => {
        const res = await getCurrentUser();
        dispatch(setUserInfo(res.data));
        setLoading(false);
      })();
    }
    dispatch(setAppTags(getTags(routeConfig, pathname, tags)));
  }, [pathname, token]);

  // 根据路由配置获取菜单项
  const menuRoutes = routeConfig.filter((item) => item.path === '/')[0].children;
  // menuRoutes和permissions不为空才返回menuItems
  const menuItems = menuRoutes && permissions && getMenuItems(menuRoutes, '', permissions);

  // 获取antd的背景色token值
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return loading ? (
    <Loading />
  ) : (
    <Layout className={styles['container']}>
      <Layout.Sider
        width="210"
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth="48"
        className={styles['sider']}
      >
        <Logo collapsed={collapsed} />
        <Menu
          theme="light"
          mode="inline"
          items={menuItems}
          defaultOpenKeys={openKeys}
          selectedKeys={selectKeys}
          onClick={(event) => {
            dispatch(setAppTags(getTags(routeConfig, pathname, tags)));
            navigate(event.key);
          }}
          className={`${styles['menu']} scrollbar`}
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
        <Tags currentPath={pathname} />
        <Layout.Content className={`${styles['content']} scrollbar`}>
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
