"use client";

import TablePro from "@/components/table-pro";
import { getDictionaryList } from "@/services/dictionary";
import { App, Input, Table, type FormItemProps } from "antd";
import type { ColumnsType, Key } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import Add from "@/components/system/dictionary/add";
import Edit from "@/components/system/dictionary/edit";
import View from "@/components/system/dictionary/view";
import Delete from "@/components/system/dictionary/delete";
import { useTranslations } from "next-intl";
import { useRequest } from "ahooks";

export default function Page() {
  const t = useTranslations();
  const [dictionaryData, setDictionaryData] =
    useState<API.Page<API.DictionaryInfo[]>>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const { message } = App.useApp();

  const getData = async () => {
    const dictionaryRes = await getDictionaryList();
    if (dictionaryRes.code !== 0) {
      message.error(`${dictionaryRes.code} | ${dictionaryRes.message}`);
    }
    setDictionaryData(dictionaryRes.data);
    return dictionaryRes.data;
  };
  const { loading } = useRequest(getData);

  const queryItems: FormItemProps[] = [
    {
      label: t("app.dictionaryPage.query.dictType.title"),
      name: "dictType",
      children: (
        <Input
          placeholder={t("app.dictionaryPage.query.dictType.placeholder")}
        />
      ),
    },
    {
      label: t("app.dictionaryPage.query.dictLabel.title"),
      name: "dictLabel",
      children: (
        <Input
          placeholder={t("app.dictionaryPage.query.dictLabel.placeholder")}
        />
      ),
    },
  ];

  const queryData = async (params?: API.DictionaryQuery) => {
    const res = await getDictionaryList(params);
    if (res.code !== 0 || !res.data) {
      return;
    }
    setDictionaryData(res.data);
  };

  const handleQuery = (values: API.DictionaryQuery) => {
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

  /**
   * 获取记录的column列的行占位数
   * @param record 表格单条记录数据
   * @param column 需要合并的行所在的列属性名
   * @returns
   */
  const getRowSpan = (record: API.DictionaryInfo, column: string) => {
    const data = dictionaryData?.records.filter(
      (item) =>
        item[column as keyof typeof item] ===
        record[column as keyof typeof item]
    );
    if (!data || data.length === 0) {
      return;
    }
    const indexs = data.map((_item, index) => index);
    const minIndex = Math.min(...indexs);
    return record.id === data[minIndex].id ? data.length : 0;
  };

  const tableColumns: ColumnsType<API.DictionaryInfo> = [
    {
      title: t("app.dictionaryPage.table.dictType"),
      dataIndex: "dictType",
      align: "center",
      onCell: (record) => {
        return {
          rowSpan: getRowSpan(record, "dictType"),
        };
      },
    },
    {
      title: t("app.dictionaryPage.table.dictName"),
      dataIndex: "dictName",
      align: "center",
      onCell: (record) => {
        return {
          rowSpan: getRowSpan(record, "dictName"),
        };
      },
    },
    {
      title: t("app.dictionaryPage.table.dictValue"),
      dataIndex: "dictValue",
      align: "center",
    },
    {
      title: t("app.dictionaryPage.table.dictLabel"),
      dataIndex: "dictLabel",
      align: "center",
    },
    {
      title: t("app.dictionaryPage.table.description"),
      dataIndex: "description",
      align: "center",
    },
    {
      title: t("app.dictionaryPage.table.createUser"),
      dataIndex: "createUser",
      align: "center",
      render: (_text, record) => record.createUser.name,
    },
    {
      title: t("app.dictionaryPage.table.updateUser"),
      dataIndex: "updateUser",
      align: "center",
      render: (_text, record) => record.updateUser.name,
    },
    {
      title: t("app.dictionaryPage.table.createTime"),
      dataIndex: "createTime",
      align: "center",
    },
    {
      title: t("app.dictionaryPage.table.updateTime"),
      dataIndex: "updateTime",
      align: "center",
    },
  ];

  const actions: React.ReactNode[] = [
    <Add key="add" queryData={queryData} />,
    <Edit key="edit" data={getSelectData(selectKeys)} queryData={queryData} />,
    <View key="view" data={getSelectData(selectKeys)} />,
    <Delete
      key="delete"
      data={getSelectData(selectKeys)}
      queryData={queryData}
    />,
  ];

  useEffect(() => {
    setSelectKeys([]);
  }, [dictionaryData]);

  return (
    <div className="h-full">
      <TablePro
        formItemProps={queryItems}
        formProps={{
          name: "dictionaryQuery",
          onFinish: handleQuery,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        }}
        actions={actions}
        tableProps={{
          bordered: true,
          columns: tableColumns,
          dataSource: dictionaryData?.records,
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
            current: dictionaryData?.current,
            defaultPageSize: 10,
            total: dictionaryData?.total,
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
