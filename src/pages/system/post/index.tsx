import TablePro from "@/components/table-pro";
import { postStatusTagColor } from "@/config/statusTag";
import { getPostList, getPostOptions } from "@/services/post";
import { Input, Table, Tag, type FormItemProps } from "antd";
import type { ColumnsType, Key } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Add from "./components/add";
import Edit from "./components/edit";
import View from "./components/view";
import Delete from "./components/delete";

export default function Post() {
  const { t } = useTranslation();
  const [postData, setPostData] = useState<API.Page<API.PostInfo[]>>();
  const [optionsData, setOptionsData] = useState<API.PostOptions>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);

  const queryItems: FormItemProps[] = [
    {
      label: t("app.postPage.query.code.title"),
      name: "code",
      children: (
        <Input placeholder={t("app.postPage.query.code.placeholder")} />
      ),
    },
    {
      label: t("app.postPage.query.name.title"),
      name: "name",
      children: (
        <Input placeholder={t("app.postPage.query.name.placeholder")} />
      ),
    },
  ];

  const queryData = async (params?: API.PostQuery) => {
    const res = await getPostList(params);
    if (!res.data) {
      return;
    }
    setPostData(res.data);
  };

  const handleQuery = (values: API.PostQuery) => {
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[]) => {
    return postData?.records
      ? postData.records.filter((item) => keys.indexOf(item.id) >= 0)
      : [];
  };

  const tableColumns: ColumnsType<API.PostInfo> = [
    {
      title: t("app.postPage.table.code"),
      dataIndex: "code",
      align: "center",
    },
    {
      title: t("app.postPage.table.name"),
      dataIndex: "name",
      align: "center",
    },
    {
      title: t("app.postPage.table.postStatus"),
      dataIndex: "postStatus",
      align: "center",
      render: (_text, record) => {
        const status = record.postStatus.dictLabel;
        const tagColor = postStatusTagColor.filter(
          (item) => record.postStatus.dictValue === item.value
        )[0].color;
        return <Tag color={tagColor}>{status}</Tag>;
      },
    },
    {
      title: t("app.postPage.table.role"),
      dataIndex: "roles",
      align: "center",
      render: (_text, record) => {
        if (!record.roles) {
          return null;
        }
        return record.roles.map((item, index) => (
          <Tag key={index}>{item.name}</Tag>
        ));
      },
    },
    {
      title: t("app.postPage.table.remark"),
      dataIndex: "remark",
      align: "center",
    },
    {
      title: t("app.postPage.table.createUser"),
      dataIndex: "createUser",
      align: "center",
      render: (_text, record) => record.createUser.name,
    },
    {
      title: t("app.postPage.table.updateUser"),
      dataIndex: "updateUser",
      align: "center",
      render: (_text, record) => record.updateUser.name,
    },
    {
      title: t("app.postPage.table.createTime"),
      dataIndex: "createTime",
      align: "center",
    },
    {
      title: t("app.postPage.table.updateTime"),
      dataIndex: "updateTime",
      align: "center",
    },
  ];

  const actions: React.ReactNode[] = [
    <Add optionsData={optionsData} queryData={queryData} />,
    <Edit
      data={getSelectData(selectKeys)}
      optionsData={optionsData}
      queryData={queryData}
    />,
    <View data={getSelectData(selectKeys)} />,
    <Delete data={getSelectData(selectKeys)} queryData={queryData} />,
  ];

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

  useEffect(() => {
    setSelectKeys([]);
  }, [postData]);

  return (
    <div className="h-full">
      <TablePro
        formItemProps={queryItems}
        formProps={{
          name: "postQuery",
          onFinish: handleQuery,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        }}
        actions={actions}
        tableProps={{
          bordered: true,
          columns: tableColumns,
          dataSource: postData?.records,
          loading: loading,
          size: "small",
          rowSelection: {
            type: "checkbox",
            selections: [
              Table.SELECTION_ALL,
              Table.SELECTION_INVERT,
              Table.SELECTION_NONE,
            ],
            selectedRowKeys: selectKeys,
            onChange: (selectedRowKeys) => {
              setSelectKeys(selectedRowKeys);
            },
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
            },
          }),
          rowKey: (record) => record.id, // 设置每条记录的id为rowKey
          scroll: { x: "max-content" },
          pagination: {
            current: postData?.current,
            defaultPageSize: 10,
            total: postData?.total,
            showSizeChanger: true,
            showTotal: (total, range) =>
              t("app.tableFooter", {
                start: range[0],
                end: range[1],
                total: total,
              }),
            onChange: (page, pageSize) => {
              queryData({ pageNum: page, pageSize: pageSize });
            },
          },
        }}
        onReset={handleReset}
      />
    </div>
  );
}
