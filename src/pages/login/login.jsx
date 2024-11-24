import React, { Component } from "react";
import { Row, Col, Form, Input, Button, notification } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction } from "../../redux/actionCreator/actionCreator";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  show = async (values) => {
    const { Email, Password } = values;
    axios
      .post("http://node.mitrahsoft.co.in/login", {
        email: Email,
        password: Password,
      })
      .then((success) => success.data)
      .then((content) => {
        const token = content;
        notification.success({
          message: "Success",
          description: "Login success",
        });
        this.props.dispatch(loginAction(token));
        this.props.history.push("/dashboard");
      })
      .catch((error) => {
        if (error.response)
          notification.error({
            message: "Error",
            description: "Invalid Credentials",
          });
      });
  };

  render() {

    return (
      <React.Fragment>
        <Row className="bg-black flex_center login_outer_box">
          <Col span={6} className="bg-pink login_box">
            <Row className="flex_center">
              <Col span={15} className="bg-pink">
                <h4 className="fw-bold text-center">LOGIN</h4>
                <Form
                  name="validateOnly"
                  layout="vertical"
                  className="fw-bold"
                  onFinish={this.show}
                >
                  <Form.Item
                    name="Email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Enter an Email",
                      },
                      {
                        pattern: /\w+[@][\w]+\.com/,
                        message: "Enter a valid Email",
                      },
                    ]}
                  >
                    <Input
                      className="border-0"
                      size="large"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </Form.Item>
                  <Form.Item
                    name="Password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      className="border-0"
                      size="large"
                      type="password"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      size="large"
                      className="bg-black text-light"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
                <p className="fw-bold text-center box_bottom">
                  Don't have an account? <Link to="/register">sign up</Link>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );

  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default connect(null, mapDispatchToProps)(Login);