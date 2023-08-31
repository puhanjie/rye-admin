import { Button, Form, Input, Modal, TreeSelect, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { editPermission, getPermissionList } from '@/services/permission';
import routeConfig from '@/router';
import { getMenuTree } from '@/utils/general';
import AuthWrapper from '@/components/AuthWrapper';
import { EditOutlined } from '@ant-design/icons';

type Props = {
  data: API.PermissionInfo[];
  setPermissionData: React.Dispatch<
    React.SetStateAction<API.PageInfo<API.PermissionInfo[]> | undefined>
  >;
};

const Edit: React.FC<Props> = ({ data, setPermissionData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const menuData = routeConfig.filter((item) => item.path === '/')[0].children;

  const handleEdit = () => {
    if (data.length !== 1) {
      message.warning(t('common.tip.selectOne'));
      return;
    }
    setIsOpen(true);
  };

  const handleOk = async () => {
    const permission: API.PermissionParams = form.getFieldsValue();
    setIsOpen(false);
    const editResult = await editPermission(permission);
    if (!editResult.data) {
      message.error(t('pages.permission.edit.tip.fail'));
      form.resetFields();
      return;
    }
    // 编辑权限成功后重新获取权限列表数据
    const queryResult = await getPermissionList();
    if (!queryResult.data) {
      return;
    }
    setPermissionData(queryResult.data);
    message.success(t('pages.permission.edit.tip.success'));
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="permission:edit">
        <Button icon={<EditOutlined />} onClick={handleEdit}>
          {t('pages.permission.edit')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.permission.editModal.title')}
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
        {data.length === 1 && (
          <Form
            name="editPermission"
            form={form}
            // preserve属性避免modal关闭清空表单后重新打开还是上一次的值
            preserve={false}
            initialValues={data[0]}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
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
export default Edit;
