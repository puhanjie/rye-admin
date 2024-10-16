import { createSharedPathnamesNavigation } from "next-intl/navigation";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";

export const language = [
  {
    code: "zh-CN",
    lang: "zh",
    label: "中文",
    antLocale: zhCN,
  },
  {
    code: "en-US",
    lang: "en",
    label: "English",
    antLocale: enUS,
  },
];
export const locales = language.map((item) => item.lang);
export const localePrefix = "as-needed";
export const defaultLocale = language[0].lang;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
