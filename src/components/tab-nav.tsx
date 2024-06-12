import route, { Tab, getTabByPath } from "@/config/route";
import { Tabs } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function TabNav() {
  const pathname = usePathname();
  const [tabs, setTabs] = useState<Tab[]>([]);
  const router = useRouter();

  const addTab = (tab: Tab) => {
    const tabArr = tabs.filter((item) => item.key === tab.key);
    if (tabArr.length <= 0) {
      setTabs([...tabs, tab]);
    }
  };

  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "remove") {
      const targetIndex = tabs.findIndex((item) => item.key === targetKey);
      const newPanes = tabs.filter((item) => item.key !== targetKey);
      const newTarget =
        tabs[targetIndex === 0 ? targetIndex + 1 : targetIndex - 1];
      setTabs(newPanes);
      router.push(newTarget.key);
    }
  };

  useEffect(() => {
    const tab = getTabByPath(route, pathname);
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
      onTabClick={(key) => router.push(key)}
      onEdit={onEdit}
      tabBarStyle={{ height: 28, background: "white", margin: 0 }}
      className="bg-white h-7 border-y border-solid border-slate-200 m-0"
    />
  );
}
