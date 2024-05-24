import Image from "next/image";

export default function Logo() {
  return (
    <div
      id="logo"
      className="h-12 cursor-pointer flex flex-row justify-center items-center"
      //   onClick={() => navigate("/")}
    >
      <Image src="/logo.svg" width={32} height={32} alt="logo" />
      <span className="ml-4 text-blue-500 font-semibold text-lg hidden md:inline">
        Rye Admin
      </span>
    </div>
  );
}
