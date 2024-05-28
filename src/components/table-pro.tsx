import {
  DownOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Space, Table } from "antd";
import { useViewport } from "./viewport-provider";
import breakpoint from "@/config/breakpoint";
import clsx from "clsx";

const { Item } = Form;

export default function TablePro() {
  const { width } = useViewport();

  return (
    <div className="h-full flex flex-col justify-start">
      <Card size="small" bordered={false} className="!mb-3">
        <Form
          name="query"
          layout={width <= breakpoint.sm ? "horizontal" : "inline"}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Row align="middle" style={{ width: "100%" }}>
            <Col xs={24} sm={12} md={12} lg={6} className="my-1">
              <Item name="cs1" label="参数1" className="!m-0">
                <Input />
              </Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} className="my-1">
              <Item name="cs2" label="参数2" className="!m-0">
                <Input />
              </Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} className="my-1">
              <Item name="cs2" label="参数3" className="!m-0">
                <Input />
              </Item>
            </Col>
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={6}
              className={clsx("text-right", { "mt-3": width <= breakpoint.sm })}
            >
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                >
                  查询
                </Button>
                <Button htmlType="reset" icon={<ReloadOutlined />}>
                  重置
                </Button>
                <a
                  style={{ fontSize: 14 }}
                  //   onClick={() => {
                  //     setExpand(!expand);
                  //   }}
                >
                  展开
                  <DownOutlined
                    rotate={1 ? 180 : 0}
                    style={{ marginLeft: 5 }}
                  />
                </a>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card size="small" bordered={false}>
        <Space>
          <Button type="primary" icon={<PlusOutlined />}>
            新增
          </Button>
        </Space>
        <Table />
      </Card>
    </div>
  );
}
