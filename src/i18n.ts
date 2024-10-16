import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  // 引入翻译文件
  messages: (await import(`./messages/${locale}.json`)).default,
}));
