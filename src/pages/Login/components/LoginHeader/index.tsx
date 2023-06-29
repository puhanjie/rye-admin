import LanguageSwich from '@/components/LanguageSwich';

type Props = {
  className?: string | undefined;
};

const LoginHeader: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <LanguageSwich />
    </div>
  );
};

export default LoginHeader;
