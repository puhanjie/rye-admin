"use client";

import { useAppStore } from "@/store/app";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import { useLocale } from "next-intl";
import { language } from "@/navigation";

export default function AntProvider({ children }: React.PropsWithChildren) {
  const collapsedWidth = useAppStore((state) => state.collapsedWidth);
  const locale = useLocale();

  return (
    <AntdRegistry>
      <ConfigProvider
        locale={language.filter((item) => item.lang === locale)[0].antLocale}
        theme={{
          components: {
            Menu: { collapsedWidth: collapsedWidth },
          },
        }}
      >
        <App className="w-full h-full">{children}</App>
      </ConfigProvider>
    </AntdRegistry>
  );
}
