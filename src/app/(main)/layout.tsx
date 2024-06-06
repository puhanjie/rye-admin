"use client";

import FooterBar from "@/components/footer-bar";
import HeaderBar from "@/components/header-bar";
import Logo from "@/components/logo";
import menu, { getMenu } from "@/config/menu";
import { Layout, Menu, Tabs, theme, Drawer } from "antd";
import { createStyles } from "antd-style";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const { Sider, Header, Content, Footer } = Layout;

const useStyle = createStyles(() => ({
  "drawer-body": {
    padding: "0 !important",
  },
}));

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const { styles } = useStyle();
  const router = useRouter();
  // 获取antd的背景色token值
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Layout className="w-full h-full">
      <Drawer
        width={210}
        placement="left"
        closeIcon={false}
        open={open}
        onClose={onClose}
        classNames={{
          body: styles["drawer-body"],
        }}
        rootClassName="sm:hidden"
      >
        <Menu
          theme="dark"
          mode="inline"
          items={getMenu(menu)}
          defaultOpenKeys={["system"]}
          selectedKeys={["user"]}
          style={{
            height: "100%",
          }}
          onClick={(event) => router.push(event.key)}
        />
      </Drawer>
      <Sider
        width={210}
        theme="dark"
        trigger={null}
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        collapsedWidth={48}
        onBreakpoint={(broken) => setCollapsed(broken)}
        className="h-full hidden sm:block"
      >
        <Logo collapsed={collapsed} />
        <Menu
          theme="dark"
          mode="inline"
          items={getMenu(menu)}
          defaultOpenKeys={["system"]}
          selectedKeys={["user"]}
          style={{
            flex: 1,
          }}
          onClick={(event) => router.push(event.key)}
        />
      </Sider>
      <Layout className="h-full">
        <Header
          style={{ backgroundColor: colorBgContainer }}
          className="!h-12 !px-4"
        >
          <HeaderBar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            open={open}
            setOpen={setOpen}
          />
        </Header>
        <Tabs
          activeKey="card2"
          type="editable-card"
          hideAdd
          size="small"
          tabBarGutter={0}
          tabPosition="top"
          items={[
            { key: "card1", label: "Card1" },
            { key: "card2", label: "Card2" },
            { key: "card3", label: "Card3" },
            { key: "card4", label: "Card4" },
            { key: "card5", label: "Card5" },
            { key: "card6", label: "Card6" },
          ]}
          tabBarStyle={{ height: 27, background: "white", margin: 0 }}
          className="bg-white h-7 border-y border-solid border-slate-200 m-0"
        />
        <Content className="px-3 pt-3">{children}</Content>
        <Footer className="!p-0">
          <FooterBar />
        </Footer>
      </Layout>
    </Layout>
  );
}
