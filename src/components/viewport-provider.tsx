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
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
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
