import clsx from "clsx";
import Image from "next/image";
import { useViewport } from "./viewport-provider";
import breakpoint from "@/config/breakpoint";

export default function Logo({ collapsed }: { collapsed: boolean }) {
  const { width } = useViewport();

  return (
    <div
      id="logo"
      className="h-12 cursor-pointer flex flex-row justify-center items-center"
      //   onClick={() => navigate("/")}
    >
      <Image src="/logo.svg" width={32} height={32} alt="logo" />
      <span
        className={clsx("ml-4 text-blue-500 font-semibold text-lg", {
          hidden: width <= breakpoint.sm || collapsed,
          inline: width > breakpoint.sm || !collapsed,
        })}
      >
        Rye Admin
      </span>
    </div>
  );
}
