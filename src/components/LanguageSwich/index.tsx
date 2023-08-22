import { Dropdown } from 'antd';
import styles from './index.module.less';
import { useTranslation } from 'react-i18next';

const LanguageSwich: React.FC = () => {
  const { i18n } = useTranslation();

  const items = [
    {
      key: 'zhCN',
      label: '简体中文'
    },
    {
      key: 'enUS',
      label: 'English'
    }
  ];

  const onClick = ({ key }: { key: string }) => {
    i18n.changeLanguage(key);
  };

  return (
    <Dropdown menu={{ items, selectedKeys: [i18n.language], onClick }}>
      <span className={styles['container']}>
        <img src="/src/assets/language.svg" className={styles['language']} />
      </span>
    </Dropdown>
  );
};

export default LanguageSwich;
