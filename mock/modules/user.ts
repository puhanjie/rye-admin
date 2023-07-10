import Mock from 'mockjs';
import { url, fail, success } from '../utils';
import { getToken } from '@/utils/auth';

const userData = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    phone: '15887280652',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    email: 'hanjie.pu@outlook.com',
    createTime: '2023-06-06 11:15:20',
    updateTime: '2023-06-06 11:15:20',
    roles: [
      {
        id: 1,
        name: 'admin',
        info: '管理员'
      }
    ],
    permissions: [
      {
        id: 1,
        name: 'app:admin',
        info: '管理员'
      }
    ]
  },
  {
    id: 2,
    username: 'guest',
    password: 'guest',
    phone: '18650329448',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    email: 'example@exp.com',
    createTime: '2023-06-06 11:15:20',
    updateTime: '2023-06-06 11:15:20',
    roles: [
      {
        id: 2,
        name: 'guest',
        info: '访客'
      }
    ],
    permissions: [
      {
        id: 2,
        name: 'analysis:view',
        info: '查看'
      },
      {
        id: 19,
        name: 'settings:view',
        info: '查看'
      }
    ]
  }
];

Mock.mock(url('/api/v1/user/login'), 'post', (params) => {
  const { username, password } = JSON.parse(params.body);
  const user = userData.filter((item) => item.username === username)[0];

  if (user.password !== password) {
    return fail('密码错误');
  }
  return success<API.Token>({
    token: `${user.username}-token`
  });
});

Mock.mock(url('/api/v1/user'), 'post', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/user/'), 'delete', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/user'), 'put', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/user/password'), 'put', () => {
  return success<number>(1);
});

Mock.mock(url('/api/v1/user/list'), 'get', () => {
  const userList = userData.map((item) => {
    return {
      id: item.id,
      username: item.username,
      phone: item.phone,
      avatar: item.avatar,
      email: item.email,
      createTime: item.createTime,
      updateTime: item.updateTime,
      roles: item.roles,
      permissions: item.permissions
    };
  });
  const pageList: API.PageInfo<API.UserInfo[]> = {
    records: userList,
    total: userList.length,
    size: 2,
    current: 1,
    pages: 10
  };
  return success<API.PageInfo<API.UserInfo[]>>(pageList);
});

Mock.mock(url('/api/v1/user/myself'), 'get', () => {
  const token = getToken();
  if (token) {
    const username = token.split('-')[0];
    const user = userData.filter((item) => item.username === username)[0];
    if (user) {
      const { id, username, phone, avatar, email, roles, permissions } = user;
      return success<API.UserBasicInfo>({
        id,
        username,
        phone,
        avatar,
        email,
        roles,
        permissions
      });
    }
  }
  return fail('查询失败');
});
