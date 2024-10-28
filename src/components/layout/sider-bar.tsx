"use client";

import { Drawer, Layout, Menu } from "antd";
import Logo from "@/components/logo";
import { useEffect, useState } from "react";
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

const getOpenKeys = (pathname: string, route: Route[]) => {
  let openKeys: string[] = [];
  let isFind = false;
  for (let i = 0; i < route.length; i++) {
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
    // children中未匹配到,则清空openKeys
    openKeys = [];
  }
  return { openKeys, isFind };
};

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
  const authRoute = useAuthRoute();
  const defaultOpenKeys = getOpenKeys(pathname, authRoute).openKeys;
  const [stateOpenKeys, setStateOpenKeys] = useState(defaultOpenKeys);

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

  const onOpenChange = (openKeys: string[]) => {
    const removeKey = stateOpenKeys.find((key) => openKeys.indexOf(key) === -1);
    const addKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    const clickKey = (addKey ? addKey : removeKey) as string;
    const parentOpenKeys = getOpenKeys(clickKey, authRoute).openKeys;
    // 若点击已展开的菜单分组,则收起当前分组;若点击未展开的菜单分组,则展开新的分组
    const newOpenKeys = addKey ? [...parentOpenKeys, clickKey] : parentOpenKeys;
    // 重新设置展开的菜单分组
    setStateOpenKeys(newOpenKeys);
  };

  useEffect(() => {
    // pathname变化,菜单跟随展开对应菜单的分组
    const { openKeys } = getOpenKeys(pathname, authRoute);
    if (collapsed || openKeys === defaultOpenKeys) {
      // 菜单为收缩状态,不设置openKeys
      return;
    }
    setStateOpenKeys(openKeys);
  }, [pathname, collapsed]); // eslint-disable-line

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
        rootClassName="md:hidden"
      >
        <Logo collapsed={false} className="bg-[#001529]" />
        <Menu
          theme={menuTheme}
          mode="inline"
          items={menu}
          defaultOpenKeys={stateOpenKeys}
          openKeys={stateOpenKeys}
          selectedKeys={[pathname]}
          onOpenChange={onOpenChange}
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
        className="h-full hidden md:block"
      >
        <Logo collapsed={collapsed} className="bg-[#001529]" />
        <Menu
          theme={menuTheme}
          mode="inline"
          items={menu}
          defaultOpenKeys={stateOpenKeys}
          openKeys={stateOpenKeys}
          selectedKeys={[pathname]}
          onOpenChange={onOpenChange}
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
