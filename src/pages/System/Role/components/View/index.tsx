import routeConfig from '@/router';
import { getPermissionTreeData } from '@/utils/general';
import { Button, Form, Input, Modal, TreeSelect, message } from 'antd';
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
  const [form] = Form.useForm();
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  const getInitData = () => {
    const { id, name, info, permissions } = data.selectData[0];
    return {
      id,
      name,
      info,
      permissions: permissions?.map((item) => item.id),
      permissionList: data.permissionList
    };
  };

  const handleView = () => {
    if (data.selectData.length !== 1) {
      message.warning(t('common.tip.selectOne'));
      return;
    }
    setIsOpen(true);
  };

  const handleOk = async () => {
    setIsOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
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
          padding: '30px',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        {data.selectData.length === 1 && (
          <Form
            name="viewRole"
            form={form}
            disabled
            // preserve属性避免modal关闭清空表单后重新打开还是上一次的值
            preserve={false}
            initialValues={getInitData()}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Form.Item label="id" name="id" hidden={true} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label={t('pages.role.name')} name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label={t('pages.role.info')} name="info" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label={t('pages.role.permission')} name="permissions">
              <TreeSelect
                allowClear
                treeData={getPermissionTreeData(menuData, getInitData().permissionList)}
                maxTagCount={3}
                treeCheckable={true}
                showCheckedStrategy="SHOW_CHILD"
                placeholder={t('pages.role.modal.permission.placeholder')}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default View;
