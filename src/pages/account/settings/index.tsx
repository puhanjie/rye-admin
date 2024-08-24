import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import Info from "./components/info";
import Password from "./components/password";

export default function Account() {
  const { t } = useTranslation();

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
