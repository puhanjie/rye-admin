import TablePro from "@/components/table-pro";
import { roleStatusTagColor } from "@/config/statusTag";
import { getRoleList, getRoleOptions } from "@/services/role";
import { Input, Table, Tag, type FormItemProps } from "antd";
import type { ColumnsType, Key } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Add from "./components/add";
import Edit from "./components/edit";
import View from "./components/view";
import Delete from "./components/delete";

export default function Role() {
  const { t } = useTranslation();
  const [roleData, setRoleData] = useState<API.Page<API.RoleInfo[]>>();
  const [optionsData, setOptionsData] = useState<API.RoleOptions>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);

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
    if (!res.data) {
      return;
    }
    setRoleData(res.data);
  };

  const handleQuery = (values: API.RoleQuery) => {
    queryData(values);
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
    <Add optionsData={optionsData} queryData={queryData} />,
    <Edit
      data={getSelectData(selectKeys)}
      optionsData={optionsData}
      queryData={queryData}
    />,
    <View data={getSelectData(selectKeys)} optionsData={optionsData} />,
    <Delete data={getSelectData(selectKeys)} queryData={queryData} />,
  ];

  useEffect(() => {
    (async () => {
      const roleRes = await getRoleList();
      const optionsRes = await getRoleOptions();
      if (!roleRes.data || !optionsRes.data) {
        return;
      }
      setRoleData(roleRes.data);
      setOptionsData(optionsRes.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setSelectKeys([]);
  }, [roleData]);

  return (
    <div className="h-full">
      <TablePro
        formItemProps={queryItems}
        formProps={{
          name: "roleQuery",
          onFinish: handleQuery,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
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
            defaultPageSize: 10,
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
