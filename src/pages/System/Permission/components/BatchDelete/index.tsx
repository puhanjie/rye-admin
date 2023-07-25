import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import type { TablePermissionInfo } from '../..';

type Props = {
  selectedData: TablePermissionInfo[];
};

const BatchDelete: React.FC<Props> = ({ selectedData }) => {
  const { t } = useTranslation();

  const handleConfirm = () => {
    if (selectedData.length <= 0) {
      message.warning(t('common.tip.select'));
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
        title={t('common.tip.batchDelete.title')}
        description={t('common.tip.batchDelete.description')}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        okText={t('common.yes')}
        cancelText={t('common.no')}
      >
        <Button danger icon={<DeleteOutlined />}>
          {t('pages.permission.batchDelete')}
        </Button>
      </Popconfirm>
    </div>
  );
};

export default BatchDelete;
