import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Row, Space } from 'antd';
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string;
  queryFields: QueryField[];
  onQuery: (values: any) => void;
};

const Query: React.FC<Props> = ({ className, queryFields, onQuery }) => {
  const { t } = useTranslation();

  const renderQueryFields = (queryFields: QueryField[]) => {
    const children: React.ReactNode[] = [];
    for (let i = 0; i < queryFields.length; i++) {
      children.push(
        <Col span={8} key={i} style={{ margin: '5px 0' }}>
          <Form.Item label={queryFields[i].label} name={queryFields[i].name}>
            {queryFields[i].render}
          </Form.Item>
        </Col>
      );
    }
    return children;
  };

  return (
    <div className={className}>
      <Form
        name="query"
        layout="inline"
        onFinish={onQuery}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Row style={{ width: '100%' }} align="middle">
          <Col span={20}>
            <Row>{renderQueryFields(queryFields)}</Row>
          </Col>
          <Col span={4} style={{ textAlign: 'center' }}>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                {t('common.button.query')}
              </Button>
              <Button htmlType="reset" icon={<ReloadOutlined />}>
                {t('common.button.reset')}
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <Divider style={{ margin: '10px 0' }} />
    </div>
  );
};

export default Query;
