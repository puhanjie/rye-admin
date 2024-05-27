"use client";

import { createContext, useContext, useEffect, useState } from "react";

const viewportContext = createContext({
  width: 0,
  height: 0,
});

export default function ViewportProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // 设备宽高先默认给0，待客户端渲染完成后在useEffect里获取window对象来获取并设置实际设备宽高
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    // 因为nextjs在服务端获取不到客户端的window对象设置宽高，所以在组件渲染完后通过useEffect在客户端获取并设置设备宽高
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
}

export function useViewport() {
  const { width, height } = useContext(viewportContext);
  return { width, height };
}
