import { createSlice } from '@reduxjs/toolkit';

type AppInitialState = {
  tags: {
    name: string;
    path: string;
  }[];
};

const initialState: AppInitialState = {
  tags: []
};

// 创建Slice定义状态和操作方法
const appSlice = createSlice({
  name: 'app',
  // 状态定义
  initialState,
  // 状态操作方法定义
  reducers: {
    setAppTags: (state, { payload }) => {
      const findData = state.tags.filter((item) => item.path === payload.path);
      // tag已存在则不添加
      if (findData.length > 0) {
        return;
      }
      state.tags.push(payload);
    },
    cleanAppStore: (state) => {
      state.tags = [];
    }
  }
});

export const { setAppTags, cleanAppStore } = appSlice.actions;

export default appSlice.reducer;
