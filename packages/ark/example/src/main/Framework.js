import React,{useState} from 'react';
import { Layout, Menu, Spin } from 'antd';
import {goto} from '../../../src/index';

const { Header, Footer } = Layout;

export default function Framework(props) {
  const { content, loading } = props;
  return (
    <Layout className="layout">
      {!!loading &&  <div className="loading"><Spin /></div> }
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname || '/fe/home']}
          style={{ lineHeight: '64px' }}
          onClick={({ item, key, keyPath, domEvent })=>{
            goto(item.props.children,key)
          }}
        >
          <Menu.Item key="/fe/home">首页</Menu.Item>
          <Menu.Item key="/fe/mall">商城</Menu.Item>
          <Menu.Item key="/fe/point">动画</Menu.Item>
        </Menu>
      </Header>
      <div 
        className="frameWork-content"
        dangerouslySetInnerHTML={{ __html: content }}
      >
      </div>
      <Footer style={{ textAlign: 'center',background: '#001529',color:'#fff' }}>MicroApps ©{(new Date()).getFullYear()} Created by muge</Footer>
    </Layout>
  )
}