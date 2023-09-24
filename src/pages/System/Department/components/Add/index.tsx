import {
  getRoleSelectOptions,
  getDictSelectOptions,
  getDeptTree,
  getUserSelectOptions
} from '@/utils/general';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, TreeSelect, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { addDepartment } from '@/services/department';

type Props = {
  optionsData?: API.DepartmentOptions;
  queryData: (params?: API.DepartmentQuery) => void;
};

const Add: React.FC<Props> = ({ optionsData, queryData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    setLoading(true);
    const department: API.DepartmentParams = form.getFieldsValue();
    department.parentId = Number(department.parentId);
    department.deptStatus = department.deptStatus && department.deptStatus[0];
    const addResult = await addDepartment(department);
    if (!addResult.data) {
      message.error(t('pages.department.add.tip.fail'));
      form.resetFields();
      return;
    }
    setLoading(false);
    message.success(t('pages.department.add.tip.success'));
    setIsOpen(false);
    form.resetFields();
    // 新增部门成功后重新获取部门列表数据
    queryData();
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <AuthWrapper permission="department:add">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsOpen(true)}>
          {t('pages.department.add')}
        </Button>
      </AuthWrapper>
      <Modal
        title={t('pages.department.addModal.title')}
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
        <Form name="addDepartment" form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Form.Item
            label={t('pages.department.parentDept')}
            name="parentId"
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
            initialValue={['0']}
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
          <Form.Item label={t('pages.department.role')} name="roles">
            <Select
              mode="multiple"
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={getRoleSelectOptions(optionsData?.roles)}
              placeholder={t('pages.department.select.placeholder')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Add;
