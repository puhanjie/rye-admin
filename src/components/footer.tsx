"use client";

import { CopyrightOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();

  return (
    <Layout.Footer className="w-full !p-0 flex flex-col justify-end items-center !bg-transparent">
      <div className="text-slate-400 text-sm">
        <span>
          <CopyrightOutlined />
        </span>
        &nbsp;{t("app.footer")}
      </div>
    </Layout.Footer>
  );
}
