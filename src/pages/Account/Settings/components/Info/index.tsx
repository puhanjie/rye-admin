import { editUser } from '@/services/user';
import { Avatar, Button, Form, Input, Upload, type UploadFile } from 'antd';
import styles from './index.module.less';
import { UploadOutlined } from '@ant-design/icons';
import Container from '../Container';
import { useTranslation } from 'react-i18next';
import { getToken } from '@/utils/auth';
import { useAppDispatch, useAppSelector } from '@/store';
import { setAvatar } from '@/store/modules/user';

type UserForm = {
  username: string;
  phone: string;
  email: string;
};

const Info: React.FC = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleFinish = async (values: UserForm) => {
    await editUser(values);
  };

  const handleChange = ({ file }: { file: UploadFile<API.Result<string>> }) => {
    if (!file.response) {
      return;
    }
    if (!file.response.data) {
      return;
    }
    const avatar = file.response.data;
    dispatch(setAvatar(avatar));
  };

  return (
    <Container title={t('pages.settings.basicInfo.tab')} className={styles['container']}>
      <div className={styles['main']}>
        <div className={styles['left']}>
          <Form
            name="info"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={user}
            onFinish={handleFinish}
          >
            <Form.Item label="id" name="id" hidden>
              <Input />
            </Form.Item>
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
          <Avatar className={styles['avatar']} src={user.avatar} size={128} />
          <Upload
            className={styles['upload']}
            name="files"
            headers={{ Authorization: `Bearer ${getToken()}` }}
            method="PUT"
            action={`${import.meta.env.VITE_APP_BASE_API}/api/v1/user/avatar`}
            maxCount={1}
            showUploadList={false}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>{t('common.button.changeAvator')}</Button>
          </Upload>
        </div>
      </div>
    </Container>
  );
};

export default Info;
