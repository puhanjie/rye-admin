import PageContent from '@/components/PageContent';
import Query from '@/components/Query';
import { getDictionaryList } from '@/services/dictionary';
import { Input, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Add from './components/Add';
import Delete from './components/Delete';
import Edit from './components/Edit';
import PageWrapper from '@/components/PageWrapper';
import { Key } from 'antd/es/table/interface';
import View from './components/View';

type QueryParams = {
  dictName?: string;
  itemText?: string;
};

const Dictionary: React.FC = () => {
  const { t } = useTranslation();
  const [dictionaryData, setDictionaryData] = useState<API.PageInfo<API.DictionaryInfo[]>>();
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
      title: t('pages.dictionary.dictText'),
      dataIndex: 'dictText',
      align: 'center',
      onCell: (record) => {
        return {
          rowSpan: getRowSpan(record, 'dictText')
        };
      }
    },
    {
      title: t('pages.dictionary.itemValue'),
      dataIndex: 'itemValue',
      align: 'center'
    },
    {
      title: t('pages.dictionary.itemText'),
      dataIndex: 'itemText',
      align: 'center'
    },
    {
      title: t('pages.dictionary.description'),
      dataIndex: 'description',
      align: 'center'
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

  const queryFields: QueryField[] = [
    {
      label: t('pages.dictionary.queryForm.dictName'),
      name: 'dictName',
      render: <Input placeholder={t('pages.dictionary.queryForm.dictName.placeholder')} />
    },
    {
      label: t('pages.dictionary.queryForm.itemText'),
      name: 'itemText',
      render: <Input placeholder={t('pages.dictionary.queryForm.itemText.placeholder')} />
    }
  ];

  const queryData = async (params?: API.DictionaryPageQuery) => {
    const res = await getDictionaryList(params);
    if (!res.data) {
      return;
    }
    setDictionaryData(res.data);
  };

  const handleQuery = (values: QueryParams) => {
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

  return (
    <PageWrapper>
      <Query queryFields={queryFields} onQuery={handleQuery} onReset={handleReset} />
      <PageContent>
        <Space style={{ width: '100%', marginBottom: '10px' }}>
          <Add setDictionaryData={setDictionaryData} />
          <Edit data={getSelectData(selectKeys)} setDictionaryData={setDictionaryData} />
          <View data={getSelectData(selectKeys)} />
          <Delete selectData={getSelectData(selectKeys)} setDictionaryData={setDictionaryData} />
        </Space>
        <Table
          bordered
          columns={tableColumns}
          dataSource={dictionaryData?.records}
          loading={loading}
          size="small"
          rowSelection={{
            type: 'checkbox',
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
            selectedRowKeys: selectKeys,
            onChange: (selectedRowKeys) => {
              setSelectKeys(selectedRowKeys);
            }
          }}
          onRow={(record) => ({
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
          })}
          rowKey={(record) => record.id} // 设置每条记录的id为rowKey
          scroll={{ x: 'max-content' }}
          pagination={{
            defaultPageSize: 10,
            total: dictionaryData?.total,
            showSizeChanger: true,
            showTotal: (total, range) =>
              t('common.table.footer', { start: range[0], end: range[1], total: total }),
            onChange: (page, pageSize) => {
              queryData({ pageNum: page, pageSize: pageSize });
            }
          }}
        />
      </PageContent>
    </PageWrapper>
  );
};

export default Dictionary;
