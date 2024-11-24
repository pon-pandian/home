import React, { Component } from "react";
import { Row, Col, notification } from "antd";
import { Navigate, Route, Routes} from "react-router-dom";
import UserImage from "../../Assets/Images/PonPandianImage.jpg";
import {
  MenuOutlined,
  SettingOutlined,
  AppstoreOutlined,
  UserAddOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { connect } from "react-redux";
import { logoutAction } from "../../redux/actionCreator/actionCreator";
import { persistor } from "../../redux/store/store";
import AddUser from "../addUser/addUser";
import Dashboard from "../dashboard/dashboard";
import Settings from "../settings/settings";
import withRouter from "./withRouter";

class PrivateLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.IconFont = createFromIconfontCN({
      scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
    });
  }

  toggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  handleMenuClick = (value) => {
    const { navigate } = this.props;
    navigate(value.key);
  };

  handleLogout = () => {
    const { dispatch, navigate } = this.props;
    persistor.purge();
    dispatch(logoutAction());
    navigate("/");
    notification.success({
      message: "Success",
      description: "Successfully Logged out",
    });
  };

  render() {

    const { collapsed } = this.state;
    const { Sider } = Layout;
    const { Name, Email } = this.props;

    return (

      <Layout className="dashboard_box">
        <Sider
          className="left_side_layout ps-1 pt-2"
          width={250}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="demo-logo-vertical">
            {collapsed ? (
              <Row>
                <Col span={4}>
                  <Button
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={this.toggleCollapse}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />
                </Col>
              </Row>
            ) : (
              <Row>
                <Col className="ms-2" span={5}>
                  <img
                    src={UserImage}
                    alt="user_images"
                    width="40px"
                    className="mt-2 user_image_dashboard"
                  />
                </Col>
                <Col span={12}>
                  <Row className="fw-bold mt-2 ellipsis_for_words" title={Name}>
                    {Name}
                  </Row>
                  <Row>
                    <a
                      title={Email}
                      className="text-dark fw-bold aside_mail ellipsis_for_words"
                      href={`mailto:${Email}`}
                    >
                      {Email}
                    </a>
                  </Row>
                </Col>
                <Col span={6}>
                  <Row>
                    <Button
                      type="text"
                      icon={<MenuOutlined />}
                      onClick={this.toggleCollapse}
                      style={{
                        fontSize: "16px",
                        width: 100,
                        height: 40,
                      }}
                    />
                  </Row>
                </Col>
              </Row>
            )}
          </div>

          <Menu
            onClick={this.handleMenuClick}
            className="Menu_margin_top padding_menu"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["/dashboard"]}
            items={[
              {
                key: "/dashboard",
                icon: <AppstoreOutlined />,
                label: "Dashboard",
              },
              {
                key: "/adduser",
                icon: <UserAddOutlined />,
                label: "Add User",
              },
              {
                key: "/settings",
                icon: <SettingOutlined />,
                label: "Settings",
              },
            ]}
          />
          <Row className="aside_margin">
            {collapsed ? (
              <Button
                size="large"
                className="aside_margin bg-black text-light"
                onClick={this.handleLogout}
              >
                <this.IconFont type="icon-tuichu" />
              </Button>
            ) : (
              <Button
                size="large"
                className="aside_margin bg-black text-light"
                onClick={this.handleLogout}
              >
                <this.IconFont type="icon-tuichu" />
                Logout
              </Button>
            )}
          </Row>
        </Sider>

        <Layout className="right_side_layout bg-black">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/edit/:id" element={<AddUser />} />
            <Route path="*" element={<Navigate to={"/dashboard"} />} />
          </Routes>
        </Layout>
      </Layout>

    );
  }
}

const mapStateToProps = (state) => ({
  Name: `${state.token.token.first_name} ${state.token.token.last_name}`,
  Email: state.token.token.email,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect ( mapStateToProps,mapDispatchToProps) (withRouter(PrivateLayout));
