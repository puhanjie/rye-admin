import { Button, type DescriptionsProps, Modal, message, Descriptions } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { EyeOutlined } from '@ant-design/icons';

type Props = {
  data: API.PermissionInfo[];
};

const View: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const items: DescriptionsProps['items'] =
    data.length === 1
      ? [
          {
            key: 'name',
            label: '权限名',
            children: data[0].name
          },
          {
            key: 'info',
            label: '权限信息',
            children: data[0].info
          },
          {
            key: 'menu',
            label: '菜单',
            children: t(`menu.${data[0].menu}`)
          }
        ]
      : [];

  const handleView = () => {
    if (data.length !== 1) {
      message.warning(t('common.tip.selectOne'));
      return;
    }
    setIsOpen(true);
  };

  const handleOk = async () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <AuthWrapper permission="permission:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t('pages.permission.view')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.permission.viewModal.title')}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        bodyStyle={{
          padding: '12px',
          marginTop: '12px',
          borderTop: '2px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Descriptions
          column={1}
          items={items}
          labelStyle={{ justifyContent: 'flex-end', minWidth: 100 }}
        />
      </Modal>
    </div>
  );
};
export default View;
