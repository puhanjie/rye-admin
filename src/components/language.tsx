"use client";

import { language, usePathname, useRouter } from "@/navigation";
import { Dropdown } from "antd";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function Language({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const items = language.map((item) => ({ key: item.lang, label: item.label }));

  const onClick = ({ key }: { key: string }) => {
    router.push(pathname, { locale: key });
  };

  return (
    <Dropdown menu={{ items, selectedKeys: [locale], onClick }}>
      <span
        className={`w-10 flex flex-row justify-center items-center hover:bg-slate-200 cursor-pointer ${className}`}
      >
        <Image
          src="/language.svg"
          alt="language switch"
          width={18}
          height={18}
        />
      </span>
    </Dropdown>
  );
}
