import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.less';
import 'antd/dist/reset.css';
import '@/locales';

const env = import.meta.env.MODE;

// 开发环境启用mock
if (env === 'dev') {
  import('../mock/index');
}

const RenderApp = () => {
  return env === 'dev' ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<RenderApp />);
