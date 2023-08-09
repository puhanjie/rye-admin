import Mock from 'mockjs';
import { url, success } from '../utils';

const dictionaryData = [
  {
    id: 1,
    dictName: 'user_status',
    dictText: '用户状态',
    itemValue: '0',
    itemText: '正常',
    description: '用户账户状态',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 2,
    dictName: 'user_status',
    dictText: '用户状态',
    itemValue: '1',
    itemText: '冻结',
    description: '用户账户状态',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  },
  {
    id: 3,
    dictName: 'user_status',
    dictText: '用户状态',
    itemValue: '2',
    itemText: '注销',
    description: '用户账户状态',
    createTime: '2023-06-09 11:15:24',
    updateTime: '2023-06-09 11:15:24'
  }
];

Mock.mock(url('/api/v1/dictionary'), 'post', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/dictionary'), 'delete', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/dictionary'), 'put', () => {
  return success<boolean>(true);
});

Mock.mock(url('/api/v1/dictionary/list'), 'get', () => {
  const pageList: API.PageInfo<API.DictionaryInfo[]> = {
    records: dictionaryData,
    total: dictionaryData.length,
    size: 2,
    current: 1,
    pages: 10
  };
  return success<API.PageInfo<API.DictionaryInfo[]>>(pageList);
});

Mock.mock(url('/api/v1/dictionary/items?dictName=user_status'), 'get', () => {
  return success<API.DictionaryInfo[]>(dictionaryData);
});
