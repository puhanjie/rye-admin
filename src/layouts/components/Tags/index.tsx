import { Tag, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { useRef, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store';
import { setAppTags } from '@/store/modules/app';

export type TagData = {
  name: string;
  path: string;
};

type Props = {
  currentPath?: string;
};

const Tags: React.FC<Props> = ({ currentPath }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tags } = useAppSelector((state) => state.app);
  const [distance, setDistance] = useState(0);
  const scroll = useRef<HTMLInputElement>(null);

  const {
    token: { colorPrimary }
  } = theme.useToken();

  if (!tags || tags.length <= 0) {
    return null;
  }

  const scrollToLeft = () => {
    if (scroll.current && scroll.current.scrollLeft !== 0) {
      const move = distance - 50;
      scroll.current.scrollLeft = move;
      setDistance(move);
    }
  };

  const scrollToRight = () => {
    if (scroll.current && scroll.current.scrollLeft !== scroll.current.scrollWidth) {
      const move = distance + 50;
      scroll.current.scrollLeft = move;
      setDistance(move);
    }
  };

  const isShow = () => {
    if (scroll.current?.scrollWidth && scroll.current?.clientWidth) {
      // 出现滚动条返回true，否则返回false
      return scroll.current?.scrollWidth > scroll.current?.clientWidth;
    }
    return false;
  };

  const removeTags = (tag: TagData, tags: TagData[]) => {
    const newTags = tags.filter((item) => item.path !== tag.path);
    return newTags;
  };

  const MenuTags = tags?.map((item, index) => {
    return (
      <Tag
        key={index}
        closable
        onClick={() => navigate(item.path)}
        // TODO: 此处bug待修复，移除标签时从redux中也把数据移除会导致前段多关闭一个标签
        onClose={() => dispatch(setAppTags(removeTags(item, tags)))}
        style={{ marginTop: '2px', marginBottom: '2px', cursor: 'pointer' }}
        color={item.path === currentPath ? colorPrimary : 'default'}
      >
        {item.name}
      </Tag>
    );
  });
  return (
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
  );
};

export default Tags;
