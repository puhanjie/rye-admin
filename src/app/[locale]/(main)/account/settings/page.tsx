"use client";

import { Tabs } from "antd";
import Info from "@/components/account/settings/info";
import Password from "@/components/account/settings/password";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();

  const tabs = [
    {
      key: "info",
      label: t("app.settingsPage.info.title"),
      children: <Info />,
    },
    {
      key: "password",
      label: t("app.settingsPage.password.title"),
      children: <Password />,
    },
  ];

  return (
    <div className="min-h-full bg-white p-[15px] rounded-[6px] flex">
      <Tabs items={tabs} tabPosition="left" className="flex-auto" />
    </div>
  );
}
