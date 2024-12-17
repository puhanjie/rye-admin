"use client";

import TablePro from "@/components/table-pro";
import { postStatusTagColor } from "@/config/tag";
import { getPostList, getPostOptions } from "@/services/post";
import { App, Input, Table, Tag, type FormItemProps } from "antd";
import type { ColumnsType, Key } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import Add from "@/components/system/post/add";
import Edit from "@/components/system/post/edit";
import View from "@/components/system/post/view";
import Delete from "@/components/system/post/delete";
import { useTranslations } from "next-intl";
import { useRequest } from "ahooks";

export default function Page() {
  const t = useTranslations();
  const [postData, setPostData] = useState<API.Page<API.PostInfo[]>>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const { message } = App.useApp();

  const getData = async () => {
    const postRes = await getPostList();
    const optionsRes = await getPostOptions();
    if (postRes.code !== 0) {
      message.error(`${postRes.code} | ${postRes.message}`);
    }
    if (optionsRes.code !== 0) {
      message.error(`${optionsRes.code} | ${optionsRes.message}`);
    }
    setPostData(postRes.data);
    return { postData: postRes.data, optionsData: optionsRes.data };
  };
  const { data, loading } = useRequest(getData);

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
    if (res.code !== 0 || !res.data) {
      return;
    }
    setPostData(res.data);
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
    <Add key="add" optionsData={data?.optionsData} queryData={queryData} />,
    <Edit
      key="edit"
      data={getSelectData(selectKeys)}
      optionsData={data?.optionsData}
      queryData={queryData}
    />,
    <View key="view" data={getSelectData(selectKeys)} />,
    <Delete
      key="delete"
      data={getSelectData(selectKeys)}
      queryData={queryData}
    />,
  ];

  useEffect(() => {
    setSelectKeys([]);
  }, [postData]);

  return (
    <div className="h-full">
      <TablePro
        formItemProps={queryItems}
        formProps={{
          name: "postQuery",
          onFinish: queryData,
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
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
            pageSize: postData?.size,
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
