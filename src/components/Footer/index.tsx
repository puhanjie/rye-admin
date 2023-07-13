import { CopyrightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string | undefined;
};

const Footer: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <div>
        <span>
          <CopyrightOutlined />
        </span>
        &nbsp;{t('app.footer')}
      </div>
    </div>
  );
};

export default Footer;
