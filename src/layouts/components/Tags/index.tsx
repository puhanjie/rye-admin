import { Tag, theme } from 'antd';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { useEffect, useRef, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import routeConfig from '@/router';
import { useTranslation } from 'react-i18next';

type TagData = {
  name?: string;
  path: string;
};

const Tags: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [distance, setDistance] = useState(0);
  const [tags, setTags] = useState<TagData[]>([]);
  const scroll = useRef<HTMLInputElement>(null);

  const {
    token: { colorPrimary }
  } = theme.useToken();

  const scrollToLeft = () => {
    if (!scroll.current) {
      return;
    }
    if (distance <= 0) {
      return;
    }
    const move = distance - 50 <= 0 ? 0 : distance - 50;
    scroll.current.scrollLeft = move;
    setDistance(move);
  };

  const scrollToRight = () => {
    if (!scroll.current) {
      return;
    }
    if (distance >= scroll.current.scrollWidth) {
      return;
    }
    const move =
      distance + 50 >= scroll.current.scrollWidth ? scroll.current.scrollWidth : distance + 50;
    scroll.current.scrollLeft = move;
    setDistance(move);
  };

  const isShow = () => {
    if (scroll.current?.scrollWidth && scroll.current?.clientWidth) {
      // 出现滚动条返回true，否则返回false
      return scroll.current?.scrollWidth > scroll.current?.clientWidth;
    }
    return false;
  };

  const addTags = (routeConfig: RouteConfig[], tags: TagData[]) => {
    const currentRoute = matchRoutes(routeConfig, pathname)?.slice(-1)[0];
    const findData = tags.filter((item) => item.path === pathname);
    // 当前path对应的tag已存在则不添加
    if (findData.length > 0) {
      return;
    }
    // 若当前路由匹配对象无title和pathname，则返回
    if (!(currentRoute?.route.name && currentRoute?.pathname)) {
      return;
    }
    const currentTag: TagData = {
      name: currentRoute?.route.name,
      path: currentRoute?.pathname
    };
    setTags([...tags, currentTag]);
  };

  const removeTags = (tag: TagData, tags: TagData[]) => {
    const index = tags.indexOf(tag);
    const beforeIndex = index - 1;
    const afterIndex = index + 1;
    const newTags = tags.filter((item) => item.path !== tag.path);

    setTags(newTags);
    // 若关闭的不是当前活跃的标签，则不进行路由跳转
    if (tag.path !== pathname) {
      return;
    }
    // 若关闭最后一个标签，则跳转至首页
    if (!tags[beforeIndex] && !tags[afterIndex]) {
      navigate('/');
      return;
    }
    tags[beforeIndex] ? navigate(tags[beforeIndex].path) : navigate(tags[afterIndex].path);
  };

  useEffect(() => {
    addTags(routeConfig, tags);
  }, [pathname]);

  const MenuTags = tags.map((item) => {
    return (
      <Tag
        className={styles['tag']}
        key={item.path} //key要唯一，不能使用索引值，否则会导致close标签的时候关闭两个
        closable
        onClick={() => navigate(item.path)}
        onClose={() => removeTags(item, tags)}
        color={item.path === pathname ? colorPrimary : 'default'}
      >
        {t(`menu.${item.name}`)}
      </Tag>
    );
  });

  return tags.length > 0 ? (
    <div className={styles['container']}>
      <LeftOutlined
        className={styles['scroll-action']}
        onClick={scrollToLeft}
        style={{ visibility: isShow() ? 'visible' : 'hidden' }}
      />
      <div ref={scroll} className={styles['tags']}>
        {MenuTags}
      </div>
      <RightOutlined
        className={styles['scroll-action']}
        onClick={scrollToRight}
        style={{ visibility: isShow() ? 'visible' : 'hidden' }}
      />
    </div>
  ) : null;
};

export default Tags;
