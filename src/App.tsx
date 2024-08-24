import { ConfigProvider } from "antd";
import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import store from "./store";
import route from "@/router";
import { useTranslation } from "react-i18next";
import { getGuardRoute, getRoute } from "./utils/route";
import app from "./config/app";

export default function App({ env }: { env: string }) {
  const { i18n } = useTranslation();
  const locale = i18n.language === "zhCN" ? zhCN : enUS;
  const routes = getRoute(route);
  const guardRoute = getGuardRoute(routes);

  const RenderApp = (
    <Provider store={store}>
      <ConfigProvider
        locale={locale}
        theme={{
          components: {
            Menu: { collapsedWidth: app.collapsedWidth },
          },
        }}
      >
        <RouterProvider router={createBrowserRouter(guardRoute)} />
      </ConfigProvider>
    </Provider>
  );

  return env === "dev" ? (
    <React.StrictMode>{RenderApp}</React.StrictMode>
  ) : (
    RenderApp
  );
}
