import React, { Suspense, useState } from "react";

import {
  Layout, Menu, Button, Col, Popover, Avatar, List
} from "antd";
import {
  MenuOutlined,
  BankOutlined,
  TagsOutlined,
  AppstoreAddOutlined
} from "@ant-design/icons";
import { Switch, Route, Link, withRouter, useLocation } from "react-router-dom";

import Routes from "./Routes";
import Loading from "../basic/Loading";

import './style.css'

const { Header, Content, Sider } = Layout;

function Dashboard() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    localStorage.setItem("store-user", '')
    window.location.reload()
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <style>
          {`
          .ant-menu-item-selected{
            background-color: #1f2533 !important;
          }
        `}
        </style>
        <Sider
          theme="dark"
          collapsed={collapsed}
          onCollapse={onCollapse}
          style={{
            height: "100vh",
            left: 0,
            position: "fixed",
            overflow: "auto",
            background: "#2d3546",
          }}
          width={240}
        >
          <div
            className="logo"
            style={{
              minHeight: 70,
              textAlign: "center",
              paddingTop: 20,
              background: "#1f2532",
            }}
          >
            {/* {collapsed ? (
              <img
                alt="logo"
                style={{ width: 45, marginBottom: 5 }}
                src={smallLogo}
              />
            ) : (
              <img alt="logo" style={{ width: 140 }} src={largeLogo} />
            )} */}
          </div>
          <Menu
            theme="dark"
            selectedKeys={[location.pathname]}
            mode="inline"
            style={{ background: "#2d3646", marginTop: 35 }}
          >
            <Menu.Item key="/">
              <BankOutlined />
              <span>Store</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="/category">
              <AppstoreAddOutlined />
              <span>Category</span>
              <Link to="/category" />
            </Menu.Item>
            <Menu.Item key="/product">
              <TagsOutlined />
              <span>Product</span>
              <Link to="/product" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{
            transition: "all 0.2s",
            marginLeft: collapsed ? 80 : 240,
          }}
        >
          <Header
            className="site-layout-background"
            style={{ padding: 0, display: "inherit" }}
          >
            <Col span={1} style={{ textAlign: "center" }}>
              <Button
                type="link"
                icon={
                  <MenuOutlined style={{ fontSize: 15, color: "#1f2532" }} />
                }
                onClick={toggleSidebar}
              />
            </Col>
            <Col offset={21} span={2}>
              <Popover
                content={
                  <List>
                    <List.Item>
                      <a href="# " onClick={logout}>
                        Logout
                      </a>
                    </List.Item>
                  </List>
                }
                trigger="hover"
                arrowPointAtCenter
                placement="bottomLeft"
              >
                <Avatar
                  src={`https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png`}
                />
              </Popover>
            </Col>
          </Header>
          <Content style={{ margin: "16px 16px", marginBottom: 0 }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 500 }}
            >
              <Suspense fallback={<Loading />}>
                <Switch>
                  {Routes.map((route) => (
                    <Route
                      exact={route.exact}
                      key={route.key}
                      path={`${route.path}`}
                    >
                      <route.component />
                    </Route>
                  ))}
                </Switch>
              </Suspense>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}


export default withRouter((props) => <Dashboard {...props} />);
