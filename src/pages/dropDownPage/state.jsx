import React from "react";
import { Select, Form } from "antd";

const State = () => (
  <Form.Item name="State" label="State" rules={[]}>
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
          value: "Tamilnadu",
          label: "Tamilnadu",
        },
        {
          value: "Delhi",
          label: "Delhi",
        },
        {
          value: "Maharastra",
          label: "Maharastra",
        },
        {
          value: "Karnataka",
          label: "Karnataka",
        },
        {
          value: "Kerala",
          label: "Kerala",
        },
        {
          value: "Andra Pradesh",
          label: "Andra Pradesh",
        },
      ]}
    />
  </Form.Item>
);

export default State;
