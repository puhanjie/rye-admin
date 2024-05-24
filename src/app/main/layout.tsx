"use client";

import FooterBar from "@/components/footer-bar";
import HeaderNav from "@/components/header-bar";
import Logo from "@/components/logo";
import { useViewport } from "@/components/viewport-provider";
import menu from "@/config/menu";
import { Layout, Menu, Tabs, type TabsProps, theme } from "antd";
import React from "react";

const { Sider, Header, Content, Footer } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width } = useViewport();
  console.log(width);
  // 获取antd的背景色token值
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="w-full h-full">
      <Sider
        width={210}
        theme="dark"
        breakpoint="md"
        trigger={null}
        collapsible
        // collapsed={false}
        collapsedWidth={48}
        className="h-full"
      >
        <Logo />
        <Menu
          theme="dark"
          mode="inline"
          items={menu}
          defaultOpenKeys={["system"]}
          selectedKeys={["user"]}
          // onClick={(event) => navigate(event.key)}
          // className={`${styles['menu']} scrollbar-dark`}
        />
      </Sider>
      <Layout className="h-full">
        <Header
          style={{ backgroundColor: colorBgContainer }}
          className="!h-12 !px-4"
        >
          <HeaderNav />
        </Header>
        <Tabs
          type="editable-card"
          hideAdd
          size="small"
          tabBarGutter={0}
          items={[
            { key: "card1", label: "Card1" },
            { key: "label2", label: "Card2" },
          ]}
        />
        <Content>{children}</Content>
        <Footer className="!p-0">
          <FooterBar />
        </Footer>
      </Layout>
    </Layout>
  );
}
