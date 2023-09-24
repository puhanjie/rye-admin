import {
  getRoleSelectOptions,
  getDictSelectOptions,
  getDeptTree,
  getUserSelectOptions
} from '@/utils/general';
import { Button, Form, Input, Modal, Select, TreeSelect, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { EditOutlined } from '@ant-design/icons';
import { editDepartment } from '@/services/department';

type Props = {
  data?: API.DepartmentDetailTree[];
  optionsData?: API.DepartmentOptions;
  queryData: (params?: API.DepartmentQuery) => void;
};

const Edit: React.FC<Props> = ({ data, optionsData, queryData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const getInitData = () => {
    if (!data) {
      return;
    }
    const { id, parentId, code, name, leader, deptStatus, roles } = data[0];
    return {
      id,
      parentId: parentId.toString(),
      code,
      name,
      leader: leader.id,
      deptStatus: deptStatus.dictValue,
      roles: roles?.map((item) => item.id)
    };
  };

  const handleEdit = () => {
    if (!data || data.length !== 1) {
      message.warning(t('common.tip.selectOne'));
      return;
    }
    form.setFieldsValue(getInitData());
    setIsOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);
    const department: API.DepartmentParams = form.getFieldsValue();
    department.parentId = Number(department.parentId);
    department.deptStatus = department.deptStatus && department.deptStatus[0];
    const editResult = await editDepartment(department);
    if (!editResult.data) {
      message.error(t('pages.department.edit.tip.fail'));
      form.resetFields();
      return;
    }
    setLoading(false);
    message.success(t('pages.department.edit.tip.success'));
    setIsOpen(false);
    form.resetFields();
    // 修改部门成功后重新获取部门列表数据
    queryData();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="department:edit">
        <Button icon={<EditOutlined />} onClick={handleEdit}>
          {t('pages.department.edit')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.department.editModal.title')}
        open={isOpen}
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{
          padding: '12px',
          marginTop: '12px',
          borderTop: '2px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Form name="editDepartment" form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Form.Item label="id" name="id" hidden={true} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.department.parentDept')}
            name="parentId"
            hidden={data && data.length === 1 ? data[0].parentId === 0 : false}
            rules={[{ required: true }]}
          >
            <TreeSelect
              treeData={getDeptTree(optionsData?.departments)}
              allowClear
              placeholder={t('pages.department.select.placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('pages.department.code')} name="code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('pages.department.name')} name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={t('pages.department.leader')}
            name="leader"
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getUserSelectOptions(optionsData?.users)}
              placeholder={t('pages.department.select.placeholder')}
            />
          </Form.Item>
          <Form.Item
            label={t('pages.department.deptStatus')}
            name="deptStatus"
            rules={[{ required: true }]}
          >
            <Select
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getDictSelectOptions(optionsData?.deptStatus)}
              placeholder={t('pages.department.select.placeholder')}
            />
          </Form.Item>
          <Form.Item label={t('pages.post.role')} name="roles">
            <Select
              mode="multiple"
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getRoleSelectOptions(optionsData?.roles)}
              placeholder={t('pages.post.select.placeholder')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Edit;
