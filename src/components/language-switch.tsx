import { Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import language from "@/assets/language.svg";

export default function LanguageSwich({ className }: { className?: string }) {
  const { i18n } = useTranslation();

  const items = [
    {
      key: "zhCN",
      label: "简体中文",
    },
    {
      key: "enUS",
      label: "English",
    },
  ];

  const onClick = ({ key }: { key: string }) => {
    i18n.changeLanguage(key);
  };

  return (
    <Dropdown menu={{ items, selectedKeys: [i18n.language], onClick }}>
      <span
        className={`flex flex-row justify-center items-center hover:bg-slate-200 cursor-pointer ${className}`}
      >
        <img
          src={language}
          alt="language switch"
          className="w-[18px] h-[18px]"
        />
      </span>
    </Dropdown>
  );
}
