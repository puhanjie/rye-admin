export function getUrlParams(url: string, name: string) {
  const paramsUrl = url.split("?")[1];
  if (!paramsUrl) {
    return null;
  }
  const paramsArray = paramsUrl.split("&");
  for (let i = 0; i < paramsArray.length; i++) {
    const arr = paramsArray[i].split("=");
    if (arr[0] === name) {
      return arr[1];
    }
  }
  return null;
}
