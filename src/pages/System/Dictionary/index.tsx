import { getDictionaryList } from '@/services/dictionary';
import { type FormItemProps, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Add from './components/Add';
import Delete from './components/Delete';
import Edit from './components/Edit';
import PageWrapper from '@/components/PageWrapper';
import type { Key } from 'antd/es/table/interface';
import View from './components/View';
import styles from './index.module.less';
import TablePro from '@/components/TablePro';

const Dictionary: React.FC = () => {
  const { t } = useTranslation();
  const [dictionaryData, setDictionaryData] = useState<API.Page<API.DictionaryInfo[]>>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const dictionaryRes = await getDictionaryList();
      if (!dictionaryRes.data) {
        return;
      }
      setDictionaryData(dictionaryRes.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setSelectKeys([]);
  }, [dictionaryData]);

  /**
   * 获取记录的column列的行占位数
   * @param record 表格单条记录数据
   * @param column 需要合并的行所在的列属性名
   * @returns
   */
  const getRowSpan = (record: API.DictionaryInfo, column: string) => {
    const data = dictionaryData?.records.filter(
      (item) => item[column as keyof typeof item] === record[column as keyof typeof item]
    );
    const ids = data?.map((item) => item.id);
    if (!ids || ids.length === 0) {
      return 1;
    }
    const minId = Math.min(...ids);
    return record.id === minId ? ids.length : 0;
  };

  const tableColumns: ColumnsType<API.DictionaryInfo> = [
    {
      title: t('pages.dictionary.dictType'),
      dataIndex: 'dictType',
      align: 'center',
      onCell: (record) => {
        return {
          rowSpan: getRowSpan(record, 'dictType')
        };
      }
    },
    {
      title: t('pages.dictionary.dictName'),
      dataIndex: 'dictName',
      align: 'center',
      onCell: (record) => {
        return {
          rowSpan: getRowSpan(record, 'dictName')
        };
      }
    },
    {
      title: t('pages.dictionary.dictValue'),
      dataIndex: 'dictValue',
      align: 'center'
    },
    {
      title: t('pages.dictionary.dictLabel'),
      dataIndex: 'dictLabel',
      align: 'center'
    },
    {
      title: t('pages.dictionary.description'),
      dataIndex: 'description',
      align: 'center'
    },
    {
      title: t('pages.dictionary.createUser'),
      dataIndex: 'createUser',
      align: 'center',
      render: (_text, record) => record.createUser.name
    },
    {
      title: t('pages.dictionary.updateUser'),
      dataIndex: 'updateUser',
      align: 'center',
      render: (_text, record) => record.updateUser.name
    },
    {
      title: t('pages.dictionary.createTime'),
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: t('pages.dictionary.updateTime'),
      dataIndex: 'updateTime',
      align: 'center'
    }
  ];

  const queryItems: FormItemProps[] = [
    {
      label: t('pages.dictionary.queryForm.dictType'),
      name: 'dictType',
      children: <Input placeholder={t('pages.dictionary.queryForm.dictType.placeholder')} />
    },
    {
      label: t('pages.dictionary.queryForm.dictLabel'),
      name: 'dictLabel',
      children: <Input placeholder={t('pages.dictionary.queryForm.dictLabel.placeholder')} />
    }
  ];

  const queryData = async (params?: API.DictionaryQuery) => {
    const res = await getDictionaryList(params);
    if (!res.data) {
      return;
    }
    setDictionaryData(res.data);
  };

  const handleQuery = (values: API.DictionaryQuery) => {
    // 获取查询数据
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[]) => {
    return dictionaryData?.records
      ? dictionaryData.records.filter((item) => keys.indexOf(item.id) >= 0)
      : [];
  };

  const actions: React.ReactNode[] = [
    <Add queryData={queryData} />,
    <Edit data={getSelectData(selectKeys)} queryData={queryData} />,
    <View data={getSelectData(selectKeys)} />,
    <Delete data={getSelectData(selectKeys)} queryData={queryData} />
  ];

  return (
    <PageWrapper className={styles['container']}>
      <TablePro
        queryItems={queryItems}
        queryForm={{
          name: 'dictionaryQuery',
          layout: 'inline',
          onFinish: handleQuery,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 }
        }}
        actions={actions}
        queryTable={{
          bordered: true,
          columns: tableColumns,
          dataSource: dictionaryData?.records,
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
            current: dictionaryData?.current,
            defaultPageSize: 10,
            total: dictionaryData?.total,
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

export default Dictionary;
