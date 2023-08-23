import './App.less';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routeConfig from './router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { Provider } from 'react-redux';
import store from './store';
import { useTranslation } from 'react-i18next';
import { renderAuthRoutes, renderRoutes } from './utils/route';
import React from 'react';

type Props = {
  env: string;
};

const App: React.FC<Props> = ({ env }) => {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'zhCN' ? zhCN : enUS;
  const routes = renderRoutes(routeConfig);
  const authRoutes = renderAuthRoutes(routes);

  const RenderApp = (
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <RouterProvider router={createBrowserRouter(authRoutes)} />
      </ConfigProvider>
    </Provider>
  );

  return env === 'dev' ? <React.StrictMode>{RenderApp}</React.StrictMode> : RenderApp;
};

export default App;
