import { configureStore } from '@reduxjs/toolkit';
import userSlice from './modules/user';
import appSlice from './modules/app';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  // 合并多个Slice
  reducer: {
    app: appSlice,
    user: userSlice
  }
});

// 全局定义 dispatch 和 state 的类型,并导出
// 后面使用过程中直接从该文件中引入,而不需要冲react-redux包中引入
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 主要解决在每次使用 useSelector 和 useDispatch 都要去重新定义 TS 类型的问题
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
