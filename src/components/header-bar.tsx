import {
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Dropdown, Space } from "antd";
import React from "react";
import LanguageSwich from "./language-swich";

export default function HeaderBar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const Trigger = () => {
    return React.createElement(
      collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
      {
        className: "text-lg cursor-pointer mr-4",
        onClick: () => setCollapsed(!collapsed),
      }
    );
  };

  const items = [
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "个人设置",
    },
    {
      // 分割线
      type: "divider" as const,
    },
    {
      key: "loginout",
      icon: <LoginOutlined />,
      label: "退出",
    },
  ];
  const onClick = ({ key }: { key: string }) => {
    // 个人设置
    if (key === "settings") {
      console.log("settings on click");
    }

    // 退出登录
    if (key === "loginout") {
      // clearToken();
      // 清空redux中数据
      console.log("loginout on click");
    }
  };
  return (
    <div className="w-full h-full flex flex-row justify-between items-center">
      <div className="flex flex-row justify-between items-center">
        <Trigger />
        <Breadcrumb
          className="hidden sm:inline-block"
          items={[{ title: "系统管理" }, { title: "用户管理" }]}
        />
      </div>
      <Space align="center" size={0}>
        <Dropdown menu={{ items, onClick }}>
          <span className="w-24 h-12 px-2 flex flex-row justify-between items-center cursor-pointer hover:bg-slate-200">
            <Avatar src="/logo.svg" size={28} alt="avatar" />
            <span>管理员</span>
          </span>
        </Dropdown>
        <div className="w-full h-12 flex flex-row justify-end items-center">
          <LanguageSwich className="w-10 h-full" />
        </div>
      </Space>
    </div>
  );
}
