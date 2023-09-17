import { Button, type DescriptionsProps, Modal, message, Tag, Descriptions } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { EyeOutlined } from '@ant-design/icons';
import { postStatusTagColor } from '@/config/statusTagConfig';

type Props = {
  data: API.PostInfo[];
};

const View: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const items: DescriptionsProps['items'] =
    data.length === 1
      ? [
          {
            key: 'code',
            label: t('pages.post.code'),
            children: data[0].code
          },
          {
            key: 'name',
            label: t('pages.post.name'),
            children: data[0].name
          },
          {
            key: 'postStatus',
            label: t('pages.post.postStatus'),
            children: (
              <Tag
                color={
                  postStatusTagColor.filter(
                    (item) => data[0].postStatus.dictValue === item.value
                  )[0].color
                }
              >
                {data[0].postStatus.dictLabel}
              </Tag>
            )
          },
          {
            key: 'role',
            label: t('pages.post.role'),
            children: data[0].roles?.map((item) => <Tag key={item.id}>{item.name}</Tag>)
          },
          {
            key: 'remark',
            label: t('pages.post.remark'),
            children: data[0].remark
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
      <AuthWrapper permission="post:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t('pages.post.view')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.post.viewModal.title')}
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
