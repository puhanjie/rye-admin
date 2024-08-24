import { createSlice } from "@reduxjs/toolkit";
import app, { type App } from "@/config/app";

const initialState: App = {
  language: app.language,
  menuWidth: app.menuWidth,
  headerHeight: app.headerHeight,
  collapsedWidth: app.collapsedWidth,
  menuTheme: app.menuTheme,
};

// 创建Slice定义状态和操作方法
const appSlice = createSlice({
  name: "app",
  // 状态定义
  initialState,
  // 状态操作方法定义
  reducers: {
    setLangusge: (state, { payload }) => {
      state.language = payload.language;
    },
    setMenuWidth: (state, { payload }) => {
      state.menuWidth = payload.menuWidth;
    },
    setHeaderHeight: (state, { payload }) => {
      state.headerHeight = payload.headerHeight;
    },
    setCollapsedWidth: (state, { payload }) => {
      state.collapsedWidth = payload.collapsedWidth;
    },
    setMenuTheme: (state, { payload }) => {
      state.menuTheme = payload.menuTheme;
    },
  },
});

export const {
  setLangusge,
  setMenuWidth,
  setHeaderHeight,
  setCollapsedWidth,
  setMenuTheme,
} = appSlice.actions;

export default appSlice.reducer;
