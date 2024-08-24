/**
 * 下载文件
 * @param file
 * @returns
 */
export function download(file: Blob) {
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  let downloadInfo = sessionStorage.getItem('downloadInfo');
  if (!downloadInfo) {
    return;
  }
  link.setAttribute('download', decodeURI(downloadInfo.split(';')[1].split('=')[1]));
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
