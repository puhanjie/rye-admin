import { Tag, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

export type TagData = {
  name: string;
  path: string;
};

type Props = {
  className?: string;
  data?: TagData[];
  currentPath?: string;
};

const Tags: React.FC<Props> = ({ className, data, currentPath }) => {
  const navigate = useNavigate();

  const {
    token: { colorPrimary }
  } = theme.useToken();

  if (!data || data.length <= 0) {
    return null;
  }

  const MenuTags = data?.map((item, index) => {
    return (
      <Tag
        key={index}
        closable
        onClick={() => navigate(item.path)}
        style={{ marginTop: '2px', marginBottom: '2px', cursor: 'pointer' }}
        color={item.path === currentPath ? colorPrimary : 'default'}
      >
        {item.name}
      </Tag>
    );
  });
  return <div className={className}>{MenuTags}</div>;
};

export default Tags;
