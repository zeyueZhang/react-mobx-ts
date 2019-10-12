import React, { Component, Suspense } from 'react';
import styles from './index.module.less';
import { Layout } from 'antd';
import SideBar from './SideNav';
import Routes from '../routes';

const { Header, Content, Footer, Sider } = Layout;

class Main extends Component<any, any> {

  render() {
    return (
      <Layout
        className={styles.main}
      >
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <SideBar/>
        </Sider>
        
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Suspense fallback={<div>Loading</div>}>
            <Content style={{ margin: '24px 16px 0',padding: 24, background: '#fff', minHeight: 360 }}>
              <Routes/>
            </Content>
          </Suspense>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Main