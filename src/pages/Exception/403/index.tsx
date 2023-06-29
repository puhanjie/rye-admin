import { Button, Result } from 'antd';
import styles from './index.module.less';
import { useNavigate } from 'react-router-dom';

const Page403: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['container']}>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default Page403;
