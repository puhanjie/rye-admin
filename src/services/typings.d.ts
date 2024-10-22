declare namespace API {
  type Result<T> = {
    code: number;
    message: string;
    request: string;
    data?: T;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    phone?: string;
    captcha?: number;
    type: "account" | "phone";
  };

  type PasswordParams = {
    type?: number; // 1:重置密码;2:修改密码
    userId?: number;
    currentPassword?: string;
    newPassword?: string;
  };

  type UserParams = {
    id?: number | string;
    department?: number;
    username?: string;
    name?: string;
    sex?: string;
    userStatus?: string;
    password?: string;
    phone?: string;
    email?: string;
    roles?: number[];
    posts?: number[];
  };

  type BasicInfoParams = {
    id?: number | string;
    name?: string;
    sex?: string;
    phone?: string;
    email?: string;
  };

  type RoleParams = {
    id?: number | string;
    code?: string;
    name?: string;
    roleStatus?: string;
    permissions?: number[];
  };

  type PermissionParams = {
    id?: number | string;
    code?: string;
    name?: string;
    menu?: string;
    permissionStatus?: string;
  };

  type DictionaryParams = {
    id?: number | string;
    dictType?: string;
    dictName?: string;
    dictValue?: string;
    dictLabel?: string;
    description?: string;
  };

  type PostParams = {
    id?: number | string;
    code?: string;
    name?: string;
    postStatus?: string;
    remark?: string;
    roles?: number[];
  };

  type DepartmentParams = {
    id?: number | string;
    parentId?: number;
    code?: string;
    name?: string;
    leader?: string;
    deptStatus?: string;
    roles?: number[];
  };

  type UserQuery = {
    pageNum?: number;
    pageSize?: number;
    username?: string;
    name?: string;
    phone?: string;
    email?: string;
  };

  type RoleQuery = {
    pageNum?: number;
    pageSize?: number;
    code?: string;
    name?: string;
  };

  type PermissionQuery = {
    pageNum?: number;
    pageSize?: number;
    code?: string;
    name?: string;
    menu?: string;
  };

  type FileQuery = {
    pageNum?: number;
    pageSize?: number;
    name?: string;
    uploadUser?: string;
  };

  type LogQuery = {
    pageNum?: number;
    pageSize?: number;
    message?: string;
    operateUser?: string;
  };

  type DictionaryQuery = {
    pageNum?: number;
    pageSize?: number;
    dictType?: string;
    dictLabel?: string;
  };

  type PostQuery = {
    pageNum?: number;
    pageSize?: number;
    code?: string;
    name?: string;
  };

  type DepartmentQuery = {
    code?: string;
    name?: string;
  };

  type UserBasicInfo = {
    id?: number;
    username?: string;
    name?: string;
    sex?: API.Dictionary;
    phone?: string;
    avatar?: string;
    email?: string;
    roles?: API.Role[];
    permissions?: API.Permission[];
  };

  type User = {
    id: number;
    username: string;
    name: string;
  };

  type UserInfo = {
    id: number;
    department: API.Department;
    username: string;
    name: string;
    sex: API.Dictionary;
    userStatus: API.Dictionary;
    phone: string;
    avatar: string;
    email: string;
    createUser: API.User;
    updateUser: API.User;
    createTime: string;
    updateTime: string;
    roles?: API.Role[];
    posts?: API.Post[];
  };

  type UserOptions = {
    departments: API.DepartmentTree[];
    posts: API.Post[];
    roles: API.Role[];
    sex: API.Dictionary[];
    userStatus: API.Dictionary[];
  };

  type Role = {
    id: number;
    code: string;
    name: string;
  };

  type RoleInfo = {
    id: number;
    code: string;
    name: string;
    roleStatus: API.Dictionary;
    createUser: API.User;
    updateUser: API.User;
    createTime: string;
    updateTime: string;
    permissions: API.Permission[];
  };

  type RoleOptions = {
    roleStatus: API.Dictionary[];
    permissions: API.Permission[];
  };

  type Permission = {
    id: number;
    code: string;
    name: string;
    menu: string;
  };

  type PermissionInfo = {
    id: number;
    code: string;
    name: string;
    menu: string;
    permissionStatus: API.Dictionary;
    createUser: API.User;
    updateUser: API.User;
    createTime: string;
    updateTime: string;
  };

  type PermissionOptions = {
    permissionStatus: API.Dictionary[];
  };

  type File = {
    path: string;
    name: string;
  };

  type FileInfo = {
    id: number;
    path: string;
    name: string;
    fileSize: number;
    uuid: string;
    uploadUser: API.User;
    uploadTime: string;
  };

  type LogInfo = {
    id: number;
    url: string;
    code: number;
    message: string;
    operateUser: API.User;
    operateTime: string;
  };

  type Dictionary = {
    dictValue: string;
    dictLabel: string;
  };

  type DictionaryInfo = {
    id: number;
    dictType: string;
    dictName: string;
    dictValue: string;
    dictLabel: string;
    description?: string | null;
    createUser: API.User;
    updateUser: API.User;
    createTime: string;
    updateTime: string;
  };

  type Post = {
    id: number;
    code: string;
    name: string;
  };

  type PostInfo = {
    id: number;
    code: string;
    name: string;
    postStatus: API.Dictionary;
    remark?: string | null;
    createUser: API.User;
    updateUser: API.User;
    createTime: string;
    updateTime: string;
    roles?: API.Role[];
  };

  type PostOptions = {
    postStatus: API.Dictionary[];
    roles: API.Role[];
  };

  type Department = {
    id: number;
    code: string | null;
    name: string | null;
  };

  type DepartmentTree = {
    id: number;
    parentId: number;
    code: string;
    name: string;
    children?: API.DepartmentTree[];
  };

  type DepartmentDetailTree = {
    id: number;
    parentId: number;
    parentDept: API.Department;
    code: string;
    name: string;
    leader: API.User;
    deptStatus: API.Dictionary;
    createUser: API.User;
    updateUser: API.User;
    createTime: string;
    updateTime: string;
    roles?: API.Role[];
    children?: API.DepartmentDetailTree[];
  };

  type DepartmentOptions = {
    deptStatus: API.Dictionary[];
    users: API.User[];
    departments: API.DepartmentTree[];
    roles: API.Role[];
  };

  type Page<T> = {
    records: T;
    total: number;
    size: number;
    current: number;
    pages: number;
  };
}
