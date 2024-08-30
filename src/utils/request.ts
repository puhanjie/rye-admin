import axios, { AxiosRequestConfig } from "axios";
import { clearToken, getToken } from "./auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
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
axiosInstance.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 若响应为文件流,则保存文件描述信息到sessionStorage
    if (res instanceof Blob && response.config.url == "/api/v1/file") {
      sessionStorage.setItem(
        "downloadInfo",
        response.headers["content-disposition"]
      );
    }
    return res;
  },
  (error) => {
    // 响应异常时处理
    const res = error.response.data;
    if (res.code === 10000 && !(res instanceof Blob)) {
      // token失效
      clearToken();
      window.location.href = "/login";
    }
    return res ? res : Promise.reject(error);
  }
);

// 封装请求对象,避免在借口文件中重复写axios的请求和响应类型定义
function request<T>(params: AxiosRequestConfig) {
  // http后的第一个泛型为请求参数类型,第二个为响应数据类型
  return axiosInstance<AxiosRequestConfig, T extends Blob ? T : API.Result<T>>(
    params
  );
}

export default request;
