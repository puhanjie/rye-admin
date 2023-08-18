import PageContent from '@/components/PageContent';
import Query from '@/components/Query';
import { getDictionaryList } from '@/services/dictionary';
import { Input, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Add from './components/Add';
import BatchDelete from './components/BatchDelete';
import Edit from './components/Edit';
import Delete from './components/Delete';
import PageWrapper from '@/components/PageWrapper';
import { Key } from 'antd/es/table/interface';

type QueryParams = {
  dictName?: string;
  itemText?: string;
};

export type TableDictionaryInfo = {
  key: number;
} & API.DictionaryInfo;

const Dictionary: React.FC = () => {
  const { t } = useTranslation();
  const [dictionaryData, setDictionaryData] = useState<API.PageInfo<TableDictionaryInfo[]>>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const dictionaryDataRes = await getDictionaryList();
      if (!dictionaryDataRes.data) {
        return;
      }
      const dictionaryData: API.PageInfo<TableDictionaryInfo[]> = {
        records: dictionaryDataRes.data.records.map((item) => ({ key: item.id, ...item })),
        total: dictionaryDataRes.data.total,
        size: dictionaryDataRes.data.size,
        current: dictionaryDataRes.data.current,
        pages: dictionaryDataRes.data.pages
      };
      setDictionaryData(dictionaryData);
      setLoading(false);
    })();
  }, []);

  /**
   * 获取记录的column列的行占位数
   * @param record 表格单条记录数据
   * @param column 需要合并的行所在的列属性名
   * @returns
   */
  const getRowSpan = (record: TableDictionaryInfo, column: string) => {
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

  const tableColumns: ColumnsType<TableDictionaryInfo> = [
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
    },
    {
      title: t('pages.dictionary.action'),
      dataIndex: 'action',
      align: 'center',
      fixed: 'right',
      render: (_text, record) => {
        const { id, dictName, dictText, itemValue, itemText, description } = record;
        const data = { id, dictName, dictText, itemValue, itemText, description };
        return (
          <Space>
            <Edit dictionaryData={data} setDictionaryData={setDictionaryData} />
            <Delete selectId={id} setDictionaryData={setDictionaryData} />
          </Space>
        );
      }
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
    if (res.data) {
      const data: API.PageInfo<TableDictionaryInfo[]> = {
        records: res.data.records.map((item) => ({ key: item.id, ...item })),
        total: res.data.total,
        size: res.data.size,
        current: res.data.current,
        pages: res.data.pages
      };
      setDictionaryData(data);
    }
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
      ? dictionaryData.records.filter((item) => keys.indexOf(item.key) >= 0)
      : [];
  };

  return (
    <PageWrapper>
      <Query queryFields={queryFields} onQuery={handleQuery} onReset={handleReset} />
      <PageContent>
        <Space style={{ width: '100%', marginBottom: '10px' }}>
          <Add setDictionaryData={setDictionaryData} />
          <BatchDelete
            selectData={getSelectData(selectKeys)}
            setDictionaryData={setDictionaryData}
          />
        </Space>
        <Table
          bordered
          columns={tableColumns}
          dataSource={dictionaryData?.records}
          loading={loading}
          size="small"
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectKeys,
            onChange: (selectedRowKeys) => {
              setSelectKeys(selectedRowKeys);
            }
          }}
          onRow={(record) => ({
            onClick: () => {
              if (selectKeys.indexOf(record.key) < 0) {
                // 添加选中数据
                const keys = selectKeys.concat();
                keys.push(record.key);
                setSelectKeys(keys);
              } else {
                // 清除选中数据
                const keys = selectKeys.filter((item) => item !== record.key);
                setSelectKeys(keys);
              }
            }
          })}
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
