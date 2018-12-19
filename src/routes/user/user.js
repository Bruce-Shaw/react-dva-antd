import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Spin, Pagination } from 'antd';
import './User.less';

@connect(state => ({
  user: state.user,
}))


export default class User extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'user/getDataListPages',
    });
  }

  hanleChangePage = (current, pageSize) => {
    const { user: { pageObj } } = this.props;
    pageObj.pageNow = current;
    pageObj.pageSize = pageSize;
    this.props.dispatch({
      type: 'user/getDataListPages',
      ...pageObj,
    });
  }

  render() {
    const { user } = this.props;
    const { pages, loading, pageObj } = user;
    const columns = [{
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }];
    return (
      <div className="user">
        <Spin spinning={loading}>
          <Table
            rowKey="id"
            className="user-table"
            dataSource={pages}
            columns={columns}
            bordered
            pagination={false}
          />
          <Pagination
            showQuickJumper
            current={pageObj.pageNow}
            total={pageObj.totalCount}
            pageSize={pageObj.pageSize}
            pageSizeOptions={['5', '10', '15', '20']}
            onChange={(current, pageSize) => this.hanleChangePage(current, pageSize)}
            showSizeChanger
            onShowSizeChange={(current, pageSize) => this.hanleChangePage(current, pageSize)}
          />
        </Spin>
      </div>
    );
  }
}
