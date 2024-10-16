"use client";

import TablePro from "@/components/table-pro";
import { departmentStatusTagColor } from "@/config/tag";
import { getDepartmentList, getDepartmentOptions } from "@/services/department";
import { App, Input, Table, Tag, type FormItemProps } from "antd";
import type { ColumnsType, Key } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import Add from "@/components/system/department/add";
import Edit from "@/components/system/department/edit";
import View from "@/components/system/department/view";
import Delete from "@/components/system/department/delete";
import { useTranslations } from "next-intl";
import { useRequest } from "ahooks";

const getExpandKeys = (data?: API.DepartmentDetailTree[]) => {
  const expandList: number[] = [];
  if (!data) {
    return [];
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].children && data[i].children?.length !== 0) {
      expandList.push(data[i].id);
      expandList.push(...getExpandKeys(data[i].children));
    }
  }
  return expandList;
};

export default function Page() {
  const t = useTranslations();
  const [deptData, setDeptData] = useState<API.DepartmentDetailTree[]>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [expands, setExpands] = useState<number[]>([]);
  const { message } = App.useApp();

  const getData = async () => {
    const deptRes = await getDepartmentList();
    const optionsRes = await getDepartmentOptions();
    if (deptRes.code !== 0) {
      message.error(`${deptRes.code} | ${deptRes.message}`);
    }
    if (optionsRes.code !== 0) {
      message.error(`${optionsRes.data} | ${optionsRes.message}`);
    }
    setDeptData(deptRes.data);
    return { deptData: deptRes.data, optionsData: optionsRes.data };
  };
  const { data, loading } = useRequest(getData);

  const queryItems: FormItemProps[] = [
    {
      label: t("app.departmentPage.query.code.title"),
      name: "code",
      children: (
        <Input placeholder={t("app.departmentPage.query.code.placeholder")} />
      ),
    },
    {
      label: t("app.departmentPage.query.name.title"),
      name: "name",
      children: (
        <Input placeholder={t("app.departmentPage.query.name.placeholder")} />
      ),
    },
  ];

  const queryData = async (params?: API.DepartmentQuery) => {
    const res = await getDepartmentList(params);
    if (res.code !== 0 || !res.data) {
      return;
    }
    setDeptData(res.data);
  };

  const handleQuery = (values: API.DepartmentQuery) => {
    // 获取查询数据
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[], data?: API.DepartmentDetailTree[]) => {
    const selectDatas: API.DepartmentDetailTree[] = [];
    if (!data) {
      return [];
    }
    for (let i = 0; i < data.length; i++) {
      if (keys.indexOf(data[i].id) >= 0) {
        selectDatas.push(data[i]);
      }
      if (data[i].children && data[i].children?.length !== 0) {
        selectDatas.push(...getSelectData(keys, data[i].children));
      }
    }
    return selectDatas;
  };

  const tableColumns: ColumnsType<API.DepartmentDetailTree> = [
    {
      title: t("app.departmentPage.table.name"),
      dataIndex: "name",
      align: "center",
    },
    {
      title: t("app.departmentPage.table.code"),
      dataIndex: "code",
      align: "center",
    },
    {
      title: t("app.departmentPage.table.leader"),
      dataIndex: "leader",
      align: "center",
      render: (_text, record) => record.leader.name,
    },
    {
      title: t("app.departmentPage.table.deptStatus"),
      dataIndex: "deptStatus",
      align: "center",
      render: (_text, record) => {
        const status = record.deptStatus.dictLabel;
        const tagColor = departmentStatusTagColor.filter(
          (item) => record.deptStatus.dictValue === item.value
        )[0].color;
        return <Tag color={tagColor}>{status}</Tag>;
      },
    },
    {
      title: t("app.departmentPage.table.role"),
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
      title: t("app.departmentPage.table.createUser"),
      dataIndex: "createUser",
      align: "center",
      render: (_text, record) => record.createUser.name,
    },
    {
      title: t("app.departmentPage.table.updateUser"),
      dataIndex: "updateUser",
      align: "center",
      render: (_text, record) => record.updateUser.name,
    },
    {
      title: t("app.departmentPage.table.createTime"),
      dataIndex: "createTime",
      align: "center",
    },
    {
      title: t("app.departmentPage.table.updateTime"),
      dataIndex: "updateTime",
      align: "center",
    },
  ];

  const actions: React.ReactNode[] = [
    <Add key="add" optionsData={data?.optionsData} queryData={queryData} />,
    <Edit
      key="edit"
      data={getSelectData(selectKeys, deptData)}
      optionsData={data?.optionsData}
      queryData={queryData}
    />,
    <View key="view" data={getSelectData(selectKeys, deptData)} />,
    <Delete
      key="delete"
      data={getSelectData(selectKeys, deptData)}
      queryData={queryData}
    />,
  ];

  useEffect(() => {
    setExpands(getExpandKeys(deptData));
    setSelectKeys([]);
  }, [deptData]);

  return (
    <div className="h-full">
      <TablePro
        formItemProps={queryItems}
        formProps={{
          name: "deptQuery",
          onFinish: handleQuery,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        }}
        actions={actions}
        tableProps={{
          bordered: true,
          columns: tableColumns,
          dataSource: deptData,
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
            showSizeChanger: true,
            showTotal: (total, range) =>
              t("app.tableFooter", {
                start: range[0],
                end: range[1],
                total: total,
              }),
          },
          expandable: {
            expandedRowKeys: expands,
            onExpand: (_expanded, record) => {
              if (expands.indexOf(record.id) >= 0) {
                setExpands(expands.filter((item) => item !== record.id));
              } else {
                setExpands([...expands, record.id]);
              }
            },
          },
        }}
        onReset={handleReset}
      />
    </div>
  );
}
