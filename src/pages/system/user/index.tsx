import TablePro from "@/components/table-pro";
import { userStatusTagColor } from "@/config/statusTag";
import { getUserList, getUserOptions } from "@/services/user";
import { App, Input, Table, Tag, type FormItemProps } from "antd";
import type { ColumnsType, Key } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Add from "./components/add";
import Edit from "./components/edit";
import View from "./components/view";
import ResetPassword from "./components/reset-password";
import Delete from "./components/delete";

export default function User() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<API.Page<API.UserInfo[]>>();
  const [optionsData, setOptionsData] = useState<API.UserOptions>();
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);
  const { message } = App.useApp();

  const queryItems: FormItemProps[] = [
    {
      label: t("app.userPage.query.username.title"),
      name: "username",
      children: (
        <Input placeholder={t("app.userPage.query.username.placeholder")} />
      ),
    },
    {
      label: t("app.userPage.query.name.title"),
      name: "name",
      children: (
        <Input placeholder={t("app.userPage.query.name.placeholder")} />
      ),
    },
    {
      label: t("app.userPage.query.phone.title"),
      name: "phone",
      children: (
        <Input placeholder={t("app.userPage.query.phone.placeholder")} />
      ),
    },
    {
      label: t("app.userPage.query.email.title"),
      name: "email",
      children: (
        <Input placeholder={t("app.userPage.query.username.placeholder")} />
      ),
    },
  ];

  const queryData = async (params?: API.UserQuery) => {
    const res = await getUserList(params);
    if (res.code !== 0 || !res.data) {
      return;
    }
    setUserData(res.data);
  };

  const handleQuery = (values: API.UserQuery) => {
    queryData(values);
  };

  const handleReset = () => {
    queryData();
  };

  const getSelectData = (keys: Key[]) => {
    return userData?.records
      ? userData.records.filter((item) => keys.indexOf(item.id) >= 0)
      : [];
  };

  const clearSelectData = () => {
    setSelectKeys([]);
  };

  const tableColumns: ColumnsType<API.UserInfo> = [
    {
      title: t("app.userPage.table.department"),
      dataIndex: "department",
      align: "center",
      render: (_text, record) => record.department.name,
    },
    {
      title: t("app.userPage.table.username"),
      dataIndex: "username",
      align: "center",
    },
    {
      title: t("app.userPage.table.name"),
      dataIndex: "name",
      align: "center",
    },
    {
      title: t("app.userPage.table.sex"),
      dataIndex: "sex",
      align: "center",
      render: (_text, record) => record.sex.dictLabel,
    },
    {
      title: t("app.userPage.table.userStatus"),
      dataIndex: "userStatus",
      align: "center",
      render: (_text, record) => {
        const status = record.userStatus.dictLabel;
        const tagColor = userStatusTagColor.filter(
          (item) => record.userStatus.dictValue === item.value
        )[0].color;
        return <Tag color={tagColor}>{status}</Tag>;
      },
    },
    {
      title: t("app.userPage.table.post"),
      dataIndex: "posts",
      align: "center",
      render: (_text, record) => {
        if (!record.posts) {
          return null;
        }
        return record.posts.map((item, index) => (
          <Tag key={index}>{item.name}</Tag>
        ));
      },
    },
    {
      title: t("app.userPage.table.role"),
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
      title: t("app.userPage.table.phone"),
      dataIndex: "phone",
      align: "center",
    },
    {
      title: t("app.userPage.table.email"),
      dataIndex: "email",
      align: "center",
    },
    {
      title: t("app.userPage.table.createUser"),
      dataIndex: "createUser",
      align: "center",
      render: (_text, record) => record.createUser.name,
    },
    {
      title: t("app.userPage.table.updateUser"),
      dataIndex: "updateUser",
      align: "center",
      render: (_text, record) => record.updateUser.name,
    },
    {
      title: t("app.userPage.table.createTime"),
      dataIndex: "createTime",
      align: "center",
    },
    {
      title: t("app.userPage.table.updateTime"),
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
    <ResetPassword
      data={getSelectData(selectKeys)}
      clearSelectData={clearSelectData}
    />,
    <Delete data={getSelectData(selectKeys)} queryData={queryData} />,
  ];

  useEffect(() => {
    (async () => {
      const userRes = await getUserList();
      const optionsRes = await getUserOptions();
      if (userRes.code !== 0) {
        message.error(`${userRes.code} | ${userRes.message}`);
      }
      if (optionsRes.code !== 0) {
        message.error(`${optionsRes.code} | ${optionsRes.message}`);
      }
      userRes.data && setUserData(userRes.data);
      optionsRes.data && setOptionsData(optionsRes.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setSelectKeys([]);
  }, [userData]);

  return (
    <div className="h-full">
      <TablePro
        formItemProps={queryItems}
        formProps={{
          name: "userQuery",
          onFinish: handleQuery,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        }}
        tableProps={{
          bordered: true,
          columns: tableColumns,
          dataSource: userData?.records,
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
            current: userData?.current,
            defaultPageSize: 10,
            total: userData?.total,
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
        actions={actions}
        onReset={handleReset}
      />
    </div>
  );
}
