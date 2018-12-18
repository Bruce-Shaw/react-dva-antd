import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { menuConfig } from '../../utils/menuConfig';

const { Item, SubMenu } = Menu;

@connect(state => ({
  collapsed: state.global.collapsed,
}))

export default class LeftMenu extends Component {
  renderSubItem = (pathname, it) => (pathname === it.path ? (
    <span>
      <Icon type={it.icon} />
      {it.name}
    </span>
  ) : (
    <Link to={it.path}>
      <span>
        <Icon type={it.icon} />
        {it.name}
      </span>
    </Link>
  ))

  render() {
    const { collapsed, location, app } = this.props;
    const { pathname } = location;
    console.log(menuConfig(app)[0].path, pathname);
    return (
      <Menu
        theme="dark"
        selectedKeys={[`${pathname.split('/')[1]}`]}
        mode="inline"
      >
        {
          menuConfig(app).map(item => (
            item.children ? (
              <SubMenu
                key={item.key}
                title={(
                  <span>
                    <Icon type={item.icon} />
                    {collapsed ? null : item.name}
                  </span>
                )}
              >
                {
                  item.children.map(it => (
                    <Item key={it.key}>
                      {
                        this.renderSubItem(pathname, it)
                      }
                    </Item>
                  ))
                }
              </SubMenu>
            ) : (
              <Item key={item.key}>
                {
                    pathname === item.path ? (
                      <span>
                        <Icon type={item.icon} />
                        {collapsed ? null : item.name}
                      </span>
                    ) : (
                      <Link to={item.path}>
                        <span>
                          <Icon type={item.icon} />
                          {collapsed ? null : item.name}
                        </span>
                      </Link>
                    )
                  }
              </Item>
            )
          ))
        }
      </Menu>
    );
  }
}
