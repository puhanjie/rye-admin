import AuthWrapper from "@/components/auth-wrapper";
import { roleStatusTagColor } from "@/config/statusTag";
import route, { type Route } from "@/router";
import { getPermissionTreeData } from "@/utils/options";
import { getAuthRoute } from "@/utils/route";
import { EyeOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Descriptions,
  Modal,
  Tag,
  Tree,
  type DescriptionsProps,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function View({
  data,
  optionsData,
}: {
  data: API.RoleInfo[];
  optionsData?: API.RoleOptions;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { message } = App.useApp();

  const getMenuRoute = (route: Route[], permissions?: API.Permission[]) => {
    if (!permissions) {
      return;
    }
    const authRoute = getAuthRoute(
      route,
      permissions.map((item) => item.code)
    );
    return authRoute.filter((item) => item.path === "/")[0].children;
  };

  const items: DescriptionsProps["items"] =
    data.length === 1
      ? [
          {
            key: "code",
            label: t("app.rolePage.action.modal.view.item.code"),
            children: data[0].code,
          },
          {
            key: "name",
            label: t("app.rolePage.action.modal.view.item.name"),
            children: data[0].name,
          },
          {
            key: "roleStatus",
            label: t("app.rolePage.action.modal.view.item.roleStatus"),
            children: (
              <Tag
                color={
                  roleStatusTagColor.filter(
                    (item) => data[0].roleStatus.dictValue === item.value
                  )[0].color
                }
              >
                {data[0].roleStatus.dictLabel}
              </Tag>
            ),
          },
          {
            key: "permissions",
            label: t("app.rolePage.action.modal.view.item.permission"),
            children: (
              <Tree
                showLine
                selectable={false}
                defaultCheckedKeys={data[0].permissions?.map((item) =>
                  item.id.toString()
                )}
                treeData={getPermissionTreeData(
                  getMenuRoute(route, data[0].permissions),
                  optionsData?.permissions
                )}
                rootClassName="overflow-auto"
                rootStyle={{
                  height: "84px",
                  width: "100%",
                }}
              />
            ),
            contentStyle: {
              paddingRight: 0,
            },
          },
        ]
      : [];

  const handleView = () => {
    if (data.length !== 1) {
      message.warning(t("app.rolePage.action.modal.view.selectOne"));
      return;
    }
    setOpen(true);
  };

  return (
    <div>
      <AuthWrapper permission="role:view">
        <Button icon={<EyeOutlined />} onClick={handleView}>
          {t("app.rolePage.action.view")}
        </Button>
      </AuthWrapper>
      <Modal
        title={t("app.rolePage.action.modal.view.title")}
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
