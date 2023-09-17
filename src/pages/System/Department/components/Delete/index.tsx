import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '@/components/AuthWrapper';
import { getDepartmentList, removeDepartment } from '@/services/department';

type Props = {
  data: API.DepartmentDetailTree[];
  setDeptData: React.Dispatch<React.SetStateAction<API.DepartmentDetailTree[] | undefined>>;
};

const Delete: React.FC<Props> = ({ data, setDeptData }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    if (data.length <= 0) {
      message.warning(t('common.tip.select'));
      return;
    }
    const ids = data.map((item) => item.id);
    const deleteResult = await removeDepartment(ids);
    if (!deleteResult.data) {
      message.error(t('pages.department.delete.tip.fail'));
      return;
    }
    // 删除成功后重新获取部门列表数据
    const queryResult = await getDepartmentList();
    if (!queryResult.data) {
      return;
    }
    setDeptData(queryResult.data);
    message.success(t('pages.department.delete.tip.success'));
  };

  return (
    <div>
      <AuthWrapper permission="department:delete">
        <Popconfirm
          title={t('common.tip.delete.title')}
          description={t('common.tip.delete.description')}
          onConfirm={handleConfirm}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          <Button danger icon={<DeleteOutlined />}>
            {t('pages.department.delete')}
          </Button>
        </Popconfirm>
      </AuthWrapper>
    </div>
  );
};

export default Delete;
