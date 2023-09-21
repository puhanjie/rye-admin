import PageWrapper from '@/components/PageWrapper';
import styles from './index.module.less';
import TablePro from '@/components/TablePro';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getFileList } from '@/services/file';
import type { ColumnsType } from 'antd/es/table';
import type { Key } from 'antd/es/table/interface';
import { Input, type FormItemProps, Table, Space, Tooltip } from 'antd';
import Uploads from './components/Uploads';
import View from './components/View';
import Download from './components/Download';
import Delete from './components/Delete';

const File: React.FC = () => {
  const { t } = useTranslation();
  const [fileData, setFileData] = useState<API.Page<API.FileInfo[]>>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const fileRes = await getFileList();
      if (!fileRes.data) {
        return;
      }
      setFileData(fileRes.data);
      setLoading(false);
    })();
  }, []);

  const tableColumns: ColumnsType<API.FileInfo> = [
    {
      title: t('pages.file.path'),
      dataIndex: 'path',
      align: 'center',
      ellipsis: {
        showTitle: false
      },
      render: (value) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
      onCell: () => ({
        style: { maxWidth: 160 }
      })
    },
    {
      title: t('pages.file.name'),
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: t('pages.file.fileSize'),
      dataIndex: 'fileSize',
      align: 'center'
    },
    {
      title: t('pages.file.uuid'),
      dataIndex: 'uuid',
      align: 'center'
    },
    {
      title: t('pages.file.uploadUser'),
      dataIndex: 'uploadUser',
      align: 'center',
      render: (_text, record) => record.uploadUser.name
    },
    {
      title: t('pages.file.uploadTime'),
      dataIndex: 'uploadTime',
      align: 'center'
    },
    {
      title: t('pages.file.action'),
      dataIndex: 'action',
      align: 'center',
      fixed: 'right',
      render: (_text, record) => {
        return (
          <Space>
            <Download data={record} />
            <Delete data={record} setFileData={setFileData} />
          </Space>
        );
      }
    }
  ];

  const queryItems: FormItemProps[] = [
    {
      label: t('pages.file.queryForm.name'),
      name: 'name',
      children: <Input placeholder={t('pages.file.queryForm.name.placeholder')} />
    },
    {
      label: t('pages.file.queryForm.uploadUser'),
      name: 'uploadUser',
      children: <Input placeholder={t('pages.file.queryForm.uploadUser.placeholder')} />
    }
  ];

  const queryData = async (params?: API.FileQuery) => {
    const res = await getFileList(params);
    if (!res.data) {
      return;
    }
    setFileData(res.data);
  };

  const handleQuery = (values: API.FileQuery) => {
    // 获取查询数据
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[]) => {
    return fileData?.records ? fileData.records.filter((item) => keys.indexOf(item.id) >= 0) : [];
  };

  const actions: React.ReactNode[] = [
    <Uploads setFileData={setFileData} />,
    <View data={getSelectData(selectKeys)} />
  ];

  return (
    <PageWrapper className={styles['container']}>
      <TablePro
        queryItems={queryItems}
        queryForm={{
          name: 'fileQuery',
          layout: 'inline',
          onFinish: handleQuery,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 }
        }}
        actions={actions}
        queryTable={{
          bordered: true,
          columns: tableColumns,
          dataSource: fileData?.records,
          loading: loading,
          size: 'small',
          rowSelection: {
            type: 'checkbox',
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
            selectedRowKeys: selectKeys,
            onChange: (selectedRowKeys) => {
              setSelectKeys(selectedRowKeys);
            }
          },
          onRow: (record) => ({
            onClick: () => {
              if (selectKeys.indexOf(record.id) < 0) {
                // 添加选中数据
                const keys = selectKeys.concat();
                keys.push(record.id);
                setSelectKeys(keys);
              } else {
                // 清除选中数据
                const keys = selectKeys.filter((item) => item !== record.id);
                setSelectKeys(keys);
              }
            }
          }),
          rowKey: (record) => record.id, // 设置每条记录的id为rowKey
          scroll: { x: 'max-content' },
          pagination: {
            current: fileData?.current,
            defaultPageSize: 10,
            total: fileData?.total,
            showSizeChanger: true,
            showTotal: (total, range) =>
              t('common.table.footer', { start: range[0], end: range[1], total: total }),
            onChange: (page, pageSize) => {
              queryData({ pageNum: page, pageSize: pageSize });
            }
          }
        }}
        onReset={handleReset}
      />
    </PageWrapper>
  );
};

export default File;
