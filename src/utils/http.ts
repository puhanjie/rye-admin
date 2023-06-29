import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from './auth';

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    // 请求错误时处理
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    const res = response.data;

    // 相应状态码不等于0代表错误
    if (res.code !== 0) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if ([50008, 50012, 50014].includes(res.code) && response.config.url !== '/api/user/info') {
        // Modal.error({
        //     title: 'Confirm logout',
        //     content:
        //         'You have been logged out, you can cancel to stay on this page, or log in again',
        //     okText: 'Re-Login',
        //     async onOk() {
        //         // const userStore = useUserStore()
        //         // await userStore.logout()
        //         window.location.reload()
        //     },
        // })
        // 返回code异常时处理
      }
      return Promise.reject(res);
    }
    return res;
  },
  (error) => {
    // Message.error({
    //     content: error.msg || 'Request Error',
    //     duration: 5 * 1000,
    // })
    // 请求异常时处理
    return Promise.reject(error);
  }
);

// 封装请求对象，避免在借口文件中重复写axios的请求和响应类型定义
function request<T>(params: AxiosRequestConfig) {
  // http后的第一个泛型为请求参数类型，第二个为响应数据类型
  return http<AxiosRequestConfig, API.Result<T>>(params);
}

export default request;
