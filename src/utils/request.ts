import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { clearToken, getToken } from "./auth";
import { getCookie } from "cookies-next";
import { defaultLocale } from "@/navigation";

/**
 * 客户端请求对象
 */
const clientAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  timeout: 5000,
});

// 请求拦截器
clientAxiosInstance.interceptors.request.use(
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
clientAxiosInstance.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res instanceof Blob ? response : res;
  },
  (error) => {
    // 响应异常时处理
    const res = error.response.data;
    if (res.code === 10000 && !(res instanceof Blob)) {
      const locale = getCookie("NEXT_LOCALE");
      const path = locale === defaultLocale ? "/login" : `/${locale}/login`;
      // token失效
      clearToken();
      window.location.href = path;
    }
    // 文件下载失败则返回整个response对象
    if (
      error.response.config.url === "/api/v1/file" &&
      error.response.config.method === "get"
    ) {
      return error.response;
    }
    return res ? res : Promise.reject(error);
  }
);

// 封装请求对象,避免在借口文件中重复写axios的请求和响应类型定义
export function clientRequest<T>(params: AxiosRequestConfig) {
  // 第一个泛型为请求参数类型,第二个为响应数据类型
  return clientAxiosInstance<
    AxiosRequestConfig,
    T extends Blob ? AxiosResponse<Blob> : API.Result<T>
  >(params);
}

/**
 * 服务端请求对象
 */
const serverAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  timeout: 5000,
  withCredentials: true,
});

// 请求拦截器
serverAxiosInstance.interceptors.request.use(
  (config) => config,
  (error) => {
    // 请求错误时处理
    return Promise.reject(error);
  }
);

// 响应拦截器
serverAxiosInstance.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res instanceof Blob ? response : res;
  },
  (error) => {
    // 响应异常时处理
    const res = error.response.data;
    return res ? res : Promise.reject(error);
  }
);

// 封装请求对象,避免在借口文件中重复写axios的请求和响应类型定义
export function serverRequest<T>(params: AxiosRequestConfig) {
  // http后的第一个泛型为请求参数类型,第二个为响应数据类型
  return serverAxiosInstance<
    AxiosRequestConfig,
    T extends Blob ? T : API.Result<T>
  >(params);
}
