"use client";

import FooterBar from "@/components/footer-bar";
import LanguageSwich from "@/components/language-swich";
import LoginForm from "@/components/login-form";
import { Tabs, type TabsProps } from "antd";
import Image from "next/image";

export default function Page() {
  // 登陆页签items内容项
  const loginTabs = [
    {
      key: "account",
      label: "账号密码登录",
      children: <LoginForm loginType="account" />,
    },
    {
      key: "phone",
      label: "手机登录",
      children: <LoginForm loginType="phone" />,
    },
  ];

  // 自定义登陆类型页签头样式
  const renderLoginTabBar: TabsProps["renderTabBar"] = (
    props,
    DefaultTabBar
  ) => (
    <DefaultTabBar
      {...props}
      className="before:absolute before:inset-x-0 before:border-b before:border-solid before:border-current before:content-['']"
    />
  );

  return (
    <div className="w-full h-full flex flex-col justify-between items-center bg-slate-100 bg-[url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)] bg-no-repeat bg-center bg-100">
      <div className="w-full h-12 px-4 flex flex-row justify-end items-center">
        <LanguageSwich className="w-10 h-full" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row justify-between items-center leading-10">
          <Image
            src="/logo.svg"
            width={44}
            height={44}
            alt="logo"
            className="mr-4"
          />
          <span className="font-medium text-4xl">Rye Admin</span>
        </div>
        <span className="mt-4 mb-8 text-sm text-slate-400">
          Rye Admin 是后台系统最具影响力的 Web 设计规范
        </span>
        <Tabs
          className="w-72"
          defaultActiveKey="account"
          items={loginTabs}
          centered
          renderTabBar={renderLoginTabBar}
        />
      </div>
      <FooterBar />
    </div>
  );
}
