'use strict';

// import 'intl';
import React from 'react';
import ReactDom from 'react-dom';

// import 'antd/dist/antd.css';

import './app.less';

import fetch from './common/fetch';
// import Login from './login.jsx';

import {
  Layout,
  Select,
  Table,
  Button,
  notification,
  Spin,
} from 'antd';
import TestBot from './testbot.jsx';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  sorter: (a, b) => a.age - b.age,
}, {
  title: 'Address',
  dataIndex: 'address',
  filters: [{
    text: 'London',
    value: 'London',
  }, {
    text: 'New York',
    value: 'New York',
  }],
}];

const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

const Option = Select.Option;

const isLogin = location.hash === '#login';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      dataList: [],
      buttonText: 'button',
    };
  }

  componentWillMount () {
    fetch('/api/antd-sample/getListData', 'GET', null)
      .then(res => {
        if (res.success) {
          this.setState({
            loading: false,
            dataList: res.data,
          });
        } else {
          this.setState({
            loading: false,
          });
          this.doNotification(null, 'server error', res.errorMessage);
        }
      });
  }

  doNotification (e, title = 'error', content = 'error') {
    notification.open({
      message: title,
      description: content,
    });
  }

  onSelectChange(e) {
    this.setState({
      buttonText: e,
    });
  }

  render () {
    // if (isLogin) {
    //   return <Login />;
    // }
    return (
      <Layout>
        <Header className="header"></Header>
        <Content style={{ padding: 30 }}>
          <Select
            className="test-list"
            defaultValue="lucy"
            onChange={this.onSelectChange.bind(this)}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>Disabled</Option>
            <Option value="fourth">fourth</Option>
          </Select>
          <Button onClick={this.doNotification.bind(this)}>{this.state.buttonText}</Button>
          <Spin
            tip="Loading..."
            spinning={this.state.loading}
          >
            <Table columns={columns} dataSource={this.state.dataList} />
          </Spin>
        </Content>
        <Footer/>
        <TestBot />
      </Layout>
    );
  }
}

App.defaultProps = {
  context: window.context,
};

ReactDom.render(<App />, document.querySelector('#app'));
