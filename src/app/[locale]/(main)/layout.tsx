"use client";

import Loading from "@/components/loading";
import { getInfo } from "@/services/user";
import { Layout as AntLayout, App } from "antd";
import SiderBar from "@/components/layout/sider-bar";
import HeaderBar from "@/components/layout/header-bar";
import Footer from "@/components/footer";
import { useUserStore } from "@/store/user";
import { useRequest } from "ahooks";

const { Content } = AntLayout;

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUserState } = useUserStore((state) => state);
  const { message } = App.useApp();

  const getUserInfo = async () => {
    const res = await getInfo();
    if (res.code !== 0) {
      message.error(`${res.code} | ${res.message}`);
    }
    setUserState(res.data);
    return res.data;
  };
  const { loading } = useRequest(getUserInfo);

  return loading ? (
    <Loading />
  ) : (
    <AntLayout className="w-full h-full !flex !flex-row !justify-between">
      <SiderBar />
      <AntLayout className="h-full">
        <HeaderBar />
        <Content className="w-full h-full px-3 pt-3">
          {children}
        </Content>
        <Footer />
      </AntLayout>
    </AntLayout>
  );
}
