import { Button, Form, Input, Modal, TreeSelect, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import routeConfig from '@/router';
import { getMenuTree } from '@/utils/general';
import AuthWrapper from '@/components/AuthWrapper';
import { EyeOutlined } from '@ant-design/icons';

type Props = {
  data: API.PermissionInfo[];
};

const View: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  const handleView = () => {
    if (data.length !== 1) {
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
        destroyOnClose={true}
        bodyStyle={{
          padding: '30px',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        {data.length === 1 && (
          <Form
            name="viewPermission"
            form={form}
            disabled
            // preserve属性避免modal关闭清空表单后重新打开还是上一次的值
            preserve={false}
            initialValues={data[0]}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
          >
            <Form.Item label="id" name="id" hidden={true} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label={t('pages.permission.name')} name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label={t('pages.permission.info')} name="info" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label={t('pages.permission.menu')} name="menu" rules={[{ required: true }]}>
              <TreeSelect
                treeData={getMenuTree(menuData)}
                allowClear
                treeDefaultExpandedKeys={data[0].menu ? [data[0].menu] : []}
                showCheckedStrategy="SHOW_CHILD"
                placeholder={t('pages.permission.modal.menu.placeholder')}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};
export default View;
