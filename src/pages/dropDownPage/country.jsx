import React from "react";
import { Select, Form } from "antd";

const Country = () => (
  <Form.Item
    name="Country"
    label="Country"
    rules={[
      {
        required: true,
      },
    ]}
  >
    <Select
      showSearch
      size="large"
      style={{
        width: "88%",
      }}
      optionFilterProp="value"
      filterSort={(optionA, optionB) =>
        (optionA?.value ?? "")
          .toLowerCase()
          .localeCompare((optionB?.value ?? "").toLowerCase())
      }
      options={[
        {
          value: 'India',
          label: "India", 
        },
        {
          value: 'Bangladesh',
          label: "Bangladesh", 
        },
        {
          value: 'Pakistan',
          label: "Pakistan", 
        },
        {
          value: 'Srilanka',
          label: "Srilanka", 
        },
        {
          value: 'Nepal',
          label: "Nepal", 
        },
        {
          value: 'China',
          label: "China", 
        },
      ]}
    />
  </Form.Item>
);

export default Country;
