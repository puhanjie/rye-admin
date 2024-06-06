"use client";

import TablePro from "@/components/table-pro";
import { Button, Input, type FormItemProps } from "antd";

export default function Page() {
  const items: FormItemProps[] = [
    {
      label: "用户名",
      name: "username",
      children: <Input placeholder="请输入用户名" />,
    },
    {
      label: "姓名",
      name: "name",
      children: <Input placeholder="请输入姓名" />,
    },
    {
      label: "手机",
      name: "phone",
      children: <Input placeholder="请输入手机" />,
    },
    {
      label: "邮箱",
      name: "email",
      children: <Input placeholder="请输入邮箱" />,
    },
  ];

  const actions: React.ReactNode[] = [<Button type="primary">新增</Button>];

  return (
    <div className="h-full">
      <TablePro
        formProps={{
          name: "query",
          layout: "horizontal",
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        }}
        formItemProps={items}
        actions={actions}
      />
    </div>
  );
}
