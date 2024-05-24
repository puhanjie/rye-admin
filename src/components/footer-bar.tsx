import { CopyrightOutlined } from "@ant-design/icons";

export default function FooterBar() {
  return (
    <div className="w-full h-8 flex flex-col justify-end items-center text-slate-400 text-sm">
      <div>
        <span>
          <CopyrightOutlined />
        </span>
        &nbsp;Rye集团体验技术部出品
      </div>
    </div>
  );
}
