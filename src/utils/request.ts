import axios, { AxiosRequestConfig } from "axios";
import { clearToken, getToken } from "./auth";
import { message } from "antd";

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
    message.error("Request Error");
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 相应状态码不等于0代表错误
    if (res.code && res.code !== 0) {
      message.error(`${res.code} | ${res.message}`);
      return Promise.reject(res);
    }
    // 若响应为文件流,则保存文件描述信息到sessionStorage
    if (res instanceof Blob) {
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
      message.error(`${res.code} | ${res.message}`);
      window.location.href = "/login";
    }
    // 文件下载失败后响应处理
    if (res instanceof Blob) {
      const blob = new FileReader();
      blob.readAsText(res, "utf-8");
      blob.onload = () => {
        const data = JSON.parse(blob.result as string);
        message.error(`${data.code} | ${data.message}`);
      };
    }
    return Promise.reject(error);
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
