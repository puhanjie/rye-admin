import { Button, type DescriptionsProps, Modal, message, Tag, Descriptions } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { EyeOutlined } from '@ant-design/icons';
import { departmentStatusTagColor } from '@/config/statusTagConfig';

type Props = {
  data?: API.DepartmentDetailTree[];
};

const View: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const items: DescriptionsProps['items'] =
    data && data.length === 1
      ? [
          {
            key: 'parentDept',
            label: t('pages.department.parentDept'),
            children: data[0].parentDept.name,
            labelStyle: {
              visibility: data[0].parentId === 0 ? 'hidden' : 'visible'
            }
          },
          {
            key: 'code',
            label: t('pages.department.code'),
            children: data[0].code
          },
          {
            key: 'name',
            label: t('pages.department.name'),
            children: data[0].name
          },
          {
            key: 'leader',
            label: t('pages.department.leader'),
            children: data[0].leader.name
          },
          {
            key: 'deptStatus',
            label: t('pages.department.deptStatus'),
            children: (
              <Tag
                color={
                  departmentStatusTagColor.filter(
                    (item) => data[0].deptStatus.dictValue === item.value
                  )[0].color
                }
              >
                {data[0].deptStatus.dictLabel}
              </Tag>
            )
          },
          {
            key: 'role',
            label: t('pages.department.role'),
            children: data[0].roles?.map((item) => <Tag key={item.id}>{item.name}</Tag>)
          }
        ]
      : [];

  const handleView = () => {
    if (!data || data.length !== 1) {
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
      <AuthWrapper permission="department:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t('pages.department.view')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.department.viewModal.title')}
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
