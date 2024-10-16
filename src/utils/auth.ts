import { deleteCookie, getCookie, setCookie } from "cookies-next";

function isLogin() {
  return getCookie("token") ? true : false;
}

function getToken() {
  return getCookie("token");
}

function setToken(token: string) {
  setCookie("token", token);
}

function clearToken() {
  deleteCookie("token");
}

export { isLogin, getToken, setToken, clearToken };
