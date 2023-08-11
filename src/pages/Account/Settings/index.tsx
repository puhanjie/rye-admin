import { Tabs } from 'antd';
import Info from './components/Info';
import Password from './components/Password';
import styles from './index.module.less';
import { useTranslation } from 'react-i18next';
import PageWrapper from '@/components/PageWrapper';

const Setting: React.FC = () => {
  const { t } = useTranslation();
  const tabs = [
    {
      key: 'info',
      label: t('pages.settings.basicInfo.tab'),
      children: <Info />
    },
    {
      key: 'password',
      label: t('pages.settings.updatePassword.tab'),
      children: <Password />
    }
  ];
  return (
    <PageWrapper className={styles['container']}>
      <Tabs items={tabs} tabPosition="left" className={styles['tabs']} />
    </PageWrapper>
  );
};

export default Setting;
