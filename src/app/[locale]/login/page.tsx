"use client";

import Language from "@/components/language";
import Footer from "@/components/footer";
import LoginForm from "@/components/login/login-form";
import { Tabs, type TabsProps } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Page() {
  const t = useTranslations();

  // 登陆页签items内容项
  const loginTabs = [
    {
      key: "account",
      label: t("app.loginPage.accountLogin.title"),
      children: <LoginForm loginType="account" />,
    },
    {
      key: "phone",
      label: t("app.loginPage.phoneLogin.title"),
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
    <div className="w-full h-full flex flex-col justify-between items-center bg-slate-100 bg-[url('/login-background.svg')] bg-no-repeat bg-center bg-contain">
      <div className="w-full h-12 px-4 flex flex-row justify-end items-center">
        <Language className="h-full" />
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-row justify-between items-center leading-10">
          <Image
            src="/logo.svg"
            alt="logo"
            width={44}
            height={44}
            className="mr-4"
          />
          <span className="font-medium text-4xl">{t("app.name")}</span>
        </div>
        <span className="mt-4 mb-8 text-sm text-slate-400">
          {t("app.description")}
        </span>
        <Tabs
          className="w-72"
          defaultActiveKey="account"
          items={loginTabs}
          centered
          renderTabBar={renderLoginTabBar}
        />
      </div>
      <Footer />
    </div>
  );
}
