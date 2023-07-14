import './App.less';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { Provider } from 'react-redux';
import store from './store';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'zhCN' ? zhCN : enUS;

  return (
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  );
};

export default App;
