import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {  Link, useHistory  } from 'react-router-dom';
import { loginAction } from '../redux/actionCreator/actionCreator'

const Login = ({ setRole }) => {

  const Selector = useSelector((item) => item);
  const { login , token } = Selector;
  console.log("login-dash",Selector)
    const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {

      const data = await axios.post("http://localhost:5000/api/login", values, { withCredentials: true });
      message.success("Login successful!");
      setRole(data.data.role);

      const token = data.data;
      console.log("token -->",token)
      
      dispatch(loginAction(token));

    } catch (error) {
      message.error(error.response.data.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Email" name="email" 
       rules={[
                      {
                        required: true,
                        message: "Email is Required"
                      },
                      {
                        type: "email",
                        pattern:/\w+[@][\w]+\.com/,
                        message: "Enter a Valid Email"
                      }
                    ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" 
        rules={[
                 {
                   required: true,
                    message: "Password is Required"
                 },
                 {
                   pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                   message: "Password must be min 1-symbol 1-caps 1-small 1-number 0-space 8-length"
                 }
               ]}
              >
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Login
      </Button>
    </Form>
  );
};

export default Login;
