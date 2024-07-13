import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import './Home.css';

const { Header, Content } = Layout;

const Home = ({ onLogout }) => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">Ödünç Eşya</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/home/items">Eşyalarım</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/home/shopping">Alışveriş</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/home/cart">Sepet</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/home/profile">Profil</Link>
          </Menu.Item>
          <Menu.Item key="5" onClick={onLogout}>
            Çıkış Yap
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
