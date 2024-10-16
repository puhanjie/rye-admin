"use client";

import TablePro from "@/components/table-pro";
import { getLogList } from "@/services/log";
import { App, Input, Table, type FormItemProps } from "antd";
import type { ColumnsType, Key } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import View from "@/components/system/log/view";
import Delete from "@/components/system/log/delete";
import Empty from "@/components/system/log/empty";
import { useTranslations } from "next-intl";
import { useRequest } from "ahooks";

export default function Page() {
  const t = useTranslations();
  const [logData, setLogData] = useState<API.Page<API.LogInfo[]>>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const { message } = App.useApp();

  const getData = async () => {
    const logRes = await getLogList();
    if (logRes.code !== 0) {
      message.error(`${logRes.code} | ${logRes.message}`);
    }
    setLogData(logRes.data);
    return logRes.data;
  };
  const { loading } = useRequest(getData);

  const queryItems: FormItemProps[] = [
    {
      label: t("app.logPage.query.message.title"),
      name: "message",
      children: (
        <Input placeholder={t("app.logPage.query.message.placeholder")} />
      ),
    },
    {
      label: t("app.logPage.query.operateUser.title"),
      name: "operateUser",
      children: (
        <Input placeholder={t("app.logPage.query.operateUser.placeholder")} />
      ),
    },
  ];

  const queryData = async (params?: API.LogQuery) => {
    const res = await getLogList(params);
    if (res.code !== 0 || !res.data) {
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
    return logData?.records
      ? logData.records.filter((item) => keys.indexOf(item.id) >= 0)
      : [];
  };

  const tableColumns: ColumnsType<API.LogInfo> = [
    {
      title: t("app.logPage.table.url"),
      dataIndex: "url",
      align: "center",
    },
    {
      title: t("app.logPage.table.code"),
      dataIndex: "code",
      align: "center",
    },
    {
      title: t("app.logPage.table.message"),
      dataIndex: "message",
      align: "center",
    },
    {
      title: t("app.logPage.table.operateUser"),
      dataIndex: "operateUser",
      align: "center",
      render: (_text, record) => record.operateUser.name,
    },
    {
      title: t("app.logPage.table.operateTime"),
      dataIndex: "operateTime",
      align: "center",
    },
  ];

  const actions: React.ReactNode[] = [
    <View key="view" data={getSelectData(selectKeys)} />,
    <Delete
      key="delete"
      data={getSelectData(selectKeys)}
      queryData={queryData}
    />,
    <Empty key="empty" queryData={queryData} />,
  ];

  useEffect(() => {
    setSelectKeys([]);
  }, [logData]);

  return (
    <div className="h-full">
      <TablePro
        formItemProps={queryItems}
        formProps={{
          name: "logQuery",
          onFinish: handleQuery,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        }}
        actions={actions}
        tableProps={{
          bordered: true,
          columns: tableColumns,
          dataSource: logData?.records,
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
            current: logData?.current,
            defaultPageSize: 10,
            total: logData?.total,
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
