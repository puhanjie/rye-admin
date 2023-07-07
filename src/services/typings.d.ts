declare namespace API {
  type Result<T> = {
    code: number;
    message: string;
    data?: T;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    phone?: string;
    captcha?: number;
    type: 'account' | 'phone';
  };

  type Token = {
    token: string;
  };

  type UserBasicInfo = {
    id?: number;
    username?: string;
    phone?: string;
    avatar?: string;
    email?: string;
    roles?: {
      id: number;
      name: string;
      info: string;
    }[];
    permissions?: {
      id: number;
      name: string;
      info: string;
    }[];
  };

  type Password = {
    type?: number = 1; // 默认重置密码(1:重置密码;2:修改密码)
    userId?: number;
    currentPassword?: string;
    newPassword?: string;
  };

  type UserInfo = {
    id: number;
    username: string;
    phone: string;
    avatar: string;
    email: string;
    createTime: string;
    updateTime: string;
    roles: {
      id: number;
      name: string;
      info: string;
    }[];
  };

  type RoleInfo = {
    id: number;
    name: string;
    info: string;
    createTime: string;
    updateTime: string;
    permissions: {
      id: number;
      name: string;
      info: string;
    }[];
  };

  type PermissionInfo = {
    id: number;
    name: string;
    info: string;
    menu: string;
    menuName: string;
    createTime: string;
    updateTime: string;
  };

  type FileInfo = {
    id: number;
    path: string;
    name: string;
    fileSize: number;
    uuid: string;
  };
}
