import { CopyrightOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Layout.Footer className="w-full !p-0 flex flex-col justify-end items-center">
      <div className="text-slate-400 text-sm">
        <span>
          <CopyrightOutlined />
        </span>
        &nbsp;{t("app.footer")}
      </div>
    </Layout.Footer>
  );
}
