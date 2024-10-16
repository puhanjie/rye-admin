import { create } from "zustand";

interface UserState {
  id?: number;
  username?: string;
  name?: string;
  sex?: API.Dictionary;
  phone?: string;
  avatar?: string;
  email?: string;
  roles?: API.Role[];
  permissions?: API.Permission[];
  setUserState: (userInfo: API.UserBasicInfo | undefined) => void;
  setAvatar: (avatar: string) => void;
  clearUserState: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  id: undefined,
  avatar: "",
  username: "",
  name: "",
  sex: undefined,
  phone: "",
  email: "",
  roles: [],
  permissions: [],
  setUserState: (user) => set({ ...user }),
  setAvatar: (avatar) => set({ avatar }),
  clearUserState: () =>
    set({
      id: undefined,
      avatar: "",
      username: "",
      name: "",
      sex: undefined,
      phone: "",
      email: "",
      roles: [],
      permissions: [],
    }),
}));
