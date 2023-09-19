import AuthWrapper from '@/components/AuthWrapper';
import { EyeOutlined } from '@ant-design/icons';
import { Button, Descriptions, type DescriptionsProps, Modal, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  data: API.FileInfo[];
};

const View: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const items: DescriptionsProps['items'] =
    data.length === 1
      ? [
          {
            key: 'path',
            label: t('pages.file.path'),
            children: data[0].path
          },
          {
            key: 'name',
            label: t('pages.file.name'),
            children: data[0].name
          },
          {
            key: 'fileSize',
            label: t('pages.file.fileSize'),
            children: data[0].fileSize
          },
          {
            key: 'uuid',
            label: t('pages.file.uuid'),
            children: data[0].uuid
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
      <AuthWrapper permission="file:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t('pages.file.view')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.file.viewModal.title')}
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
