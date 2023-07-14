import { Divider, Popconfirm, Space, message } from 'antd';
import { useState } from 'react';
import EditPermissionModal, { type EditPermissionInfo } from '../EditPermissionModal';
import { useTranslation } from 'react-i18next';

type Props = {
  data: EditPermissionInfo;
};

const PermissionTableAction: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div>
      <Space split={<Divider type="vertical" style={{ margin: '0 1px' }} />}>
        <a
          type="link"
          onClick={() => {
            setIsEditOpen(true);
          }}
        >
          {t('pages.permission.edit')}
        </a>
        <Popconfirm
          title={t('common.tip.delete.title')}
          description={t('common.tip.delete.description')}
          onConfirm={() => {
            message.success('Click on Yes');
          }}
          onCancel={() => {
            message.error('Click on No');
          }}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          <a>{t('pages.permission.delete')}</a>
        </Popconfirm>
      </Space>
      <EditPermissionModal initData={data} open={isEditOpen} setIsOpen={setIsEditOpen} />
    </div>
  );
};

export default PermissionTableAction;
