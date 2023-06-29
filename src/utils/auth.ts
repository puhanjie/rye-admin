const TOKEN_KEY = 'Authorization';

function isLogin() {
  return sessionStorage.getItem(TOKEN_KEY) ? true : false;
}

function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

function setToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

export { isLogin, getToken, setToken, clearToken };
