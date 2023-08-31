import { useTranslation } from 'react-i18next';
import styles from './index.module.less';
import {
  Col,
  Form,
  Row,
  type FormItemProps,
  type FormProps,
  type TableProps,
  Space,
  Button,
  Card,
  Table
} from 'antd';
import { DownOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

type Props = {
  className?: string;
  // 查询表单的查询字段
  queryItems?: FormItemProps[];
  // 查询表单的属性
  queryForm?: FormProps;
  // 操作按钮
  actions?: React.ReactNode[];
  // 结果展示表格属性
  queryTable?: TableProps<any>;
  // 表单重置调用方法
  onReset?: () => void;
};

const TablePro: React.FC<Props> = ({
  className,
  queryItems,
  queryForm,
  actions,
  queryTable,
  onReset
}) => {
  const { t } = useTranslation();
  const [expand, setExpand] = useState(false);

  const renderQueryItems = (queryItems?: FormItemProps[]) => {
    if (!queryItems || queryItems.length <= 0) {
      return null;
    }
    const children: React.ReactNode[] = [];
    const collapseCount = queryItems.length > 3 ? 3 : queryItems.length;
    const count = expand ? queryItems.length : collapseCount;
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i} style={{ margin: '5px 0' }}>
          <Form.Item key={i} {...queryItems[i]}>
            {queryItems[i].children}
          </Form.Item>
        </Col>
      );
    }
    return children;
  };

  const getFormProps = () => {
    if (!queryForm) {
      return;
    }
    return {
      colon: queryForm.colon,
      disabled: queryForm.disabled,
      component: queryForm.component,
      fields: queryForm.fields,
      form: queryForm.form,
      initialValues: queryForm.initialValues,
      labelAlign: queryForm.labelAlign,
      labelWrap: queryForm.labelWrap,
      labelCol: queryForm.labelCol,
      layout: queryForm.layout,
      name: queryForm.name,
      preserve: queryForm.preserve,
      requiredMark: queryForm.requiredMark,
      scrollToFirstError: queryForm.scrollToFirstError,
      size: queryForm.size,
      validateMessages: queryForm.validateMessages,
      validateTrigger: queryForm.validateTrigger,
      wrapperCol: queryForm.wrapperCol,
      onFieldsChange: queryForm.onFieldsChange,
      onFinish: queryForm.onFinish,
      onFinishFailed: queryForm.onFinishFailed,
      onValuesChange: queryForm.onValuesChange
    };
  };

  const getTableProps = () => {
    if (!queryTable) {
      return;
    }
    return {
      bordered: queryTable.bordered,
      columns: queryTable.columns,
      components: queryTable.components,
      dataSource: queryTable.dataSource,
      expandable: queryTable.expandable,
      footer: queryTable.footer,
      getPopupContainer: queryTable.getPopupContainer,
      loading: queryTable.loading,
      locale: queryTable.locale,
      pagination: queryTable.pagination,
      rowClassName: queryTable.rowClassName,
      rowKey: queryTable.rowKey,
      rowSelection: queryTable.rowSelection,
      scroll: queryTable.scroll,
      showHeader: queryTable.showHeader,
      showSorterTooltip: queryTable.showSorterTooltip,
      size: queryTable.size,
      sortDirections: queryTable.sortDirections,
      sticky: queryTable.sticky,
      summary: queryTable.summary,
      tableLayout: queryTable.tableLayout,
      title: queryTable.title,
      onChange: queryTable.onChange,
      onHeaderRow: queryTable.onHeaderRow,
      onRow: queryTable.onRow
    };
  };

  return (
    <div className={`${styles['container']} ${className}`}>
      {queryItems && queryItems.length > 0 && (
        <Card size="small" bordered={false} className={styles['query']}>
          <Form {...getFormProps()}>
            <Row style={{ width: '100%' }} align="middle">
              <Col span={19}>
                <Row>{renderQueryItems(queryItems)}</Row>
              </Col>
              <Col span={5} style={{ textAlign: 'center' }}>
                <Space>
                  <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                    {t('common.button.query')}
                  </Button>
                  <Button htmlType="reset" icon={<ReloadOutlined />} onClick={onReset}>
                    {t('common.button.reset')}
                  </Button>
                  <a
                    style={{ fontSize: 14 }}
                    onClick={() => {
                      setExpand(!expand);
                    }}
                  >
                    {expand ? t('common.collapse') : t('common.expand')}
                    <DownOutlined rotate={expand ? 180 : 0} style={{ marginLeft: 5 }} />
                  </a>
                </Space>
              </Col>
            </Row>
          </Form>
        </Card>
      )}
      <Card bordered={false} className={styles['content']}>
        {actions && (
          <Space className={styles['action']}>
            {...actions.map((item, index) => <div key={index}>{item}</div>)}
          </Space>
        )}
        <Table {...getTableProps()} />
      </Card>
    </div>
  );
};

export default TablePro;
