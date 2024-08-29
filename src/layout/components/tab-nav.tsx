import { useRouter } from "@/hooks/useRouter";
import { type Route } from "@/router";
import { ConfigProvider, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export type Tab = {
  key: string;
  label: string;
};

export default function TabNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [tabs, setTabs] = useState<Tab[]>([]);
  const { t, i18n } = useTranslation();
  const { authRoute } = useRouter();

  const getTabByPath = (route: Route[] | undefined, path: string) => {
    let tab: Tab = {
      key: "",
      label: "",
    };
    if (!route) {
      return tab;
    }

    for (var i = 0; i < route.length; i++) {
      if (route[i].path === path.split("/").slice(-1)[0]) {
        tab = {
          key: path,
          label: t(`app.layout.menu.${route[i].name}`),
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
      navigate(newTarget.key);
    }
  };

  useEffect(() => {
    onEdit(pathname, "add");
  }, [pathname, i18n.language]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            cardBg: "#ffffff",
            colorBgContainer: "#1677ff",
            itemSelectedColor: "#ffffff",
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
        onTabClick={(key) => navigate(key)}
        onEdit={onEdit}
        tabBarStyle={{ height: 28, background: "white", margin: 0 }}
        className="bg-white pt-[2px] pl-[3px] border-t border-solid border-slate-200"
      />
    </ConfigProvider>
  );
}
