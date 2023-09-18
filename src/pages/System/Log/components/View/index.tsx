import { Button, type DescriptionsProps, Modal, message, Descriptions } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { EyeOutlined } from '@ant-design/icons';

type Props = {
  data: API.LogInfo[];
};

const View: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const items: DescriptionsProps['items'] =
    data.length === 1
      ? [
          {
            key: 'url',
            label: t('pages.log.url'),
            children: data[0].url
          },
          {
            key: 'code',
            label: t('pages.log.code'),
            children: data[0].code
          },
          {
            key: 'message',
            label: t('pages.log.message'),
            children: data[0].message
          },
          {
            key: 'operateUser',
            label: t('pages.log.operateUser'),
            children: data[0].operateUser.name
          },
          {
            key: 'operateTime',
            label: t('pages.log.operateTime'),
            children: data[0].operateTime
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
      <AuthWrapper permission="log:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t('pages.log.view')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.log.viewModal.title')}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{
          padding: '12px',
          marginTop: '12px',
          borderTop: '2px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Descriptions bordered column={1} items={items} />
      </Modal>
    </div>
  );
};
export default View;
