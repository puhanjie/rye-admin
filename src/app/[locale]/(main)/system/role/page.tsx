"use client";

import TablePro from "@/components/table-pro";
import { roleStatusTagColor } from "@/config/tag";
import { getRoleList, getRoleOptions } from "@/services/role";
import { App, Input, Table, Tag, type FormItemProps } from "antd";
import type { ColumnsType, Key } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import Add from "@/components/system/role/add";
import Edit from "@/components/system/role/edit";
import View from "@/components/system/role/view";
import Delete from "@/components/system/role/delete";
import { useTranslations } from "next-intl";
import { useRequest } from "ahooks";

export default function Page() {
  const t = useTranslations();
  const [roleData, setRoleData] = useState<API.Page<API.RoleInfo[]>>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const { message } = App.useApp();

  const getData = async () => {
    const roleRes = await getRoleList();
    const optionsRes = await getRoleOptions();
    if (roleRes.code !== 0) {
      message.error(`${roleRes.code} | ${roleRes.message}`);
    }
    if (optionsRes.code !== 0) {
      message.error(`${optionsRes.code} | ${optionsRes.message}`);
    }
    setRoleData(roleRes.data);
    return { roleData: roleRes.data, optionsData: optionsRes.data };
  };
  const { data, loading } = useRequest(getData);

  const queryItems: FormItemProps[] = [
    {
      label: t("app.rolePage.query.code.title"),
      name: "code",
      children: (
        <Input placeholder={t("app.rolePage.query.code.placeholder")} />
      ),
    },
    {
      label: t("app.rolePage.query.name.title"),
      name: "name",
      children: (
        <Input placeholder={t("app.rolePage.query.name.placeholder")} />
      ),
    },
  ];

  const queryData = async (params?: API.RoleQuery) => {
    const res = await getRoleList(params);
    if (res.code !== 0 || !res.data) {
      return;
    }
    setRoleData(res.data);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[]) => {
    return roleData?.records
      ? roleData.records.filter((item) => keys.indexOf(item.id) >= 0)
      : [];
  };

  const tableColumns: ColumnsType<API.RoleInfo> = [
    {
      title: t("app.rolePage.table.code"),
      dataIndex: "code",
      align: "center",
    },
    {
      title: t("app.rolePage.table.name"),
      dataIndex: "name",
      align: "center",
    },
    {
      title: t("app.rolePage.table.roleStatus"),
      dataIndex: "roleStatus",
      align: "center",
      render: (_text, record) => {
        const status = record.roleStatus.dictLabel;
        const tagColor = roleStatusTagColor.filter(
          (item) => record.roleStatus.dictValue === item.value
        )[0].color;
        return <Tag color={tagColor}>{status}</Tag>;
      },
    },
    {
      title: t("app.rolePage.table.createUser"),
      dataIndex: "createUser",
      align: "center",
      render: (_text, record) => record.createUser.name,
    },
    {
      title: t("app.rolePage.table.updateUser"),
      dataIndex: "updateUser",
      align: "center",
      render: (_text, record) => record.updateUser.name,
    },
    {
      title: t("app.rolePage.table.createTime"),
      dataIndex: "createTime",
      align: "center",
    },
    {
      title: t("app.rolePage.table.updateTime"),
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
    <View
      key="view"
      data={getSelectData(selectKeys)}
      optionsData={data?.optionsData}
    />,
    <Delete
      key="delete"
      data={getSelectData(selectKeys)}
      queryData={queryData}
    />,
  ];

  useEffect(() => {
    setSelectKeys([]);
  }, [roleData]);

  return (
    <div className="h-full">
      <TablePro<API.RoleInfo>
        formItemProps={queryItems}
        formProps={{
          name: "roleQuery",
          onFinish: queryData,
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
        }}
        actions={actions}
        tableProps={{
          bordered: true,
          columns: tableColumns,
          dataSource: roleData?.records,
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
            current: roleData?.current,
            pageSize: roleData?.size,
            total: roleData?.total,
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
