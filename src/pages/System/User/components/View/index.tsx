import { Button, type DescriptionsProps, Modal, message, Tag, Descriptions } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import type { UserDetail } from '../..';
import { EyeOutlined } from '@ant-design/icons';
import { userStatusTagColor } from '@/config/statusTagConfig';

type Props = {
  data: UserDetail;
};

const View: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const items: DescriptionsProps['items'] =
    data.selectData.length === 1
      ? [
          {
            key: 'username',
            label: '用户名',
            children: data.selectData[0].username
          },
          {
            key: 'nickname',
            label: '昵称',
            children: data.selectData[0].nickname
          },
          {
            key: 'userStatus',
            label: '用户状态',
            children: (
              <Tag
                color={
                  userStatusTagColor.filter(
                    (item) => data.selectData[0].userStatus.itemValue === item.value
                  )[0].color
                }
              >
                {data.selectData[0].userStatus.itemText}
              </Tag>
            )
          },
          {
            key: 'roles',
            label: '角色',
            children: data.selectData[0].roles?.map((item) => <Tag key={item.id}>{item.info}</Tag>)
          },
          {
            key: 'phone',
            label: '手机',
            children: data.selectData[0].phone
          },
          {
            key: 'email',
            label: '邮箱',
            children: data.selectData[0].email
          }
        ]
      : [];

  const handleView = () => {
    if (data.selectData.length !== 1) {
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
