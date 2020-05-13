import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { Tabs } from 'antd';
import subPages from './subPages';
import styles from './index.less';

const { TabPane } = Tabs;

const tabList = [{
  tab: '产品版本',
  key: 'prdVersion',
}, {
  tab: 'APP版本',
  key: 'appVersion',
}, {
  tab: '系统版本信息',
  key: 'sysVersion',
}, {
  tab: 'SA版本',
  key: 'saVersion',
}, {
  tab: '应用版本',
  key: 'app2Version',
}]

function dashboard(props) {

  const { dashboard, location } = props;
  const { query } = location;

  const changeTabs = (tab) => {
    history.push(`?tab=${tab}`);
  }

  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey={query.tab || 'sysVersion'} type="card" onChange={changeTabs}>
        {
          tabList.map((tab) => {
            const Component = subPages[tab.key];
            return (
              <TabPane tab={tab.tab} key={tab.key}>
                <Component />   
              </TabPane>
            )
          })
        }
      </Tabs>
    </div>)
};

export default connect(({ dashboard, router }) => ({
  dashboard,
  location: router.location,
}))(dashboard);

