import { Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';

type Props = {
  selectId: number;
};

const Delete: React.FC<Props> = ({ selectId }) => {
  const { t } = useTranslation();

  const handleConfirm = () => {
    if (!selectId) {
      message.error(t('common.tip.id'));
      return;
    }
    message.success('Click on Yes');
  };

  const handleCancel = () => {
    message.error('Click on No');
  };

  return (
    <div>
      <Popconfirm
        title={t('common.tip.delete.title')}
        description={t('common.tip.delete.description')}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        okText={t('common.yes')}
        cancelText={t('common.no')}
      >
        <a>{t('pages.role.delete')}</a>
      </Popconfirm>
    </div>
  );
};

export default Delete;
