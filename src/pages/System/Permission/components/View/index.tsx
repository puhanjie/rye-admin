import { Button, type DescriptionsProps, Modal, message, Descriptions, Tag } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { EyeOutlined } from '@ant-design/icons';
import { permissionStatusTagColor } from '@/config/statusTagConfig';

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
            key: 'code',
            label: t('pages.permission.code'),
            children: data[0].name
          },
          {
            key: 'name',
            label: t('pages.permission.name'),
            children: data[0].name
          },
          {
            key: 'permissionStatus',
            label: t('pages.permission.permissionStatus'),
            children: (
              <Tag
                color={
                  permissionStatusTagColor.filter(
                    (item) => data[0].permissionStatus.dictValue === item.value
                  )[0].color
                }
              >
                {data[0].permissionStatus.dictLabel}
              </Tag>
            )
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
