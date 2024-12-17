import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import {  Link, useHistory  } from 'react-router-dom';
import axios from "axios";

const Register = () => {

  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/register", values);
      message.success(data.message);
      history.push('/signin');
    } catch (error) {
      message.error(error.response.data.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Name is Required"
          },
          {
            pattern: /^([a-zA-Z'-.]+(?: [a-zA-Z'-.]+)?)$/,
            message: "Enter Alphabets Only"
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
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
      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          { required: true, 
            message: "Phone Number is Required" },

          { pattern: /^[0-9]{10}$/, message: "Phone Number must be 10 digits!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
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
        Register
      </Button>
    </Form>
  );
};

export default Register;
