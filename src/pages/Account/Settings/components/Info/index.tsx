import { getInfo, editUser } from '@/services/user';
import { Avatar, Button, Form, Input, Upload } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.module.less';
import { UploadOutlined } from '@ant-design/icons';
import Container from '../Container';
import { useTranslation } from 'react-i18next';
import { getToken } from '@/utils/auth';

type UserForm = {
  username: string;
  phone: string;
  email: string;
};

const Info: React.FC = () => {
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState<API.UserBasicInfo>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getInfo();
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
    <Container title={t('pages.settings.basicInfo.tab')} className={styles['container']}>
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
              <Form.Item label={t('pages.settings.username')} name="username">
                <Input />
              </Form.Item>
              <Form.Item label={t('pages.settings.phone')} name="phone">
                <Input />
              </Form.Item>
              <Form.Item label={t('pages.settings.email')} name="email">
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  {t('common.button.submit')}
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className={styles['right']}>
            <Avatar className={styles['avatar']} src={currentUser.avatar} size={128} />
            <Upload
              className={styles['upload']}
              headers={{ Authorization: `Bearer ${getToken()}` }}
              action={`${import.meta.env.VITE_APP_BASE_API}/api/v1/file`}
              maxCount={1}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>{t('common.button.changeAvator')}</Button>
            </Upload>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Info;
