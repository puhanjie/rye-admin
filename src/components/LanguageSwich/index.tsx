import styles from './index.module.less';
import { useTranslation } from 'react-i18next';

const LanguageSwich: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div
      className={styles.language}
      onClick={() => i18n.changeLanguage(i18n.language === 'zhCN' ? 'enUS' : 'zhCN')}
    >
      <span
        className={`${styles['language-zh']} ${
          i18n.language === 'zhCN' ? styles['language-top'] : styles['language-bottom']
        }`}
      >
        中
      </span>
      <span
        className={`${styles['language-en']} ${
          i18n.language === 'enUS' ? styles['language-top'] : styles['language-bottom']
        }`}
      >
        En
      </span>
    </div>
  );
};

export default LanguageSwich;
