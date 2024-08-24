import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en-US.json";
import zhTranslation from "./zh-CN.json";
import app from "@/config/app";

i18n.use(initReactI18next).init({
  resources: {
    enUS: {
      translation: enTranslation,
    },
    zhCN: {
      translation: zhTranslation,
    },
  },
  lng: app.language, // 默认语言
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
