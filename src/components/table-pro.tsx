import {
  DownOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  type FormProps,
  Row,
  Space,
  Table,
  type TableProps,
  FormItemProps,
} from "antd";
import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const { Item } = Form;

export default function TablePro({
  className,
  formProps,
  formItemProps,
  tableProps,
  actions,
  onReset,
}: {
  className?: string;
  formProps?: FormProps;
  formItemProps?: FormItemProps[];
  tableProps?: TableProps<any>;
  actions?: React.ReactNode[];
  onReset?: () => void;
}) {
  const [expand, setExpand] = useState(false);
  const { t } = useTranslation();

  const renderItems = (items?: FormItemProps[]) => {
    if (!items || items.length <= 0) {
      return null;
    }
    const children: React.ReactNode[] = [];
    for (let i = 0; i < items.length; i++) {
      children.push(
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={8}
          key={i}
          className={clsx("my-1", {
            "!hidden md:!block": i === 1 && !expand,
            "!hidden xl:!block": i === 2 && !expand,
            "!hidden xll:!block": i >= 3 && !expand,
          })}
        >
          <Item key={i} {...items[i]} className="!m-0" />
        </Col>
      );
    }
    return children;
  };

  return (
    <div className={`h-full ${className}`}>
      <Card size="small" bordered={false} className="!mb-3">
        <Form {...formProps}>
          <Row align="top" className="w-full">
            <Col xs={24} sm={12} md={16} lg={16}>
              <Row>{renderItems(formItemProps)}</Row>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} className="text-end my-1">
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                >
                  {t("app.userPage.query.action.query")}
                </Button>
                <Button
                  htmlType="reset"
                  icon={<ReloadOutlined />}
                  onClick={onReset}
                >
                  {t("app.userPage.query.action.reset")}
                </Button>
                <a
                  style={{ fontSize: 14 }}
                  onClick={() => {
                    setExpand(!expand);
                  }}
                >
                  {expand
                    ? t("app.userPage.query.action.collapsed")
                    : t("app.userPage.query.action.expand")}
                  <DownOutlined
                    rotate={expand ? 180 : 0}
                    style={{ marginLeft: 5 }}
                  />
                </a>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card size="small" bordered={false}>
        {actions && (
          <Space wrap className="mb-3">
            {...actions.map((item, index) => <div key={index}>{item}</div>)}
          </Space>
        )}
        <Table {...tableProps} />
      </Card>
    </div>
  );
}
