import LanguageSwich from "@/components/language-switch";
import LoginTabs from "./components/login-tabs";
import Footer from "@/components/footer";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.svg";

export default function Login() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col justify-between items-center bg-slate-100 bg-[url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)] bg-no-repeat bg-center bg-100">
      <div className="w-full h-12 px-4 flex flex-row justify-end items-center">
        <LanguageSwich className="w-10 h-full" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row justify-between items-center leading-10">
          <img src={logo} alt="logo" className="mr-4 w-[44px] h-[44px]" />
          <span className="font-medium text-4xl">{t("app.name")}</span>
        </div>
        <span className="mt-4 mb-8 text-sm text-slate-400">
          {t("app.description")}
        </span>
        <LoginTabs />
      </div>
      <Footer />
    </div>
  );
}
