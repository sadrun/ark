import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

const title = '梦里不知身是客,一晌贪欢';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

if (module.hot) {
    // 实现热更新
    module.hot.accept();
}
  