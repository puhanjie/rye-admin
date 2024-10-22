"use client";

import Loading from "@/components/loading";
import { getDictionarys } from "@/services/dictionary";
import { editInfo, getInfo } from "@/services/user";
import {
  App,
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Upload,
  type UploadFile,
} from "antd";
import { useEffect, useState } from "react";
import Container from "./container";
import { getDictSelectOptions } from "@/utils/options";
import { getToken } from "@/utils/auth";
import { UploadOutlined } from "@ant-design/icons";
import { useUserStore } from "@/store/user";
import { useTranslations } from "next-intl";

export default function Info() {
  const t = useTranslations();
  const [sexData, setSexData] = useState<API.Dictionary[]>([]);
  const [loading, setLoading] = useState(true);
  const userStore = useUserStore((state) => state);
  const user: API.UserBasicInfo = {
    id: userStore.id,
    username: userStore.username,
    name: userStore.name,
    sex: userStore.sex,
    phone: userStore.phone,
    avatar: userStore.avatar,
    email: userStore.email,
    roles: userStore.roles,
    permissions: userStore.permissions,
  };
  const { message } = App.useApp();

  const getInitData = (user: API.UserBasicInfo) => {
    const {
      id,
      avatar,
      username,
      name,
      sex,
      phone,
      email,
      roles,
      permissions,
    } = user;
    return {
      id,
      avatar,
      username,
      name,
      sex: sex?.dictValue,
      phone,
      email,
      roles,
      permissions,
    };
  };

  const handleFinish = async (values: API.BasicInfoParams) => {
    const editResult = await editInfo(values);
    if (!editResult.data) {
      message.error(t("app.settingsPage.info.fail"));
    }
    const queryResult = await getInfo();
    if (!queryResult.data) {
      return;
    }
    userStore.setUserState(queryResult.data);
    message.success(t("app.settingsPage.info.success"));
  };

  const handleChange = ({ file }: { file: UploadFile<API.Result<string>> }) => {
    if (!file.response) {
      return;
    }
    if (!file.response.data) {
      return;
    }
    const avatar = file.response.data;
    userStore.setAvatar(avatar);
  };

  useEffect(() => {
    (async () => {
      const res = await getDictionarys({ dictType: "sex" });
      if (!res.data) {
        return;
      }
      setSexData(res.data);
      setLoading(false);
    })();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Container title={t("app.settingsPage.info.title")}>
      <Row>
        <Col xs={24} sm={24} md={12} lg={10} xl={10}>
          <div className="flex flex-col justify-start items-center mb-4">
            <Avatar
              className="!mb-2"
              src={user.avatar ? user.avatar : "/avatar.png"}
              size={128}
              alt="avatar"
            />
            <Upload
              name="files"
              headers={{ Authorization: `Bearer ${getToken()}` }}
              method="PUT"
              action={`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/user/avatar`}
              maxCount={1}
              showUploadList={false}
              onChange={handleChange}
            >
              <Button icon={<UploadOutlined />}>
                {t("app.settingsPage.info.changeAvator")}
              </Button>
            </Upload>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={10} xl={10}>
          <Form
            name="info"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={getInitData(user)}
            onFinish={handleFinish}
          >
            <Form.Item label="id" name="id" hidden>
              <Input />
            </Form.Item>
            <Form.Item label={t("app.settingsPage.info.name")} name="name">
              <Input />
            </Form.Item>
            <Form.Item label={t("app.settingsPage.info.sex")} name="sex">
              <Select
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={getDictSelectOptions(sexData)}
              />
            </Form.Item>
            <Form.Item label={t("app.settingsPage.info.phone")} name="phone">
              <Input />
            </Form.Item>
            <Form.Item label={t("app.settingsPage.info.email")} name="email">
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ sm: { offset: 4 }, md: { offset: 4 } }}>
              <Button type="primary" htmlType="submit">
                {t("app.settingsPage.info.submit")}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
