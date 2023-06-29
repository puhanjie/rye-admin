import PageContainer from '@/components/PageContainer';
import { Result } from 'antd';

const Analysis: React.FC = () => {
  return (
    <PageContainer>
      <Result
        status="success"
        title="Welcome!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      />
    </PageContainer>
  );
};

export default Analysis;
