import { Drawer, Layout, Menu } from "antd";
import Logo from "@/components/logo";
import { useState } from "react";
import { createStyles } from "antd-style";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { getActiveMenu, getMenu } from "@/utils/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { useRouter } from "@/hooks/useRouter";
import { useAppSelector } from "@/store";

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
  const { menuWidth, headerHeight, collapsedWidth, menuTheme } = useAppSelector(
    (state) => state.app
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { authRoute } = useRouter();

  // 根据路由配置获取菜单项
  const menuRoute =
    authRoute.length > 0
      ? authRoute.filter((item) => item.path === "/")[0].children
      : [];
  const menu = menuRoute ? getMenu(menuRoute) : [];

  const [openKeys, selectKeys] = getActiveMenu(authRoute, pathname);

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
            navigate(event.key);
            onClose();
          }}
          className="overflow-auto"
        />
      </Drawer>
      {/* PC及平板端菜单 */}
      <Layout.Sider
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
          selectedKeys={[pathname]}
          style={{
            height: `calc(100% - ${headerHeight}px)`,
            overflow: "auto",
          }}
          onClick={(event) => navigate(event.key)}
        />
      </Layout.Sider>
      <Trigger />
    </div>
  );
}
