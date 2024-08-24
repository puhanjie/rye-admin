import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { useAppSelector } from "@/store";

export default function Logo({
  className,
  collapsed,
}: {
  className?: string;
  collapsed: boolean;
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { headerHeight } = useAppSelector((state) => state.app);

  return (
    <div
      id="logo"
      style={{ height: headerHeight }}
      className={`cursor-pointer flex flex-row justify-center items-center ${className}`}
      onClick={() => navigate("/")}
    >
      <img src={logo} alt="logo" className="w-8 h-8" />
      <span
        className={clsx("ml-4 text-blue-500 font-semibold text-lg", {
          hidden: collapsed,
          inline: !collapsed,
        })}
      >
        {t("app.name")}
      </span>
    </div>
  );
}
