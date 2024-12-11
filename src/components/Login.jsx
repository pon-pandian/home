import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import {  Link, useHistory  } from 'react-router-dom';
import { loginAction } from '../redux/actionCreator/actionCreator'

const Login = ({ setRole }) => {

    const dispatch = useDispatch();
    const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await axios.post("http://localhost:5000/api/login", values, { withCredentials: true });
      message.success("Login successful!");
      setRole(data.data.role);
      const token = data;
      console.log("token",token)
      history.push('/user-dashboard');
      dispatch(loginAction());

    } catch (error) {
      message.error(error.response.data.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email!" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Login
      </Button>
    </Form>
  );
};

export default Login;
