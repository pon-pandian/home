import React from 'react';
import { Select, Form } from 'antd';

const City = () => (

  <Form.Item
                  name="City"
                  label="City"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
  <Select
    showSearch
    size="large"
    style={{
      width: "100%",
    }}
    optionFilterProp="label"
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={[
      {
        value: 'Coimbatore',
        label: 'Coimbatore',
      },
      {
        value: 'Mumbai',
        label: 'Mumbai',
      },
      {
        value: 'Banglore',
        label: 'Banglore',
      },
      {
        value: 'Hydrabad',
        label: 'Hydrabad',
      },
      {
        value: 'Kochin',
        label: 'Kochin',
      },
      {
        value: 'Delhi',
        label: 'Delhi',
      },
      {
        value: 'Chennai',
        label: 'Chennai',
      },
    ]}
  />
</Form.Item>
  
);
export default City;