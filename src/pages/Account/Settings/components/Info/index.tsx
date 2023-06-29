import { getCurrentUser, editUser } from '@/services/user';
import { Avatar, Button, Form, Input, Upload } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.module.less';
import { UploadOutlined } from '@ant-design/icons';
import Container from '../Container';

type UserForm = {
  username: string;
  phone: string;
  email: string;
};

const Info: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<API.UserBasicInfo>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getCurrentUser();
      if (res?.data) {
        setCurrentUser(res.data);
        setLoading(false);
      }
    })();
  }, []);

  const handleFinish = async (values: UserForm) => {
    await editUser(values);
  };

  return (
    <Container title="基本信息" className={styles['container']}>
      {loading ? null : (
        <div className={styles['main']}>
          <div className={styles['left']}>
            <Form
              name="info"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={currentUser}
              onFinish={handleFinish}
            >
              <Form.Item label="用户名" name="username">
                <Input />
              </Form.Item>
              <Form.Item label="手机" name="phone">
                <Input />
              </Form.Item>
              <Form.Item label="邮箱" name="email">
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className={styles['right']}>
            <Avatar className={styles['avatar']} src={currentUser.avatar} size={128} />
            <Upload
              className={styles['upload']}
              action="http://localhost:5173/api/v1/file/upload"
              maxCount={1}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>更换头像</Button>
            </Upload>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Info;
