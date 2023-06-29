import { Tabs } from 'antd';
import Info from './components/Info';
import Password from './components/Password';
import PageContainer from '@/components/PageContainer';
import styles from './index.module.less';

const Setting: React.FC = () => {
  const tabs = [
    {
      key: 'info',
      label: '基本信息',
      children: <Info />
    },
    {
      key: 'password',
      label: '修改密码',
      children: <Password />
    }
  ];
  return (
    <PageContainer className={styles['container']}>
      <Tabs items={tabs} tabPosition="left" className={styles['tabs']} />
    </PageContainer>
  );
};

export default Setting;
