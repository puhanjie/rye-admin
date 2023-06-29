import Mock from 'mockjs';
import { url, success } from '../utils';

Mock.mock(url('/api/v1/file/upload'), 'post', (params) => {
  const formData = params.body;
  const file = formData.get('file');

  return success<API.FileInfo>({
    id: 1,
    path: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    name: file.name,
    fileSize: 325,
    uuid: file.lastModified.toString()
  });
});
