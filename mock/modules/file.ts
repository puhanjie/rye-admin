import Mock from 'mockjs';
import { url, success } from '../utils';

const fileData = [
  {
    id: 1,
    path: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    name: '文件1',
    fileSize: 325,
    uuid: 'BiazfanxmamNRoxxVxka',
    uploadUser: {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    uploadTime: '2023-09-18 16:32:50'
  },
  {
    id: 2,
    path: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    name: '文件2',
    fileSize: 325,
    uuid: 'BiazfanxmamNRoxxVxka',
    uploadUser: {
      id: 1,
      username: 'admin',
      name: '管理员'
    },
    uploadTime: '2023-09-18 16:32:50'
  }
];

Mock.mock(url('/api/v1/file'), 'post', (params) => {
  const formData = params.body;
  const file = formData.get('files');

  return success<API.File>({
    path: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    name: file.name
  });
});

Mock.mock(url('/api/v1/file'), 'delete', () => {
  return success<boolean>(true);
});

Mock.mock(RegExp(url('/api/v1/file/list')), 'get', () => {
  const pageList: API.Page<API.FileInfo[]> = {
    records: fileData,
    total: fileData.length,
    size: 2,
    current: 1,
    pages: 10
  };
  return success<API.Page<API.FileInfo[]>>(pageList);
});

Mock.mock(RegExp(url('/api/v1/file')), 'get', () => {
  // mock不好模拟文件下载,此处就直接返回true,让前端处理成功
  return success<boolean>(true);
});
