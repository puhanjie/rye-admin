import Mock from 'mockjs';
import { url, success } from '../utils';
import { roleData } from './role';
import { dictionaryData } from './dictionary';

export const departmentData = [
  {
    id: 1,
    parentId: 0,
    parentDept: {
      id: 0,
      code: null,
      name: null
    },
    code: '100',
    name: 'Rye集团',
    leader: {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    deptStatus: {
      dictValue: '0',
      dictLabel: '正常'
    },
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
    ],
    children: [
      {
        id: 2,
        parentId: 1,
        parentDept: {
          id: 1,
          code: '100',
          name: 'Rye集团'
        },
        code: '101',
        name: '研发部',
        leader: {
          id: 1,
          username: 'admin',
          name: '管理员'
        },
        deptStatus: {
          dictValue: '0',
          dictLabel: '正常'
        },
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
        parentId: 1,
        parentDept: {
          id: 1,
          code: '100',
          name: 'Rye集团'
        },
        code: '102',
        name: '财务部',
        leader: {
          id: 1,
          username: 'admin',
          name: '管理员'
        },
        deptStatus: {
          dictValue: '0',
          dictLabel: '正常'
        },
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
        parentId: 1,
        parentDept: {
          id: 1,
          code: '100',
          name: 'Rye集团'
        },
        code: '102',
        name: '市场部',
        leader: {
          id: 1,
          username: 'admin',
          name: '管理员'
        },
        deptStatus: {
          dictValue: '0',
          dictLabel: '正常'
        },
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
    ]
  }
];

const getDeptTreeData = (deptData: API.DepartmentDetailTree[]) => {
  return deptData.map((item) => {
    const deptTree: API.DepartmentTree = {
      id: item.id,
      parentId: item.parentId,
      code: item.code,
      name: item.name
    };
    if (item.children && item.children.length !== 0) {
      deptTree.children = getDeptTreeData(item.children);
    }
    return deptTree;
  });
};

const departmentOptions = {
  deptStatus: dictionaryData
    .filter((item) => item.dictType === 'dept_status')
    .map((item) => ({
      dictValue: item.dictValue,
      dictLabel: item.dictLabel
    })),
  users: [
    {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    {
      id: 2,
      username: 'guest',
      name: '访客'
    }
  ],
  departments: getDeptTreeData(departmentData),
  roles: roleData.map((item) => ({
    id: item.id,
    code: item.code,
    name: item.name
  }))
};

Mock.mock(url('/api/v1/department'), 'post', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/department'), 'delete', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/department'), 'put', () => {
  return success<boolean>(true);
});

Mock.mock(RegExp(url('/api/v1/department/list')), 'get', () => {
  return success<API.DepartmentDetailTree[]>(departmentData);
});

Mock.mock(url('/api/v1/department/options'), 'get', () => {
  return success<API.DepartmentOptions>(departmentOptions);
});
