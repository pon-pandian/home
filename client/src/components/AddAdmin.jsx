import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import {  Link, useHistory  } from 'react-router-dom';

const AddAdmin = () => {

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/register-admin",
        values,
        { withCredentials: true }
      );
      message.success(data.message);
      history.push('/super-admin-dashboard');
    } catch (error) {
      message.error(error.response.data.message || "Admin registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Add Admin</h3>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Admin Email"
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
          label="Admin Password"
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
          Register Admin
        </Button>
      </Form>
    </div>
  );
};

export default AddAdmin;
