import React from 'react';
import ReactDOM from 'react-dom';
import Framework from './Framework';
import './index.less';
import {registerMicroApps} from '../../../src/index';

function render({ template, loading, name}) {
  const container = document.getElementById('frameWork');
  ReactDOM.render(<Framework loading={loading} content={template} name={name}/>, container);
}

render({ loading: true });

registerMicroApps(
  [
    { name: 'home', entry: 'http://10.10.15.224:3000/home.html', render, activeRule:'/fe/home',isPreload:true, },
    { name: 'mall', entry: 'http://10.10.15.224:3000/mall.html', render, activeRule:'/fe/mall',isPreload:false,  },
    { name: 'point', entry: 'http://10.10.15.224:3000/point.html', render, activeRule:'/fe/point',isPreload:false,  },
  ],
  {
    index:'/fe/home'
  }
);
