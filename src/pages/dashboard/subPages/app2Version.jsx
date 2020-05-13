import React from 'react';

function appVersion() {
  return (
    <div className={styles.sysVersion}>
      <Row span={24}>
        <Col span={3}><b>应用服务名：</b>{wipVersion.osVersion}</Col>
      </Row>
      <Row span={24}>
        <Col span={3}><b>开发进度：</b>{wipVersion.osVersion}</Col>
        <Col span={10}><Progress percent={wipVersion.osProgress * 100} /></Col>
      </Row>
      <Row>
        <Col><b>计划release日期：</b>{wipVersion.osDate}</Col>
      </Row>
      <Row>
        <Col><b>版本特性：</b>{wipVersion.osRemark}</Col>
      </Row>
      <Row>
        <Col><b>历史版本列表：</b></Col>
        <Col>{historyVersion.map((item) => (
          <div>> {item.osDate} {item.osName} {item.osVersion} <a>详情</a></div>
        ))}</Col>
      </Row>
    </div>)
};

export default appVersion;