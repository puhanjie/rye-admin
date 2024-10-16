import { Divider } from "antd";

export default function Container({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="text-lg h-[38px] leading-[38px]">{title}</div>
      <Divider style={{ margin: "10px 0 20px 0" }} />
      {children}
    </div>
  );
}
