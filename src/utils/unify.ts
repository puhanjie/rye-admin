/**
 * 返回api请求路径的实际地址
 * @param url 请求url
 * @returns 请求url地址
 */
export function url(url: string) {
  return `${process.env.NEXT_PUBLIC_BASE_API}${url}`;
}

/**
 * 请求成功统一响应数据格式处理
 * @param data 响应数据
 * @returns 统一后的响应数据
 */
export function success<T>(url: string, data?: T) {
  return {
    code: 0,
    message: "成功",
    request: url,
    data,
  };
}

/**
 * 请求失败统一响应数据格式处理
 * @param message 错误消息
 * @returns 统一后的响应数据
 */
export function fail(url: string, message: string) {
  return {
    code: -1,
    message,
    request: url,
  };
}
