import PageContent from '@/components/PageContent';
import Query from '@/components/Query';
import { getDictionaryList } from '@/services/dictionary';
import { Divider, Input, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Add from './components/Add';
import BatchDelete from './components/BatchDelete';
import Edit from './components/Edit';
import Delete from './components/Delete';
import PageWrapper from '@/components/PageWrapper';

type QueryParams = {
  dictName?: string;
  itemText?: string;
};

export type TableDictionaryInfo = {
  key?: number;
} & API.DictionaryInfo;

const Dictionary: React.FC = () => {
  const { t } = useTranslation();
  const [dictionaryData, setDictionaryData] = useState<API.PageInfo<TableDictionaryInfo[]>>();
  const [selectData, setSelectData] = useState<TableDictionaryInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const dictionaryDataRes = await getDictionaryList();
      if (!dictionaryDataRes.data) {
        return;
      }
      const tablePages: API.PageInfo<TableDictionaryInfo[]> = {
        records: dictionaryDataRes.data.records.map((item) => ({ key: item.id, ...item })),
        total: dictionaryDataRes.data.total,
        size: dictionaryDataRes.data.size,
        current: dictionaryDataRes.data.current,
        pages: dictionaryDataRes.data.pages
      };
      setDictionaryData(tablePages);
      setLoading(false);
    })();
  }, []);

  const tableColumns: ColumnsType<TableDictionaryInfo> = [
    {
      title: t('pages.dictionary.dictName'),
      dataIndex: 'dictName',
      align: 'center'
    },
    {
      title: t('pages.dictionary.dictText'),
      dataIndex: 'dictText',
      align: 'center'
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
          <Space split={<Divider type="vertical" style={{ margin: '0 1px' }} />}>
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

  return (
    <PageWrapper>
      <Query queryFields={queryFields} onQuery={handleQuery} onReset={handleReset} />
      <PageContent>
        <Space style={{ width: '100%', marginBottom: '10px' }}>
          <Add setDictionaryData={setDictionaryData} />
          <BatchDelete selectData={selectData} setDictionaryData={setDictionaryData} />
        </Space>
        <Table
          bordered
          columns={tableColumns}
          dataSource={dictionaryData?.records}
          loading={loading}
          size="small"
          rowSelection={{
            type: 'checkbox',
            onChange: (_selectedRowKeys, selectedRows) => {
              setSelectData(selectedRows);
            }
          }}
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
