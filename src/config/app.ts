export type App = {
  language: string;
  menuWidth: number;
  headerHeight: number;
  collapsedWidth: number;
  menuTheme: "light" | "dark";
};

const app: App = {
  language: "zhCN",
  menuWidth: 210,
  headerHeight: 48,
  collapsedWidth: 48,
  menuTheme: "dark",
};

export default app;
