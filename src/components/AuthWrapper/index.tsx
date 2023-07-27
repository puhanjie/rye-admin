import { useAppSelector } from '@/store';

type Props = {
  permission: string;
  children: React.ReactNode;
};

const AuthWrapper: React.FC<Props> = ({ children, permission }) => {
  const { permissions } = useAppSelector((state) => state.user);

  if (!permissions) {
    return null;
  }
  const findData = permissions.filter(
    (item) => item.name === permission || item.name === 'app:admin'
  );
  if (findData.length <= 0) {
    return null;
  }
  return <>{children}</>;
};

export default AuthWrapper;
