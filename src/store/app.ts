import app from "@/config/app";
import { MenuTheme } from "antd";
import { create } from "zustand";

interface AppState {
  language: string;
  menuWidth: number;
  headerHeight: number;
  collapsedWidth: number;
  menuTheme: MenuTheme;
  setLanguage: (language: string) => void;
  setMenuWidth: (menuWidth: number) => void;
  setHeaderHeight: (headerHeight: number) => void;
  setCollapsedWidth: (collapsedWidth: number) => void;
  setMenuTheme: (menuTheme: MenuTheme) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  language: app.language,
  menuWidth: app.menuWidth,
  headerHeight: app.headerHeight,
  collapsedWidth: app.collapsedWidth,
  menuTheme: app.menuTheme,
  setLanguage: (language) => set({ language }),
  setMenuWidth: (menuWidth) => set({ menuWidth }),
  setHeaderHeight: (headerHeight) => set({ headerHeight }),
  setCollapsedWidth: (collapsedWidth) => set({ collapsedWidth }),
  setMenuTheme: (menuTheme) => set({ menuTheme }),
}));
