import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styles from './index.module.less';
import LoginForm from '../LoginForm';

type Props = {
  className?: string;
};

const LoginContent: React.FC<Props> = ({ className }) => {
  // 登陆页签items内容项
  const loginTabs = [
    {
      key: 'account',
      label: '账户密码登陆',
      children: <LoginForm loginType="account" />
    },
    {
      key: 'phone',
      label: '手机号登陆',
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
          <img src="/src/assets/logo.svg" alt="logo" className={styles['logo']} />
          <span className={styles['login-title']}>Rye Admin</span>
        </div>
        <div className={styles['login-desc']}>Rye Admin 是后台系统最具影响力的 Web 设计规范</div>
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
