import { Divider } from 'antd';
import styles from './index.module.less';

type Props = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
};

const Container: React.FC<Props> = ({ title, className, children }) => {
  return (
    <div className={className}>
      <div className={styles['title']}>{title}</div>
      <Divider style={{ margin: '10px 0 20px 0' }} />
      {children}
    </div>
  );
};

export default Container;
