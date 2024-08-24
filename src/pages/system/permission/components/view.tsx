import AuthWrapper from "@/components/auth-wrapper";
import { permissionStatusTagColor } from "@/config/statusTag";
import { EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Descriptions,
  message,
  Modal,
  Tag,
  type DescriptionsProps,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function View({ data }: { data: API.PermissionInfo[] }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const items: DescriptionsProps["items"] =
    data.length === 1
      ? [
          {
            key: "code",
            label: t("app.permissionPage.action.modal.view.item.code"),
            children: data[0].code,
          },
          {
            key: "name",
            label: t("app.permissionPage.action.modal.view.item.name"),
            children: data[0].name,
          },
          {
            key: "permissionStatus",
            label: t(
              "app.permissionPage.action.modal.view.item.permissionStatus"
            ),
            children: (
              <Tag
                color={
                  permissionStatusTagColor.filter(
                    (item) => data[0].permissionStatus.dictValue === item.value
                  )[0].color
                }
              >
                {data[0].permissionStatus.dictLabel}
              </Tag>
            ),
          },
          {
            key: "menu",
            label: "菜单",
            children: t(`app.layout.menu.${data[0].menu}`),
          },
        ]
      : [];

  const handleView = () => {
    if (data.length !== 1) {
      messageApi.warning(t("app.permissionPage.action.modal.view.selectOne"));
      return;
    }
    setOpen(true);
  };

  return (
    <div>
      {contextHolder}
      <AuthWrapper permission="permission:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t("app.permissionPage.action.view")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.permissionPage.action.modal.view.title")}
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
