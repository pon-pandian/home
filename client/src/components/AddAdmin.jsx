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
            { required: true, message: "Please enter the admin's email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Admin Password"
          name="password"
          rules={[{ required: true, message: "Please enter the admin's password!" }]}
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
