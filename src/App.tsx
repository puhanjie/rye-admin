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

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'zhCN' ? zhCN : enUS;
  const routes = renderRoutes(routeConfig);
  const authRoutes = renderAuthRoutes(routes);

  return (
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <RouterProvider router={createBrowserRouter(authRoutes)} />
      </ConfigProvider>
    </Provider>
  );
};

export default App;
