import Loading from "@/components/loading";
import { getDictionarys } from "@/services/dictionary";
import { editInfo, getInfo } from "@/services/user";
import { useAppDispatch, useAppSelector } from "@/store";
import { setAvatar, setUserInfo } from "@/store/modules/user";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  message,
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
import { useTranslation } from "react-i18next";

export default function Info() {
  const { t } = useTranslation();
  const [sexData, setSexData] = useState<API.Dictionary[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

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
      messageApi.error(t("app.settingsPage.info.fail"));
    }
    const queryResult = await getInfo();
    if (!queryResult.data) {
      return;
    }
    dispatch(setUserInfo(queryResult.data));
    messageApi.success(t("app.settingsPage.info.success"));
  };

  const handleChange = ({ file }: { file: UploadFile<API.Result<string>> }) => {
    if (!file.response) {
      return;
    }
    if (!file.response.data) {
      return;
    }
    const avatar = file.response.data;
    dispatch(setAvatar(avatar));
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
      {contextHolder}
      <Row>
        <Col xs={24} sm={24} md={12} lg={10} xl={10}>
          <div className="flex flex-col justify-start items-center mb-4">
            <Avatar
              className="!mb-2"
              src={user.avatar ? user.avatar : "/avator.png"}
              size={128}
              alt="avatar"
            />
            <Upload
              name="files"
              headers={{ Authorization: `Bearer ${getToken()}` }}
              method="PUT"
              action={`${import.meta.env.VITE_APP_BASE_API}/api/v1/user/avatar`}
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
            <Form.Item wrapperCol={{ offset: 4 }}>
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
