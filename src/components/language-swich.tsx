"use client";

import { Dropdown } from "antd";
import Image from "next/image";

export default function LanguageSwich({ className }: { className?: string }) {
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
    console.log("language switch on click");
  };

  return (
    <Dropdown menu={{ items, selectedKeys: ["zhCN"], onClick }}>
      <span
        className={`flex flex-row justify-center items-center hover:bg-slate-200 cursor-pointer ${className}`}
      >
        <Image
          src="/language.svg"
          width={18}
          height={18}
          alt="language switch"
        />
      </span>
    </Dropdown>
  );
}
