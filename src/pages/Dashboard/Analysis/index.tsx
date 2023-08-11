import PageWrapper from '@/components/PageWrapper';
import { Result } from 'antd';
import styles from './index.module.less';

const Analysis: React.FC = () => {
  return (
    <PageWrapper className={styles['container']}>
      <Result
        status="success"
        title="Welcome!"
        subTitle="Cloud server configuration takes 1-5 minutes, please wait."
      />
    </PageWrapper>
  );
};

export default Analysis;
