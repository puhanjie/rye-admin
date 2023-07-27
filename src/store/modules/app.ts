import { createSlice } from '@reduxjs/toolkit';
import appConfig, { type AppConfig } from '@/config/appConfig';

const initialState: AppConfig = {
  language: appConfig.language,
  menuWidth: appConfig.menuWidth,
  collapsedWidth: appConfig.collapsedWidth,
  menuTheme: appConfig.menuTheme
};

// 创建Slice定义状态和操作方法
const appSlice = createSlice({
  name: 'app',
  // 状态定义
  initialState,
  // 状态操作方法定义
  reducers: {}
});

export const {} = appSlice.actions;

export default appSlice.reducer;
