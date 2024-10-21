"use client";

import TablePro from "@/components/table-pro";
import { permissionStatusTagColor } from "@/config/tag";
import { getPermissionList, getPermissionOptions } from "@/services/permission";
import { getMenuTree } from "@/utils/options";
import { App, Input, Table, Tag, TreeSelect, type FormItemProps } from "antd";
import type { ColumnsType, Key } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import Add from "@/components/system/permission/add";
import Edit from "@/components/system/permission/edit";
import View from "@/components/system/permission/view";
import Delete from "@/components/system/permission/delete";
import { useTranslations } from "next-intl";
import route from "@/config/route";
import { useRequest } from "ahooks";

export default function Page() {
  const t = useTranslations();
  const [permissionData, setPermissionData] =
    useState<API.Page<API.PermissionInfo[]>>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const { message } = App.useApp();

  const getData = async () => {
    const permissionRes = await getPermissionList();
    const optionsRes = await getPermissionOptions();
    if (permissionRes.code !== 0) {
      message.error(`${permissionRes.code} | ${permissionRes.message}`);
    }
    if (optionsRes.code !== 0) {
      message.error(`${optionsRes.code} | ${optionsRes.message}`);
    }
    setPermissionData(permissionRes.data);
    return { permissionData: permissionRes.data, optionsData: optionsRes.data };
  };
  const { data, loading } = useRequest(getData);

  const queryItems: FormItemProps[] = [
    {
      label: t("app.permissionPage.query.code.title"),
      name: "code",
      children: (
        <Input placeholder={t("app.permissionPage.query.code.placeholder")} />
      ),
    },
    {
      label: t("app.permissionPage.query.name.title"),
      name: "name",
      children: (
        <Input placeholder={t("app.permissionPage.query.name.placeholder")} />
      ),
    },
    {
      label: t("app.permissionPage.query.menu.title"),
      name: "menu",
      children: (
        <TreeSelect
          treeData={getMenuTree(t, route)}
          allowClear
          showCheckedStrategy="SHOW_CHILD"
          placeholder={t("app.permissionPage.query.menu.placeholder")}
        />
      ),
    },
  ];

  const queryData = async (params?: API.PermissionQuery) => {
    const res = await getPermissionList(params);
    if (res.code !== 0 || !res.data) {
      return;
    }
    setPermissionData(res.data);
  };

  const handleQuery = (values: API.PermissionQuery) => {
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[]) => {
    return permissionData?.records
      ? permissionData.records.filter((item) => keys.indexOf(item.id) >= 0)
      : [];
  };

  const tableColumns: ColumnsType<API.PermissionInfo> = [
    {
      title: t("app.permissionPage.table.code"),
      dataIndex: "code",
      align: "center",
    },
    {
      title: t("app.permissionPage.table.name"),
      dataIndex: "name",
      align: "center",
    },
    {
      title: t("app.permissionPage.table.permissionStatus"),
      dataIndex: "permissionStatus",
      align: "center",
      render: (_text, record) => {
        const status = record.permissionStatus.dictLabel;
        const tagColor = permissionStatusTagColor.filter(
          (item) => record.permissionStatus.dictValue === item.value
        )[0].color;
        return <Tag color={tagColor}>{status}</Tag>;
      },
    },
    {
      title: t("app.permissionPage.table.menu"),
      dataIndex: "menu",
      align: "center",
      render: (_text, record) => t(`app.layout.menu.${record.menu}`),
    },
    {
      title: t("app.permissionPage.table.createUser"),
      dataIndex: "createUser",
      align: "center",
      render: (_text, record) => record.createUser.name,
    },
    {
      title: t("app.permissionPage.table.updateUser"),
      dataIndex: "updateUser",
      align: "center",
      render: (_text, record) => record.updateUser.name,
    },
    {
      title: t("app.permissionPage.table.createTime"),
      dataIndex: "createTime",
      align: "center",
    },
    {
      title: t("app.permissionPage.table.updateTime"),
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
  }, [permissionData]);

  return (
    <div className="h-full">
      <TablePro
        formItemProps={queryItems}
        formProps={{
          name: "permissionQuery",
          onFinish: handleQuery,
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
        }}
        actions={actions}
        tableProps={{
          bordered: true,
          columns: tableColumns,
          dataSource: permissionData?.records,
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
            current: permissionData?.current,
            defaultPageSize: 10,
            total: permissionData?.total,
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
