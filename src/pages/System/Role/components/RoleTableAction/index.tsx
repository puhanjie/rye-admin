import { Divider, Popconfirm, Space, message } from 'antd';
import { useState } from 'react';
import EditRoleModal, { type EditRoleInfo } from '../EditRoleModal';
import { useTranslation } from 'react-i18next';

type Props = {
  data: EditRoleInfo;
};

const RoleTableAction: React.FC<Props> = ({ data }) => {
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
          {t('pages.role.edit')}
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
          <a>{t('pages.role.delete')}</a>
        </Popconfirm>
      </Space>
      <EditRoleModal initData={data} open={isEditOpen} setIsOpen={setIsEditOpen} />
    </div>
  );
};

export default RoleTableAction;
