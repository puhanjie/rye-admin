import { CopyrightOutlined } from '@ant-design/icons';

type Props = {
  className?: string | undefined;
};

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div>
        <span>
          <CopyrightOutlined />
        </span>
        &nbsp;Rye集团体验技术部出品
      </div>
    </div>
  );
};

export default Footer;
