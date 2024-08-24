import Mock from 'mockjs';
import { url, success } from '../utils';
import { dictionaryData } from './dictionary';
import { roleData } from './role';

export const postData = [
  {
    id: 1,
    code: '100001',
    name: '董事长',
    postStatus: {
      dictValue: '0',
      dictLabel: '正常'
    },
    remark: null,
    createUser: {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    updateUser: {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24',
    roles: [
      {
        id: 1,
        code: 'admin',
        name: '管理员'
      }
    ]
  },
  {
    id: 2,
    code: '101001',
    name: '研发部总经理',
    postStatus: {
      dictValue: '0',
      dictLabel: '正常'
    },
    remark: null,
    createUser: {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    updateUser: {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24',
    roles: [
      {
        id: 2,
        code: 'guest',
        name: '访客'
      }
    ]
  },
  {
    id: 3,
    code: '102001',
    name: '财务部总经理',
    postStatus: {
      dictValue: '0',
      dictLabel: '正常'
    },
    remark: null,
    createUser: {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    updateUser: {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24',
    roles: [
      {
        id: 2,
        code: 'guest',
        name: '访客'
      }
    ]
  },
  {
    id: 4,
    code: '103001',
    name: '市场部总经理',
    postStatus: {
      dictValue: '0',
      dictLabel: '正常'
    },
    remark: null,
    createUser: {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    updateUser: {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24',
    roles: [
      {
        id: 2,
        code: 'guest',
        name: '访客'
      }
    ]
  }
];

const postOptions = {
  postStatus: dictionaryData
    .filter((item) => item.dictType === 'post_status')
    .map((item) => ({
      dictValue: item.dictValue,
      dictLabel: item.dictLabel
    })),
  roles: roleData.map((item) => ({
    id: item.id,
    code: item.code,
    name: item.name
  }))
};

Mock.mock(url('/api/v1/post'), 'post', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/post'), 'delete', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/post'), 'put', () => {
  return success<boolean>(true);
});

Mock.mock(RegExp(url('/api/v1/post/list')), 'get', () => {
  const pageList: API.Page<API.PostInfo[]> = {
    records: postData,
    total: postData.length,
    size: 4,
    current: 1,
    pages: 10
  };
  return success<API.Page<API.PostInfo[]>>(pageList);
});

Mock.mock(url('/api/v1/post/options'), 'get', () => {
  return success<API.PostOptions>(postOptions);
});
