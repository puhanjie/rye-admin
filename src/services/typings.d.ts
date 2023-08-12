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

  type UserPageQuery = {
    pageNum?: number = 1;
    pageSize?: number = 10;
    username?: string;
    phone?: string;
    email?: string;
  };

  type RolePageQuery = {
    pageNum?: number = 1;
    pageSize?: number = 10;
    name?: string;
    info?: string;
  };

  type PermissionPageQuery = {
    pageNum?: number = 1;
    pageSize?: number = 10;
    name?: string;
    info?: string;
    menu?: string;
  };

  type DictionaryPageQuery = {
    pageNum?: number = 1;
    pageSize?: number = 10;
    dictName?: string;
    itemText?: string;
  };

  type Token = {
    token: string;
  };

  type UserBasicInfo = {
    id?: number;
    username?: string;
    nickname?: string;
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
    nickname: string;
    userStatus: {
      itemValue: string;
      itemText: string;
    };
    phone: string;
    avatar: string;
    email: string;
    createTime: string;
    updateTime: string;
    roles?: {
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
    permissions?: {
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

  type DictionaryInfo = {
    id: number;
    dictName: string;
    dictText: string;
    itemValue: string;
    itemText: string;
    description: string;
    createTime: string;
    updateTime: string;
  };

  type PageInfo<T> = {
    records: T;
    total: number;
    size: number;
    current: number;
    pages: number;
  };

  type UserParams = {
    id?: number | string;
    username?: string;
    nickname?: string;
    userStatus?: string;
    password?: string;
    phone?: string;
    avatar?: string;
    email?: string;
    roles?: number[];
  };

  type RoleParams = {
    id?: number | string;
    name?: string;
    info?: string;
    permissions?: number[];
  };

  type PermissionParams = {
    id?: number | string;
    name?: string;
    info?: string;
    menu?: string;
  };

  type DictionaryParams = {
    id?: number | string;
    dictName?: string;
    dictText?: string;
    itemValue?: string;
    itemText?: string;
    description?: string;
  };

  type Avatar = {
    url: string;
  };
}
