import TablePro from "@/components/table-pro";
import { permissionStatusTagColor } from "@/config/statusTag";
import { useRouter } from "@/hooks/useRouter";
import { getPermissionList, getPermissionOptions } from "@/services/permission";
import { getMenuTree } from "@/utils/options";
import { Input, Table, Tag, TreeSelect, type FormItemProps } from "antd";
import type { ColumnsType, Key } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Add from "./components/add";
import Edit from "./components/edit";
import View from "./components/view";
import Delete from "./components/delete";

export default function Permission() {
  const { t } = useTranslation();
  const [permissionData, setPermissionData] =
    useState<API.Page<API.PermissionInfo[]>>();
  const [optionsData, setOptionsData] = useState<API.PermissionOptions>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);
  const { authRoute } = useRouter();

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
          treeData={getMenuTree(authRoute)}
          allowClear
          showCheckedStrategy="SHOW_CHILD"
          placeholder={t("app.permissionPage.query.menu.placeholder")}
        />
      ),
    },
  ];

  const queryData = async (params?: API.PermissionQuery) => {
    const res = await getPermissionList(params);
    if (!res.data) {
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
      const permissionRes = await getPermissionList();
      const optionsRes = await getPermissionOptions();
      if (!permissionRes.data || !optionsRes.data) {
        return;
      }
      setPermissionData(permissionRes.data);
      setOptionsData(optionsRes.data);
      setLoading(false);
    })();
  }, []);

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
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
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
