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
            key: 'dictName',
            label: '字典名',
            children: data[0].dictName
          },
          {
            key: 'dictText',
            label: '字典文本',
            children: data[0].dictText
          },
          {
            key: 'itemValue',
            label: '字典值',
            children: data[0].itemValue
          },
          {
            key: 'itemText',
            label: '字典值文本',
            children: data[0].itemText
          },
          {
            key: 'description',
            label: '描述',
            children: (
              <div
                className="scrollbar-light"
                style={{
                  height: '100px',
                  width: '100%',
                  padding: '0 5px',
                  border: '1px solid #e5e6e7',
                  borderRadius: '4px'
                }}
              >
                {data[0].description}
              </div>
            )
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
        destroyOnClose={true}
        bodyStyle={{
          padding: '30px',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
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
