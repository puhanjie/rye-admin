import styles from './index.module.less';
import LoginHeader from '@/pages/Login/components/LoginHeader';
import LoginContent from '@/pages/Login/components/LoginContent';
import Footer from '@/components/Footer';

const Login: React.FC = () => {
  return (
    <div className={`${styles['container']} scrollbar`}>
      <LoginHeader className={styles['header']} />
      <LoginContent className={styles['content']} />
      <Footer className={styles['footer']} />
    </div>
  );
};

export default Login;
