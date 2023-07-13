import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en-US';
import zhTranslation from './zh-CN';
import appConfig from '@/config/appConfig.json';

i18n.use(initReactI18next).init({
  resources: {
    enUS: {
      translation: enTranslation
    },
    zhCN: {
      translation: zhTranslation
    }
  },
  lng: appConfig.language, // 默认语言
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
