import React from 'react';

function appVersion() {

  return (
    <div className={styles.sysVersion}>
      <Row span={24}>
        <Col span={3}><b>服务名：</b>{wipVersion.osVersion}</Col>
        <Col span={10}><Progress percent={wipVersion.osProgress * 100} /></Col>
      </Row>
    </div>)

};

export default appVersion;