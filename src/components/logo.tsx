"use client";

import clsx from "clsx";
import { useAppStore } from "@/store/app";
import { useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function Logo({
  className,
  collapsed,
}: {
  className?: string;
  collapsed: boolean;
}) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();
  const headerHeight = useAppStore((state) => state.headerHeight);

  return (
    <div
      id="logo"
      style={{ height: headerHeight }}
      className={`cursor-pointer flex flex-row justify-center items-center ${className}`}
      onClick={() => router.push("/", { locale })}
    >
      <Image src="/logo.svg" alt="logo" width={32} height={32} />
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
