import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Button } from 'antd';
import DetailSwitchDemo from '../components/detailSwitchDemo'

import './index.less';
const {  Content } = Layout;

ReactDOM.render(
  <Content style={{ padding: '0 50px' }}>
    <div className="origin-page" style={{marginBottom:20}}>
      <Button type="primary" href="/mall.html" size="small"  target="_blank">原页面</Button>
    </div>
    <DetailSwitchDemo></DetailSwitchDemo>
  </Content>,
  document.getElementById('mall')
);

  