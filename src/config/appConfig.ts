export type AppConfig = {
  language: string;
  menuWidth: number;
  collapsedWidth: number;
  menuTheme: 'light' | 'dark';
};

const appConfig: AppConfig = {
  language: 'zhCN',
  menuWidth: 210,
  collapsedWidth: 48,
  menuTheme: 'dark'
};

export default appConfig;
