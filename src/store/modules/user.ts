import { createSlice } from '@reduxjs/toolkit';

const initialState: API.UserBasicInfo = {
  id: undefined,
  avatar: '',
  username: '',
  name: '',
  sex: undefined,
  phone: '',
  email: '',
  roles: [],
  permissions: []
};

// 创建Slice定义状态和操作方法
const userSlice = createSlice({
  name: 'user',
  // 状态定义
  initialState,
  // 状态操作方法定义
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.id = payload.id;
      state.avatar = payload.avatar;
      state.username = payload.username;
      state.name = payload.name;
      state.sex = payload.sex;
      state.phone = payload.phone;
      state.email = payload.email;
      state.roles = payload.roles;
      state.permissions = payload.permissions;
    },
    setAvatar: (state, { payload }) => {
      state.avatar = payload;
    },
    cleanUserStore: (state) => {
      state.id = undefined;
      state.avatar = '';
      state.username = '';
      state.name = '';
      state.sex = undefined;
      state.phone = '';
      state.email = '';
      state.roles = [];
      state.permissions = [];
    }
  }
});

export const { setUserInfo, cleanUserStore, setAvatar } = userSlice.actions;

export default userSlice.reducer;
