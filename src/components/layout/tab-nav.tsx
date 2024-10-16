"use client";

import type { Route } from "@/config/route";
import { useAuthRoute } from "@/hooks/route";
import { usePathname, useRouter } from "@/navigation";
import { useUserStore } from "@/store/user";
import { ConfigProvider, Tabs } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export type Tab = {
  key: string;
  label: string;
};

const getTabByPath = (route: Route[] | undefined, path: string) => {
  let tab: Tab = {
    key: "",
    label: "",
  };
  if (!route) {
    return tab;
  }

  for (let i = 0; i < route.length; i++) {
    if (route[i].path === path) {
      tab = {
        key: path,
        label: route[i].name,
      };
    }
    if (route[i].children) {
      tab = getTabByPath(route[i].children, path);
    }
    if (tab.key !== "") {
      break;
    }
  }

  return tab;
};

export default function TabNav() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [tabs, setTabs] = useState<Tab[]>([]);
  const permissions = useUserStore((state) => state.permissions);
  const t = useTranslations();
  const authRoute = useAuthRoute();

  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "add") {
      const tab = getTabByPath(authRoute, pathname);
      if (tab.key === "") {
        return;
      }
      const hasTab = tabs.filter((item) => item.key === tab.key).length > 0;
      const newTabs = hasTab ? tabs : [...tabs, tab];
      const langTabs = newTabs.map((item) => ({
        key: item.key,
        label: t(`app.layout.menu.${item.key.split("/").slice(-1)[0]}`),
      }));
      setTabs(langTabs);
    }
    if (action === "remove") {
      if (tabs.length === 1) {
        return;
      }
      const targetIndex = tabs.findIndex((item) => item.key === targetKey);
      const newPanes = tabs.filter((item) => item.key !== targetKey);
      const newTarget =
        tabs[targetIndex === 0 ? targetIndex + 1 : targetIndex - 1];
      setTabs(newPanes);
      router.push(newTarget.key, { locale });
    }
  };

  useEffect(() => {
    onEdit(pathname, "add");
  }, [pathname, locale, permissions]); // eslint-disable-line

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            cardBg: "#ffffff",
            colorBgContainer: "#bae0ff",
            colorBorderSecondary: "rgb(226 232 240)",
            cardPaddingSM: "10px",
          },
        },
      }}
    >
      <Tabs
        activeKey={pathname}
        type="editable-card"
        hideAdd
        size="small"
        tabPosition="top"
        items={tabs}
        onTabClick={(key) => router.push(key, { locale })}
        onEdit={onEdit}
        tabBarStyle={{ height: 28, margin: 0, paddingLeft: 5, paddingRight: 5 }}
        className="bg-white border-t border-solid border-slate-200"
      />
    </ConfigProvider>
  );
}
