import { Button, Result } from 'antd';
import styles from './index.module.less';
import { useNavigate } from 'react-router-dom';

const Page404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['container']}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default Page404;
