"use client";

import { Drawer, Layout, Menu } from "antd";
import Logo from "@/components/logo";
import { useState } from "react";
import { createStyles } from "antd-style";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useAppStore } from "@/store/app";
import { usePathname, useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Route } from "@/config/route";
import { useAuthRoute } from "@/hooks/route";

const { Sider } = Layout;

export type MenuItem = {
  key: string;
  label?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

const useStyle = createStyles(() => ({
  "drawer-body": {
    padding: "0 !important",
    background: "#001529",
  },
}));

export default function SiderBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const { styles } = useStyle();
  const { menuWidth, headerHeight, collapsedWidth, menuTheme } = useAppStore(
    (state) => state
  );
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations();

  const getMenu = (route: Route[]) => {
    const menus: MenuItem[] = [];
    route.map((item) => {
      const tmp: MenuItem = {
        key: item.path,
        label: t(`app.layout.menu.${item.name}`),
        icon: item.meta?.icon,
      };

      if (item?.children) {
        tmp.children = getMenu(item.children);
      }

      menus.push(tmp);
    });

    return menus;
  };
  const authRoute = useAuthRoute();
  const menu = getMenu(authRoute);

  const onClose = () => {
    setCollapsed(true);
    setOpen(false);
  };

  const Trigger = () => {
    return React.createElement(
      collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
      {
        className:
          "w-[18px] h-[18px] text-lg cursor-pointer absolute top-[15px] right-[-36px]",
        onClick: () => {
          setCollapsed(!collapsed);
          setOpen(!open);
        },
      }
    );
  };

  const getOpenKeys = (pathname: string, route: Route[]) => {
    let openKeys: string[] = [];
    let isFind = false;
    for (let i = 0; i < route.length; i++) {
      openKeys = [];
      if (route[i].path === pathname) {
        isFind = true;
        break;
      }
      if (route[i].children) {
        openKeys.push(route[i].path);
        const result = getOpenKeys(pathname, route[i].children as Route[]);
        for (let j = 0; j < result.openKeys.length; j++) {
          openKeys.push(result.openKeys[j]);
        }
        if (result.isFind) {
          isFind = true;
          break;
        }
      }
    }
    return { openKeys, isFind };
  };

  const getActiveKeys = (pathname: string, route: Route[]) => {
    const { openKeys } = getOpenKeys(pathname, route);
    return { openKeys, selectKeys: [pathname] };
  };

  const { openKeys, selectKeys } = getActiveKeys(pathname, authRoute);

  return (
    <div className="relative inline-block">
      {/* 手机端菜单 */}
      <Drawer
        width={menuWidth}
        placement="left"
        closeIcon={false}
        open={open}
        onClose={onClose}
        classNames={{
          body: styles["drawer-body"],
        }}
        rootClassName="sm:hidden"
      >
        <Logo collapsed={false} className="bg-[#001529]" />
        <Menu
          theme={menuTheme}
          mode="inline"
          items={menu}
          defaultOpenKeys={openKeys}
          selectedKeys={selectKeys}
          style={{
            height: `calc(100% - ${headerHeight}px)`,
            overflow: "auto",
          }}
          onClick={(event) => {
            router.push(event.key, { locale });
            onClose();
          }}
          className="overflow-auto"
        />
      </Drawer>
      {/* PC及平板端菜单 */}
      <Sider
        width={menuWidth}
        theme={menuTheme}
        trigger={null}
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        collapsedWidth={collapsedWidth}
        onBreakpoint={(broken) => setCollapsed(broken)}
        className="h-full hidden sm:block"
      >
        <Logo collapsed={collapsed} className="bg-[#001529]" />
        <Menu
          theme={menuTheme}
          mode="inline"
          items={menu}
          defaultOpenKeys={openKeys}
          selectedKeys={selectKeys}
          style={{
            height: `calc(100% - ${headerHeight}px)`,
            overflow: "auto",
          }}
          onClick={(event) => router.push(event.key, { locale })}
        />
      </Sider>
      <Trigger />
    </div>
  );
}
