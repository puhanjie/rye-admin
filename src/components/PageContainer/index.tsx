import styles from './index.module.less';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const PageContainer: React.FC<Props> = ({ children, className }) => {
  return <div className={`${styles['container']} ${className}`}>{children}</div>;
};

export default PageContainer;
