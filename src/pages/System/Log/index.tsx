import PageWrapper from '@/components/PageWrapper';
import TablePro from '@/components/TablePro';
import type { ColumnsType, Key } from 'antd/es/table/interface';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.less';
import { getLogList } from '@/services/log';
import { Input, type FormItemProps, Table } from 'antd';
import View from './components/View';
import Delete from './components/Delete';
import Empty from './components/Empty';

const Log: React.FC = () => {
  const { t } = useTranslation();
  const [logData, setLogData] = useState<API.Page<API.LogInfo[]>>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const logRes = await getLogList();
      if (!logRes.data) {
        return;
      }
      setLogData(logRes.data);
      setLoading(false);
    })();
  }, []);

  const tableColumns: ColumnsType<API.LogInfo> = [
    {
      title: t('pages.log.url'),
      dataIndex: 'url',
      align: 'center'
    },
    {
      title: t('pages.log.code'),
      dataIndex: 'code',
      align: 'center'
    },
    {
      title: t('pages.log.message'),
      dataIndex: 'message',
      align: 'center'
    },
    {
      title: t('pages.log.operateUser'),
      dataIndex: 'operateUser',
      align: 'center',
      render: (_text, record) => record.operateUser.name
    },
    {
      title: t('pages.log.operateTime'),
      dataIndex: 'operateTime',
      align: 'center'
    }
  ];

  const queryItems: FormItemProps[] = [
    {
      label: t('pages.log.queryForm.message'),
      name: 'message',
      children: <Input placeholder={t('pages.log.queryForm.message.placeholder')} />
    },
    {
      label: t('pages.log.queryForm.operateUser'),
      name: 'operateUser',
      children: <Input placeholder={t('pages.log.queryForm.operateUser.placeholder')} />
    }
  ];

  const queryData = async (params?: API.LogQuery) => {
    const res = await getLogList(params);
    if (!res.data) {
      return;
    }
    setLogData(res.data);
  };

  const handleQuery = (values: API.LogQuery) => {
    // 获取查询数据
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[]) => {
    return logData?.records ? logData.records.filter((item) => keys.indexOf(item.id) >= 0) : [];
  };

  const actions: React.ReactNode[] = [
    <View data={getSelectData(selectKeys)} />,
    <Delete data={getSelectData(selectKeys)} setLogData={setLogData} />,
    <Empty setLogData={setLogData} />
  ];

  return (
    <PageWrapper className={styles['container']}>
      <TablePro
        queryItems={queryItems}
        queryForm={{
          name: 'logQuery',
          layout: 'inline',
          onFinish: handleQuery,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 }
        }}
        actions={actions}
        queryTable={{
          bordered: true,
          columns: tableColumns,
          dataSource: logData?.records,
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
            current: logData?.current,
            defaultPageSize: 10,
            total: logData?.total,
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

export default Log;
