/**
 * 下载文件
 * @param file
 * @returns
 */
export function download(file: Blob, fileName: string) {
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
