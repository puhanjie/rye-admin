import { Tabs, type TabsProps } from "antd";
import LoginForm from "./login-form";
import { useTranslation } from "react-i18next";

export default function LoginTabs() {
  const { t } = useTranslation();

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
    <Tabs
      className="w-72"
      defaultActiveKey="account"
      items={loginTabs}
      centered
      renderTabBar={renderLoginTabBar}
    />
  );
}
