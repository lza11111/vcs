import React from 'react';
import { connect } from 'dva';
import { Row, Col, Progress } from 'antd'; 
import styles from './styles.less';

function sysVersionDetail(props) {
  const { sysDetailData } = props;
  const { OSDetail , saData } = sysDetailData;

  const modelMap = saData.rows.reduce(
    (prev, curr) => (
    (prev[curr.moduleId] = prev[curr.moduleId] 
      ? prev[curr.moduleId] + 1 : 1) && prev
  ), {});
  console.log(modelMap);

  const mergeModelColumn = (text, record, index) => {
    if (index > 0) {
      return {
        children: text,
        props: {
          rowSpan: record.moduleId === saData.rows[index - 1].moduleId ?
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
    <div className={styles.sysVersion}>
      <Row>
        <Col><b>计划release日期：</b>{OSDetail.osDate}</Col>
      </Row>
      <Row>
        <Col><b>版本特性：</b>{OSDetail.osRemark}</Col>
      </Row>
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
              type: 'sysDetail/queryServiceListByOsVersion', 
              payload: {
                osVersion: OSDetail.osVersion,
                osName: OSDetail.osName,
                page: page,
                pageSize: defaultPageSize
              } 
            }) 
          }}
      />
    </div>)
};

export default connect(({ sysDetail, router }) => ({
  sysDetail,
  location: router.location,
}))(sysVersionDetail);
