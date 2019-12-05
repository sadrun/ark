import React from 'react';
import ReactDOM from 'react-dom';
import Framework from './Framework';
import './index.less';
import { registerMicroApps } from '@ark-plan/ark';

function render({ template, loading, name}) {
  const container = document.getElementById('frameWork');
  ReactDOM.render(<Framework loading={loading} content={template} name={name}/>, container);
}

render({ loading: true });

registerMicroApps(
  [
    { name: 'home', entry: '/home.html', render, activeRule:'/fe/home',isPreload:true, },
    { name: 'mall', entry: '/mall.html', render, activeRule:'/fe/mall',isPreload:false,  },
    { name: 'point', entry: '/point.html', render, activeRule:'/fe/point',isPreload:false,  },
  ],
  {
    index:'/fe/home'
  }
);
