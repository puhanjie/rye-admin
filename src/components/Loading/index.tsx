import { Spin } from 'antd';
import styles from './index.module.less';

const Loading: React.FC = () => {
  return (
    <div className={styles['container']}>
      <Spin delay={500} />
    </div>
  );
};

export default Loading;
