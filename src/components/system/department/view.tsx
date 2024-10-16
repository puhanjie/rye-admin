"use client";

import { departmentStatusTagColor } from "@/config/tag";
import {
  App,
  Button,
  Descriptions,
  Modal,
  Tag,
  type DescriptionsProps,
} from "antd";
import { useState } from "react";
import AuthWrapper from "@/components/auth-wrapper";
import { EyeOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

export default function View({ data }: { data?: API.DepartmentDetailTree[] }) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const { message } = App.useApp();

  const items: DescriptionsProps["items"] =
    data && data.length === 1
      ? [
          {
            key: "parentDept",
            label: t("app.departmentPage.action.modal.view.item.parentDept"),
            children: data[0].parentDept.name,
          },
          {
            key: "code",
            label: t("app.departmentPage.action.modal.view.item.code"),
            children: data[0].code,
          },
          {
            key: "name",
            label: t("app.departmentPage.action.modal.view.item.name"),
            children: data[0].name,
          },
          {
            key: "leader",
            label: t("app.departmentPage.action.modal.view.item.leader"),
            children: data[0].leader.name,
          },
          {
            key: "deptStatus",
            label: t("app.departmentPage.action.modal.view.item.deptStatus"),
            children: (
              <Tag
                color={
                  departmentStatusTagColor.filter(
                    (item) => data[0].deptStatus.dictValue === item.value
                  )[0].color
                }
              >
                {data[0].deptStatus.dictLabel}
              </Tag>
            ),
          },
          {
            key: "role",
            label: t("app.departmentPage.action.modal.view.item.role"),
            children: data[0].roles?.map((item) => (
              <Tag key={item.id}>{item.name}</Tag>
            )),
          },
        ]
      : [];

  const handleView = () => {
    if (!data || data.length !== 1) {
      message.warning(t("app.departmentPage.action.modal.view.selectOne"));
      return;
    }
    setIsOpen(true);
  };

  return (
    <div>
      <AuthWrapper permission="department:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t("app.departmentPage.action.view")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.departmentPage.action.modal.view.title")}
        open={isOpen}
        centered
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        styles={{
          body: {
            padding: "12px",
            marginTop: "12px",
            borderTop: "2px solid rgba(0, 0, 0, 0.06)",
          },
        }}
      >
        {data && data.length === 1 && (
          <Descriptions
            bordered
            column={1}
            items={
              data[0].parentId === 0
                ? items.filter((item) => item.key !== "parentDept")
                : items
            }
          />
        )}
      </Modal>
    </div>
  );
}
