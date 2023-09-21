import { editInfo, getInfo } from '@/services/user';
import {
  Avatar,
  Button,
  Form,
  Input,
  Upload,
  message,
  type UploadFile,
  Select,
  Row,
  Col
} from 'antd';
import styles from './index.module.less';
import { UploadOutlined } from '@ant-design/icons';
import Container from '../Container';
import { useTranslation } from 'react-i18next';
import { getToken } from '@/utils/auth';
import { useAppDispatch, useAppSelector } from '@/store';
import { setAvatar, setUserInfo } from '@/store/modules/user';
import defaultAvatar from '@/assets/avatar.png';
import { getDictSelectOptions } from '@/utils/general';
import { useEffect, useState } from 'react';
import { getDictionarys } from '@/services/dictionary';
import Loading from '@/components/Loading';

const Info: React.FC = () => {
  const { t } = useTranslation();
  const [sexData, setSexData] = useState<API.Dictionary[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const res = await getDictionarys({ dictType: 'sex' });
      if (!res.data) {
        return;
      }
      setSexData(res.data);
      setLoading(false);
    })();
  }, []);

  const getInitData = (user: API.UserBasicInfo) => {
    const { id, avatar, username, name, sex, phone, email, roles, permissions } = user;
    return {
      id,
      avatar,
      username,
      name,
      sex: sex?.dictValue,
      phone,
      email,
      roles,
      permissions
    };
  };

  const handleFinish = async (values: API.BasicInfoParams) => {
    const editResult = await editInfo(values);
    if (!editResult.data) {
      message.error(t('pages.settings.edit.tip.fail'));
    }
    const queryResult = await getInfo();
    if (!queryResult.data) {
      return;
    }
    dispatch(setUserInfo(queryResult.data));
    message.success(t('pages.settings.edit.tip.success'));
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

  return loading ? (
    <Loading />
  ) : (
    <Container title={t('pages.settings.basicInfo.tab')} className={styles['container']}>
      <Row>
        <Col span={12}>
          <Form
            name="info"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={getInitData(user)}
            onFinish={handleFinish}
          >
            <Form.Item label="id" name="id" hidden>
              <Input />
            </Form.Item>
            <Form.Item label={t('pages.settings.name')} name="name">
              <Input />
            </Form.Item>
            <Form.Item label={t('pages.settings.sex')} name="sex">
              <Select
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={getDictSelectOptions(sexData)}
                placeholder={t('pages.settings.select.placeholder')}
              />
            </Form.Item>
            <Form.Item label={t('pages.settings.phone')} name="phone">
              <Input />
            </Form.Item>
            <Form.Item label={t('pages.settings.email')} name="email">
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Button type="primary" htmlType="submit">
                {t('common.button.submit')}
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12} className={styles['change-avatar']}>
          <Avatar
            className={styles['avatar']}
            src={user.avatar ? user.avatar : defaultAvatar}
            size={128}
          />
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
            <Button icon={<UploadOutlined />}>{t('pages.settings.changeAvator')}</Button>
          </Upload>
        </Col>
      </Row>
    </Container>
  );
};

export default Info;
