import React from 'react';
import { connect } from 'dva';
import { Table, Breadcrumb, Input, Button, Form } from 'antd';

function appVersion(props) {

  const { dashboard,dispatch } = props;
  const { saData } = dashboard;

  const modelMap = saData.rows.reduce((prev, curr) => (
    (prev[curr.moduleId] = prev[curr.moduleId] ? prev[curr.moduleId] + 1 : 1) && prev
  ), {});
  console.log(modelMap);

  const mergeModelColumn = (text, record, index) => {
    if (index > 0) {
      return {
        children: text,
        props: {
          rowSpan: record.moduleId === saData[index - 1].moduleId ?
            0 : modelMap[record.moduleId]
        }
      }
    }
    return text;
  }

  const column = [{
    title: '模块名',
    dataIndex: 'moduleName',
    render: mergeModelColumn,
  }, {
    title: '模块版本',
    dataIndex: 'moduleVersion',
    render: mergeModelColumn,
  },{
    title: '操作系统版本',
    dataIndex: 'os',
    render: mergeModelColumn,
  }, {
    title: '模块进度',
    dataIndex: 'moduleProgress',
    render: mergeModelColumn,
  } , {
    title: '服务名',
    dataIndex: 'serviceName',

  } , {
    title: '服务进度',
    dataIndex: 'serviceProgress',


  } , {
    title: '功能',
    dataIndex: 'function',


  } , {
    title: '代码分支',
    dataIndex: 'codeBranch',


  } , {
    title: '计划tag',
    dataIndex: 'serviceTag',


  } , {
    title: '负责人',
    dataIndex: 'manager',


  }]
  return (
    <div>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>SA版本</Breadcrumb.Item>
        <Breadcrumb.Item>
          SA列表
        </Breadcrumb.Item>
      </Breadcrumb>
      <Form layout="inline">
        <Form.Item label="版本号">
            <Input/>
        </Form.Item>
        <Form.Item label="名称">
            <Input/>
        </Form.Item>
        <Form.Item label="系统版本">
            <Input/>
        </Form.Item>
        <Form.Item>
            <Button type="primary">查询</Button>
        </Form.Item>
      </Form>
      <Table
        rowKey="id"
        dataSource={saData.rows}
        columns={column}
        bordered
        pagination={{ 
          defaultCurrent: saData.page,
          defaultPageSize:10, 
          total:saData.records, 
          onChange: (page,defaultPageSize) => 
            dispatch({ 
              type: 'dashboard/getAllService', 
              payload: {page,defaultPageSize} 
            }) 
          }}
      />
    </div>)
};


export default connect(({ dashboard, router }) => ({
  dashboard,
  location: router.location,
}))(appVersion);

// export default appVersion;