"use client";

import { LoginOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Dropdown, Layout, Space, theme } from "antd";
import TabNav from "./tab-nav";
import { clearToken } from "@/utils/auth";
import Language from "@/components/language";
import { usePathname, useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useAppStore } from "@/store/app";
import { useUserStore } from "@/store/user";

const { Header } = Layout;

export default function HeaderBar() {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations();
  const headerHeight = useAppStore((state) => state.headerHeight);
  const { name, avatar, permissions } = useUserStore((state) => state);

  // 获取antd的背景色token值
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const settingsPermission = permissions?.filter(
    (item) => item.code === "settings:view"
  );

  const items = [
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: t("app.layout.dropdown.settings"),
      disabled: !(settingsPermission && settingsPermission.length > 0),
    },
    {
      // 分割线
      type: "divider" as const,
    },
    {
      key: "signOut",
      icon: <LoginOutlined />,
      label: t("app.layout.dropdown.signOut"),
    },
  ];

  const onClick = ({ key }: { key: string }) => {
    // 个人设置
    if (key === "settings") {
      router.push("/account/settings", { locale });
    }

    // 退出登录
    if (key === "signOut") {
      router.push("/login", { locale });
      clearToken();
    }
  };

  return (
    <>
      <Header
        style={{ height: headerHeight, backgroundColor: colorBgContainer }}
        className="!px-4 flex flex-row justify-between items-center"
      >
        <Breadcrumb
          className="!mx-8"
          items={
            pathname === "/"
              ? []
              : pathname
                  .split("/")
                  .filter((item) => item.length !== 0)
                  .map((item) => ({ title: t(`app.layout.menu.${item}`) }))
          }
        />
        <Space align="center" size={0}>
          <Dropdown menu={{ items, onClick }} placement="bottom">
            <span className="h-12 leading-[48px] px-2 flex flex-row justify-between items-center cursor-pointer hover:bg-slate-200">
              <Avatar
                src={avatar ? avatar : "/avatar.png"}
                size={28}
                alt="avatar"
                className="!mx-1"
              />
              <span>{name}</span>
            </span>
          </Dropdown>
          <div className="w-full h-12 flex flex-row justify-end items-center">
            <Language className="h-full" />
          </div>
        </Space>
      </Header>
      <TabNav />
    </>
  );
}
