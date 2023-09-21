import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styles from './index.module.less';
import LoginForm from '../LoginForm';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.svg';

type Props = {
  className?: string;
};

const LoginContent: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  // 登陆页签items内容项
  const loginTabs = [
    {
      key: 'account',
      label: t('pages.login.accountLogin.tab'),
      children: <LoginForm loginType="account" />
    },
    {
      key: 'phone',
      label: t('pages.login.phoneLogin.tab'),
      children: <LoginForm loginType="phone" />
    }
  ];

  // 自定义登陆类型页签头样式
  const renderLoginTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <DefaultTabBar {...props} className={styles['login-tabbar']} />
  );

  return (
    <div className={className}>
      <div className={styles['login-top']}>
        <div className={styles['login-header']}>
          <img src={logo} alt="logo" className={styles['logo']} />
          <span className={styles['login-title']}>{t('app.name')}</span>
        </div>
        <div className={styles['login-desc']}>{t('app.description')}</div>
      </div>
      <Tabs
        className={styles['login-tabs']}
        defaultActiveKey="account"
        items={loginTabs}
        centered
        renderTabBar={renderLoginTabBar}
      />
    </div>
  );
};

export default LoginContent;
