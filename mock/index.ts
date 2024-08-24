import Mock from 'mockjs';
import './modules/user';
import './modules/role';
import './modules/permission';
import './modules/dictionary';
import './modules/post';
import './modules/department';
import './modules/file';
import './modules/log';

// 设置被拦截的请求的响应时间,单位:毫秒
Mock.setup({
  timeout: '300-600'
});
