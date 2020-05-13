import React from 'react';
import { connect } from 'dva';
import { Row, Col, Progress } from 'antd'; 
import styles from './styles.less';

function sysVersionDetail(props) {
  const { sysDetailData } = props;
  const { OSDetail , saData } = sysDetailData;

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
              payload: {page,defaultPageSize} 
            }) 
          }}
      />
    </div>)
};

export default connect(({ sysDetail, router }) => ({
  sysDetail,
  location: router.location,
}))(sysVersionDetail);
