import { Button, type DescriptionsProps, Modal, message, Descriptions } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { EyeOutlined } from '@ant-design/icons';

type Props = {
  data: API.DictionaryInfo[];
};

const View: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const items: DescriptionsProps['items'] =
    data.length === 1
      ? [
          {
            key: 'dictType',
            label: t('pages.dictionary.dictType'),
            children: data[0].dictType
          },
          {
            key: 'dictName',
            label: t('pages.dictionary.dictName'),
            children: data[0].dictName
          },
          {
            key: 'dictValue',
            label: t('pages.dictionary.dictValue'),
            children: data[0].dictValue
          },
          {
            key: 'dictLabel',
            label: t('pages.dictionary.dictLabel'),
            children: data[0].dictLabel
          },
          {
            key: 'description',
            label: t('pages.dictionary.description'),
            children: data[0].description
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
      <AuthWrapper permission="dictionary:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t('pages.dictionary.view')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.dictionary.viewModal.title')}
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
