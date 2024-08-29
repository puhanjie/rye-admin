import { postStatusTagColor } from "@/config/statusTag";
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
import { useTranslation } from "react-i18next";

export default function View({ data }: { data: API.PostInfo[] }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { message } = App.useApp();

  const items: DescriptionsProps["items"] =
    data.length === 1
      ? [
          {
            key: "code",
            label: t("app.postPage.action.modal.edit.item.code"),
            children: data[0].code,
          },
          {
            key: "name",
            label: t("app.postPage.action.modal.edit.item.name"),
            children: data[0].name,
          },
          {
            key: "postStatus",
            label: t("app.postPage.action.modal.edit.item.postStatus"),
            children: (
              <Tag
                color={
                  postStatusTagColor.filter(
                    (item) => data[0].postStatus.dictValue === item.value
                  )[0].color
                }
              >
                {data[0].postStatus.dictLabel}
              </Tag>
            ),
          },
          {
            key: "role",
            label: t("app.postPage.action.modal.edit.item.role"),
            children: data[0].roles?.map((item) => (
              <Tag key={item.id}>{item.name}</Tag>
            )),
          },
          {
            key: "remark",
            label: t("app.postPage.action.modal.edit.item.remark"),
            children: data[0].remark,
          },
        ]
      : [];

  const handleView = () => {
    if (data.length !== 1) {
      message.warning(t("app.postPage.action.modal.edit.selectOne"));
      return;
    }
    setOpen(true);
  };

  return (
    <div>
      <AuthWrapper permission="post:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t("app.postPage.action.view")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.postPage.action.modal.edit.title")}
        open={open}
        centered
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        styles={{
          body: {
            padding: "12px",
            marginTop: "12px",
            borderTop: "2px solid rgba(0, 0, 0, 0.06)",
          },
        }}
      >
        <Descriptions bordered column={1} items={items} />
      </Modal>
    </div>
  );
}
