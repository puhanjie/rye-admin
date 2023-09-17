import { type FormItemProps, Input, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Add from './components/Add';
import Delete from './components/Delete';
import Edit from './components/Edit';
import type { Key } from 'antd/es/table/interface';
import { postStatusTagColor } from '@/config/statusTagConfig';
import PageWrapper from '@/components/PageWrapper';
import View from './components/View';
import styles from './index.module.less';
import TablePro from '@/components/TablePro';
import { getPostList, getPostOptions } from '@/services/post';

const Post: React.FC = () => {
  const { t } = useTranslation();
  const [postData, setPostData] = useState<API.Page<API.PostInfo[]>>();
  const [optionsData, setOptionsData] = useState<API.PostOptions>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const postRes = await getPostList();
      const optionsRes = await getPostOptions();
      if (!postRes.data || !optionsRes.data) {
        return;
      }
      setPostData(postRes.data);
      setOptionsData(optionsRes.data);
      setLoading(false);
    })();
  }, []);

  const tableColumns: ColumnsType<API.PostInfo> = [
    {
      title: t('pages.post.code'),
      dataIndex: 'code',
      align: 'center'
    },
    {
      title: t('pages.post.name'),
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: t('pages.post.postStatus'),
      dataIndex: 'postStatus',
      align: 'center',
      render: (_text, record) => {
        const status = record.postStatus.dictLabel;
        const tagColor = postStatusTagColor.filter(
          (item) => record.postStatus.dictValue === item.value
        )[0].color;
        return <Tag color={tagColor}>{status}</Tag>;
      }
    },
    {
      title: t('pages.post.role'),
      dataIndex: 'roles',
      align: 'center',
      render: (_text, record) => {
        if (!record.roles) {
          return null;
        }
        return record.roles.map((item, index) => <Tag key={index}>{item.name}</Tag>);
      }
    },
    {
      title: t('pages.post.remark'),
      dataIndex: 'remark',
      align: 'center'
    },
    {
      title: t('pages.post.createUser'),
      dataIndex: 'createUser',
      align: 'center',
      render: (_text, record) => record.createUser.name
    },
    {
      title: t('pages.post.updateUser'),
      dataIndex: 'updateUser',
      align: 'center',
      render: (_text, record) => record.updateUser.name
    },
    {
      title: t('pages.post.createTime'),
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: t('pages.post.updateTime'),
      dataIndex: 'updateTime',
      align: 'center'
    }
  ];

  const queryItems: FormItemProps[] = [
    {
      label: t('pages.post.queryForm.code'),
      name: 'code',
      children: <Input placeholder={t('pages.post.queryForm.code.placeholder')} />
    },
    {
      label: t('pages.post.queryForm.name'),
      name: 'name',
      children: <Input placeholder={t('pages.post.queryForm.name.placeholder')} />
    }
  ];

  const queryData = async (params?: API.PostQuery) => {
    const res = await getPostList(params);
    if (!res.data) {
      return;
    }
    setPostData(res.data);
  };

  const handleQuery = (values: API.PostQuery) => {
    // 获取查询数据
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[]) => {
    return postData?.records ? postData.records.filter((item) => keys.indexOf(item.id) >= 0) : [];
  };

  const actions: React.ReactNode[] = [
    <Add optionsData={optionsData} setPostData={setPostData} />,
    <Edit data={getSelectData(selectKeys)} optionsData={optionsData} setPostData={setPostData} />,
    <View data={getSelectData(selectKeys)} />,
    <Delete data={getSelectData(selectKeys)} setPostData={setPostData} />
  ];

  return (
    <PageWrapper className={styles['container']}>
      <TablePro
        queryItems={queryItems}
        queryForm={{
          name: 'postQuery',
          layout: 'inline',
          onFinish: handleQuery,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 }
        }}
        actions={actions}
        queryTable={{
          bordered: true,
          columns: tableColumns,
          dataSource: postData?.records,
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
            current: postData?.current,
            defaultPageSize: 10,
            total: postData?.total,
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

export default Post;
