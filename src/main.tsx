import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.less';
import 'antd/dist/reset.css';
import '@/locales';

// 开发环境启用mock
if (import.meta.env.MODE === 'dev') {
  import('../mock/index');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
