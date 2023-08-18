import PageWrapper from '@/components/PageWrapper';
import { Result } from 'antd';
import styles from './index.module.less';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <PageWrapper className={styles['container']}>
      <Result status="success" title={t('pages.home.title')} />
    </PageWrapper>
  );
};

export default Home;
