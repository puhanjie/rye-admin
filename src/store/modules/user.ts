import { createSlice } from '@reduxjs/toolkit';

// 创建Slice定义状态和操作方法
const userSlice = createSlice({
  name: 'user',
  // 状态定义
  initialState: {
    id: undefined,
    avatar: '',
    username: '',
    phone: '',
    email: '',
    roles: [],
    permissions: []
  },
  // 状态操作方法定义
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.id = payload.id;
      state.avatar = payload.avatar;
      state.username = payload.username;
      state.phone = payload.phone;
      state.email = payload.email;
      state.roles = payload.roles;
      state.permissions = payload.permissions;
    }
  }
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
