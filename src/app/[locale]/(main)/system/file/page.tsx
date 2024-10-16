"use client";

import TablePro from "@/components/table-pro";
import { getFileList } from "@/services/file";
import { App, Input, Space, Table, Tooltip, type FormItemProps } from "antd";
import type { ColumnsType, Key } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import Download from "@/components/system/file/download";
import Delete from "@/components/system/file/delete";
import Upload from "@/components/system/file/upload";
import View from "@/components/system/file/view";
import { useTranslations } from "next-intl";
import { useRequest } from "ahooks";

export default function Page() {
  const t = useTranslations();
  const [fileData, setFileData] = useState<API.Page<API.FileInfo[]>>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const { message } = App.useApp();

  const getData = async () => {
    const fileRes = await getFileList();
    if (fileRes.code !== 0) {
      message.error(`${fileRes.code} | ${fileRes.message}`);
    }
    setFileData(fileRes.data);
    return fileRes.data;
  };
  const { loading } = useRequest(getData);

  const queryItems: FormItemProps[] = [
    {
      label: t("app.filePage.query.name.title"),
      name: "name",
      children: (
        <Input placeholder={t("app.filePage.query.name.placeholder")} />
      ),
    },
    {
      label: t("app.filePage.query.uploadUser.title"),
      name: "uploadUser",
      children: (
        <Input placeholder={t("app.filePage.query.uploadUser.placeholder")} />
      ),
    },
  ];

  const queryData = async (params?: API.FileQuery) => {
    const res = await getFileList(params);
    if (res.code !== 0 || !res.data) {
      return;
    }
    setFileData(res.data);
  };

  const handleQuery = (values: API.FileQuery) => {
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[]) => {
    return fileData?.records
      ? fileData.records.filter((item) => keys.indexOf(item.id) >= 0)
      : [];
  };

  const tableColumns: ColumnsType<API.FileInfo> = [
    {
      title: t("app.filePage.table.path"),
      dataIndex: "path",
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      render: (value) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
      onCell: () => ({
        style: { maxWidth: 160 },
      }),
    },
    {
      title: t("app.filePage.table.name"),
      dataIndex: "name",
      align: "center",
    },
    {
      title: t("app.filePage.table.fileSize"),
      dataIndex: "fileSize",
      align: "center",
    },
    {
      title: t("app.filePage.table.uuid"),
      dataIndex: "uuid",
      align: "center",
    },
    {
      title: t("app.filePage.table.uploadUser"),
      dataIndex: "uploadUser",
      align: "center",
      render: (_text, record) => record.uploadUser.name,
    },
    {
      title: t("app.filePage.table.uploadTime"),
      dataIndex: "uploadTime",
      align: "center",
    },
    {
      title: t("app.filePage.table.action"),
      dataIndex: "action",
      align: "center",
      fixed: "right",
      render: (_text, record) => {
        return (
          <Space>
            <Download data={record} />
            <Delete data={record} queryData={queryData} />
          </Space>
        );
      },
    },
  ];

  const actions: React.ReactNode[] = [
    <Upload key="upload" queryData={queryData} />,
    <View key="view" data={getSelectData(selectKeys)} />,
  ];

  useEffect(() => {
    setSelectKeys([]);
  }, [fileData]);

  return (
    <div className="h-full">
      <TablePro
        formItemProps={queryItems}
        formProps={{
          name: "fileQuery",
          onFinish: handleQuery,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        }}
        actions={actions}
        tableProps={{
          bordered: true,
          columns: tableColumns,
          dataSource: fileData?.records,
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
            current: fileData?.current,
            defaultPageSize: 10,
            total: fileData?.total,
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
