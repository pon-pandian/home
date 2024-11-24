import React, { Component } from "react";
import { Row, Col, Form, Input, Button, notification } from "antd";
import { Link, Navigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navigateToLogin: false,
    };
    this.formRef = React.createRef();
  }

  handleSubmit = async (values) => {
    await axios
      .post("http://node.mitrahsoft.co.in/register", {
        first_name: values.FirstName,
        last_name: values.LastName,
        email: values.Email,
        password: values.Password,
      })
      .then((success) => success.data)
      .then((content) => {
        if (content === "Admin created successfully") {
          notification.success({
            message: "Success",
            description: "Registration success",
          });
          this.setState({ navigateToLogin: true });
        } else {
          notification.error({
            message: "Error",
            description: "User already exists!",
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: error,
        });
      });
  };

  render() {

    if (this.state.navigateToLogin) {
      return <Navigate to="/" />;
    }

    return (
      <React.Fragment>
        <Row className="bg-black flex_center register_outer_box">
          <Col span={23} className="bg-pink register_box">
            <Row className="flex_center">
              <Col span={8} className="bg-pink">
                <p className="fs-4 fw-bold text-center">REGISTER</p>
                <Form
                  ref={this.formRef}
                  name="validateOnly"
                  layout="vertical"
                  autoComplete="off"
                  className="fw-bold"
                  onFinish={this.handleSubmit}
                >
                  <Form.Item
                    name="FirstName"
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: "First Name is Required",
                      },
                      {
                        pattern: /^[A-Za-z ]*$/,
                        message: "Enter alphabets only",
                      },
                    ]}
                  >
                    <Input className="border-0" size="large" />
                  </Form.Item>

                  <Form.Item
                    name="LastName"
                    label="Last Name"
                    rules={[
                      {
                        required: true,
                        message: "Last Name is Required",
                      },
                      {
                        pattern: /^[A-Za-z ]*$/,
                        message: "Enter alphabets only",
                      },
                    ]}
                  >
                    <Input className="border-0" size="large" />
                  </Form.Item>

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
                    <Input className="border-0 fs-5" />
                  </Form.Item>

                  <Form.Item
                    name="Password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                      },
                      {
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                        message:
                          "Password must be min 1-symbol 1-caps 1-small 1-number 0-space",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["Password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("Password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      className="border-0"
                      size="large"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      size="large"
                      className="button_bottom bg-black text-light fw-bold"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
                <p className="fs-6 fw-bold text-center box_bottom">
                  Already have an account? <Link to="/">sign in</Link>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Register;