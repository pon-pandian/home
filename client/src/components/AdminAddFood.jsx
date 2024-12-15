import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useHistory  } from 'react-router-dom';

const AdminAddFood = () => {

const history = useHistory();
const [form] = Form.useForm();
const [fileList, setFileList] = useState([]);

const handleSubmit = (values) => {

const formData = new FormData();
formData.append('restaurant', values.restaurant);
formData.append('location', values.location);
formData.append('food', values.food);
formData.append('price', values.price);
if (fileList.length > 0) {
formData.append('image', fileList[0].originFileObj);
} else {
return message.error('Please upload an image.');
}

axios.post('http://localhost:5000/api/food', formData, {
headers: {
'Content-Type': 'multipart/form-data',
},
})
.then(response => {
form.resetFields();
setFileList([]);
history.push('/admin-dashboard');
message.success('Food item added successfully!');
})
.catch(error => {
message.error('Error adding food item.');
});
};

const handleUpload = ({ fileList }) => {
setFileList(fileList.slice(-1));
};

return (
<div style={{ padding: '24px' }}>
<Form form={form} layout="vertical" onFinish={handleSubmit}>
<Form.Item name="restaurant" label="Restaurant Name" rules={[{ required: true }]} >
<Input />
</Form.Item>
<Form.Item name="location" label="Location" rules={[{ required: true }]}>
<Input />
</Form.Item>
<Form.Item name="food" label="Food" rules={[{ required: true }]}>
<Input />
</Form.Item>
<Form.Item name="price" label="Price" rules={[{ required: true }]}>
<Input />
</Form.Item>
<Form.Item name="image" label="Image" rules={[{ required: true }]}>
<Upload fileList={fileList} onChange={handleUpload} beforeUpload={() => false} maxCount={1}>
<Button icon={<UploadOutlined />}>Upload</Button>
</Upload>
</Form.Item>
<Form.Item>
<Button type="primary" htmlType="submit">Add Food</Button>
</Form.Item>
</Form>
</div>
);
};

export default AdminAddFood;
