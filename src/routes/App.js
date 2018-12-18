import React, { Component } from 'react';
import { connect } from 'dva';
import { Router, Route, Switch, Redirect } from 'dva/router';
import { Layout, Icon } from 'antd';
import LeftMenu from '../components/common/leftMenu';
import { menuConfig } from '../utils/menuConfig';
import styles from './App.less';

const { Sider, Content, Header } = Layout;

@connect(state => ({
  collapsed: state.global.collapsed,
}))

export default class App extends Component {
  render() {
    const { dispatch, history, collapsed, app, location } = this.props;
    console.log(collapsed);
    return (
      <Layout>
        <Sider className={styles.sider} collapsed={collapsed}>
          <LeftMenu collapsed={collapsed} app={app} location={location} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <span className={styles.menuFold} onClick={() => dispatch({type:'global/setState', collapsed: !collapsed})}>
              {collapsed ? <Icon type="menu-unfold" /> : <Icon type="menu-fold" />}
            </span>
          </Header>
          <Content className={styles.content}>
            <Router history={history}>
              <Switch>
                {
                  menuConfig(app).map(item => 
                    <Route
                      exact
                      key={item.path}
                      path={item.path}
                      component={item.component}
                    /> 
                  )
                }
                <Redirect exact from="/" to="/index"/>
              </Switch>
            </Router>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
