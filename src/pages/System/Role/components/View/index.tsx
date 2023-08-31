import routeConfig from '@/router';
import { getPermissionTreeData } from '@/utils/general';
import { Button, type DescriptionsProps, Modal, message, Descriptions, Tree } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import type { RoleDetail } from '../..';
import { EyeOutlined } from '@ant-design/icons';

type Props = {
  data: RoleDetail;
};

const View: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  const getInitData = () => {
    const { id, name, info, permissions } = data.selectData[0];
    return {
      id,
      name,
      info,
      permissions: permissions?.map((item) => item.id.toString()),
      permissionList: data.permissionList
    };
  };

  const items: DescriptionsProps['items'] =
    data.selectData.length === 1
      ? [
          {
            key: 'name',
            label: '角色名',
            children: data.selectData[0].name
          },
          {
            key: 'info',
            label: '角色信息',
            children: data.selectData[0].info
          },
          {
            key: 'permissions',
            label: '权限',
            children: (
              <Tree
                checkable
                selectable={false}
                defaultCheckedKeys={data.selectData[0].permissions?.map((item) =>
                  item.id.toString()
                )}
                treeData={getPermissionTreeData(menuData, getInitData().permissionList)}
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
