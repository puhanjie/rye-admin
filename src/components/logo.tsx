import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo({ collapsed }: { collapsed: boolean }) {
  const router = useRouter();

  return (
    <div
      id="logo"
      className="h-12 cursor-pointer flex flex-row justify-center items-center"
      onClick={() => router.push("/")}
    >
      <Image src="/logo.svg" width={32} height={32} alt="logo" />
      <span
        className={clsx("ml-4 text-blue-500 font-semibold text-lg", {
          hidden: collapsed,
          inline: !collapsed,
        })}
      >
        Rye Admin
      </span>
    </div>
  );
}
