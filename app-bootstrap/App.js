import React, { Component } from 'react';
import './App.css';
import {
  Button,
  TabBar,
  NavBar,
  Icon,
} from 'antd-mobile';
import classnames from 'classnames';
import 'antd-mobile/dist/antd-mobile.css';

import * as CONSTANTS from './constants';
import LoginPage from './components/LoginPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      selectedTab: 'Home',
      hidden: false,
    };
  }

  loginHandle() {
    this.setState({
      isLogin: true
    });
  }

  logoutHandle() {
    this.setState({
      isLogin: false
    });
  }

  render() {
    return (
      <div className="App">
        <LoginPage
          isLogin={this.state.isLogin}
          loginHandle={this.loginHandle.bind(this)}
        />
        <div
          className={classnames({
            page: true,
            hide: !this.state.isLogin
          })}
        >
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
          >
            {this.state.selectedTab}
          </NavBar>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#f64c81"
            barTintColor="white"
          >
            <TabBar.Item
              title="Home"
              key="Home"
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: `url(./img/tab_home_btn@2x.png) center center /  54px 42px no-repeat` }}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: `url(./img/tab_home_selected_btn@2x.png) center center /  54px 42px no-repeat` }}
              />
              }
              selected={this.state.selectedTab === 'Home'}
              onPress={() => {
                this.setState({
                  selectedTab: 'Home'
                });
              }}
            >
              <div className="home">
                <h1 style={{
                  marginTop: '10%'
                }}>{CONSTANTS.TITLE}</h1>
                <Button style={{
                  marginTop: '70%'
                }} onClick={this.logoutHandle.bind(this)}>
                  List
                </Button>
              </div>
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(./img/tab_web_btn@2x.png) center center /  54px 42px no-repeat` }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(./img/tab_web_selected_btn@2x.png) center center /  54px 42px no-repeat` }}
                />
              }
              title="Webview"
              key="Webview"
              selected={this.state.selectedTab === 'Webview'}
              onPress={() => {
                this.setState({
                  selectedTab: 'Webview'
                });
              }}
            >
              webview
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(./img/tab_web_btn@2x.png) center center /  54px 42px no-repeat` }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(./img/tab_web_selected_btn@2x.png) center center /  54px 42px no-repeat` }}
                />
              }
              title="Baidu"
              key="Baidu"
              selected={this.state.selectedTab === 'Baidu'}
              onPress={() => {
                this.setState({
                  selectedTab: 'Baidu',
                  titleBarText: 'Baidu'
                });
              }}
            >
              <iframe title="iframe" key="iframe" src="//www.baidu.com" />
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(./img/tab_personal_btn@2x.png) center center /  54px 42px no-repeat` }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(./img/tab_personal_selected_btn@2x.png) center center /  54px 42px no-repeat` }}
                />
              }
              title="Personal"
              key="Personal"
              selected={this.state.selectedTab === 'Personal'}
              onPress={() => {
                this.setState({
                  selectedTab: 'Personal',
                });
              }}
            >
              <div className="personal">
                <h1>{CONSTANTS.TITLE}</h1>
                <img alt={CONSTANTS.TITLE} src={`./img/avatar.png`} />
                <Button style={{
                  marginTop: '70%'
                }} onClick={this.logoutHandle.bind(this)}>Logout</Button>
              </div>
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    );
  }
}

export default App;
