import { Button, type DescriptionsProps, Modal, message, Tag, Descriptions } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { EyeOutlined } from '@ant-design/icons';
import { userStatusTagColor } from '@/config/statusTagConfig';

type Props = {
  data: API.UserInfo[];
};

const View: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const items: DescriptionsProps['items'] =
    data.length === 1
      ? [
          {
            key: 'department',
            label: t('pages.user.department'),
            children: data[0].department.name
          },
          {
            key: 'username',
            label: t('pages.user.username'),
            children: data[0].username
          },
          {
            key: 'name',
            label: t('pages.user.name'),
            children: data[0].name
          },
          {
            key: 'sex',
            label: t('pages.user.sex'),
            children: data[0].sex.dictLabel
          },
          {
            key: 'userStatus',
            label: t('pages.user.userStatus'),
            children: (
              <Tag
                color={
                  userStatusTagColor.filter(
                    (item) => data[0].userStatus.dictValue === item.value
                  )[0].color
                }
              >
                {data[0].userStatus.dictLabel}
              </Tag>
            )
          },
          {
            key: 'post',
            label: t('pages.user.post'),
            children: data[0].posts?.map((item) => <Tag key={item.id}>{item.name}</Tag>)
          },
          {
            key: 'role',
            label: t('pages.user.role'),
            children: data[0].roles?.map((item) => <Tag key={item.id}>{item.name}</Tag>)
          },
          {
            key: 'phone',
            label: t('pages.user.phone'),
            children: data[0].phone
          },
          {
            key: 'email',
            label: t('pages.user.email'),
            children: data[0].email
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
      <AuthWrapper permission="user:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t('pages.user.view')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.user.viewModal.title')}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{
          padding: '12px',
          marginTop: '12px',
          borderTop: '2px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Descriptions bordered column={2} items={items} />
      </Modal>
    </div>
  );
};

export default View;
