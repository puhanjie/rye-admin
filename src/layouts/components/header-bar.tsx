import { LoginOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Dropdown, Layout, Space, theme } from "antd";
import TabNav from "./tab-nav";
import { clearToken } from "@/utils/auth";
import { useDispatch } from "react-redux";
import { cleanUserStore } from "@/store/modules/user";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwich from "@/components/language-switch";
import { useAppSelector } from "@/store";

export default function HeaderBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { headerHeight } = useAppSelector((state) => state.app);
  const dispatch = useDispatch();
  const { name, avatar } = useAppSelector((state) => state.user);

  // 获取antd的背景色token值
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: t("app.layout.dropdown.settings"),
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
      navigate("/account/settings");
    }

    // 退出登录
    if (key === "signOut") {
      clearToken();
      // 清空redux中数据
      dispatch(cleanUserStore());
      navigate("/login");
    }
  };

  return (
    <>
      <Layout.Header
        style={{ height: headerHeight, backgroundColor: colorBgContainer }}
        className="!px-4 flex flex-row justify-between items-center"
      >
        <Breadcrumb
          className="!mx-8 hidden sm:inline-block"
          items={pathname
            .split("/")
            .filter((item) => item.length !== 0)
            .map((item) => ({ title: t(`app.layout.menu.${item}`) }))}
        />
        <Breadcrumb
          className="!mx-8 sm:hidden"
          items={[
            {
              title: t(
                `app.layout.menu.${
                  pathname
                    .split("/")
                    .filter((item) => item.length !== 0)
                    .slice(-1)[0]
                }`
              ),
            },
          ]}
        />
        <Space align="center" size={0}>
          <Dropdown menu={{ items, onClick }}>
            <span className="h-12 leading-[48px] px-2 flex flex-row justify-between items-center cursor-pointer hover:bg-slate-200">
              <Avatar src={avatar} size={28} alt="avatar" className="mx-1" />
              <span>{name}</span>
            </span>
          </Dropdown>
          <div className="w-full h-12 flex flex-row justify-end items-center">
            <LanguageSwich className="w-10 h-full" />
          </div>
        </Space>
      </Layout.Header>
      <TabNav />
    </>
  );
}
