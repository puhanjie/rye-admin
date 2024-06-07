import menu, { Tab, getTabByPath } from "@/config/menu";
import { Tabs } from "antd";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TabNav() {
  const pathname = usePathname();
  const [tabs, setTabs] = useState<Tab[]>([]);

  const addTab = (tab: Tab) => {
    const tabArr = tabs.filter((item) => item.key === tab.key);
    if (tabArr.length <= 0) {
      setTabs([...tabs, tab]);
    }
  };

  useEffect(() => {
    const tab = getTabByPath(menu, pathname);
    if (tab.key !== "") {
      addTab(tab);
    }
  }, [pathname]);

  return (
    <Tabs
      activeKey={pathname}
      type="editable-card"
      hideAdd
      size="small"
      tabBarGutter={0}
      tabPosition="top"
      items={tabs}
      tabBarStyle={{ height: 27, background: "white", margin: 0 }}
      className="bg-white h-7 border-y border-solid border-slate-200 m-0"
    />
  );
}
