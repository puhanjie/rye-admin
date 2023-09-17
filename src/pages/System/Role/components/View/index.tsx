import routeConfig from '@/router';
import { getPermissionTreeData } from '@/utils/general';
import { Button, type DescriptionsProps, Modal, message, Descriptions, Tree, Tag } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { EyeOutlined } from '@ant-design/icons';
import { roleStatusTagColor } from '@/config/statusTagConfig';

type Props = {
  data: API.RoleInfo[];
  optionsData?: API.RoleOptions;
};

const View: React.FC<Props> = ({ data, optionsData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  const items: DescriptionsProps['items'] =
    data.length === 1
      ? [
          {
            key: 'code',
            label: t('pages.role.code'),
            children: data[0].code
          },
          {
            key: 'name',
            label: t('pages.role.name'),
            children: data[0].name
          },
          {
            key: 'roleStatus',
            label: t('pages.role.roleStatus'),
            children: (
              <Tag
                color={
                  roleStatusTagColor.filter(
                    (item) => data[0].roleStatus.dictValue === item.value
                  )[0].color
                }
              >
                {data[0].roleStatus.dictLabel}
              </Tag>
            )
          },
          {
            key: 'permissions',
            label: t('pages.role.permission'),
            children: (
              <Tree
                checkable
                selectable={false}
                defaultCheckedKeys={data[0].permissions?.map((item) => item.id.toString())}
                treeData={getPermissionTreeData(menuData, optionsData?.permissions)}
                rootClassName="scrollbar-light"
                rootStyle={{
                  height: '100px',
                  width: '100%',
                  border: '1px solid #e5e6e7',
                  borderRadius: '4px'
                }}
              />
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
      <AuthWrapper permission="role:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t('pages.role.view')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.role.viewModal.title')}
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
