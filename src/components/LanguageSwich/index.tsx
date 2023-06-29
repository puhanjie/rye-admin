import { useState } from 'react';
import styles from './index.module.less';

const LanguageSwich: React.FC = () => {
  // 语言切换
  const [language, setLanguage] = useState('zh');
  const handleChange = (language: string) => {
    const lan = language === 'zh' ? 'en' : 'zh';
    setLanguage(lan);
  };

  return (
    <div className={styles.language} onClick={() => handleChange(language)}>
      <span
        className={`${styles['language-zh']} ${
          language === 'zh' ? styles['language-top'] : styles['language-bottom']
        }`}
      >
        中
      </span>
      <span
        className={`${styles['language-en']} ${
          language === 'en' ? styles['language-top'] : styles['language-bottom']
        }`}
      >
        En
      </span>
    </div>
  );
};

export default LanguageSwich;
