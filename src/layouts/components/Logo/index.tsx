import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

type Props = {
  collapsed?: boolean;
};

const Logo: React.FC<Props> = ({ collapsed }) => {
  const navigate = useNavigate();

  return (
    <div
      id="logo"
      style={collapsed ? { padding: '8px' } : { padding: '8px 24px' }}
      className={styles['container']}
      onClick={() => navigate('/')}
    >
      <img src="/src/assets/logo.svg" alt="logo" className={styles['image']} />
      {!collapsed && <span className={styles['title']}>Rye Admin</span>}
    </div>
  );
};

export default Logo;
