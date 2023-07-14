import { LoginOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space } from 'antd';
import styles from './index.module.less';
import { useAppDispatch, useAppSelector } from '../../../store';
import { clearToken } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '@/store/modules/user';
import LanguageSwich from '@/components/LanguageSwich';
import { useTranslation } from 'react-i18next';

const HeaderRight: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const items = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('pages.layouts.header.settings')
    },
    {
      key: 'loginout',
      icon: <LoginOutlined />,
      label: t('pages.layouts.header.signOut')
    }
  ];
  const onClick = ({ key }: { key: string }) => {
    // 个人设置
    if (key === 'settings') {
      navigate('/account/settings');
    }

    // 退出登录
    if (key === 'loginout') {
      clearToken();
      // 清空redux中数据
      dispatch(
        setUserInfo({
          username: '',
          avatar: '',
          roles: [],
          permissions: []
        })
      );
      navigate('/login');
    }
  };

  // 从store取用户信息(回调函数中state.后面的对象名为userSlice模块中的模块名name)
  const { username, avatar } = useAppSelector((state) => state.user);

  return (
    <Space align="center">
      <Dropdown menu={{ items, onClick }} placement="bottom" className={styles['user']}>
        <span className={styles['info']}>
          <Avatar src={avatar} size={26} alt="avatar" />
          <span>{username}</span>
        </span>
      </Dropdown>
      <LanguageSwich />
    </Space>
  );
};

export default HeaderRight;
