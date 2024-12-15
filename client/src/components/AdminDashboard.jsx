import React, { useEffect, useState } from 'react';
import { Card, Button, message, Modal, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const AdminDashboard = () => {
const [data, setData] = useState([]);
const [isModalVisible, setIsModalVisible] = useState(false);
const [editingItem, setEditingItem] = useState(null);
const [fileList, setFileList] = useState([]);

useEffect(() => {
fetchFoodData();
}, []);

const fetchFoodData = () => {
axios.get('http://localhost:5000/api/foods')
.then(response => {
setData(response.data);
})
.catch(error => {
message.error('Error fetching food data.');
});
};

const handleDelete = (id) => {
axios.delete(`http://localhost:5000/api/food/${id}`)
.then(() => {
message.success('Food item deleted successfully!');
fetchFoodData();
})
.catch(error => {
message.error('Error deleting food item.');
});
};

const showEditModal = (item) => {
setEditingItem(item);
setFileList([{
uid: '-1',
name: item.image.split('/').pop(),
status: 'done',
url: `http://localhost:5000/${item.image}`,
}]);
setIsModalVisible(true);
};

const handleEdit = (values) => {
const formData = new FormData();
formData.append('restaurant', values.restaurant);
formData.append('location', values.location);
formData.append('food', values.food);
formData.append('price', values.price);
if (fileList.length > 0 && fileList[0].originFileObj) {
formData.append('image', fileList[0].originFileObj);
} else {
formData.append('image', editingItem.image);
}

axios.patch(`http://localhost:5000/api/food/${editingItem._id}`, formData)
.then(response => {
message.success('Food item updated successfully!');
setIsModalVisible(false);
fetchFoodData();
})
.catch(error => {
message.error('Error updating food item.');
});
};

const handleUpload = ({ fileList }) => {
setFileList(fileList.slice(-1));
};

return (
<div className="row " style={{ padding: '24px' }}>
{data.map((item) => (
<Card
className="col-3 m-2 mw-100"
style={{width: '280px'}}
key={item._id}
title={item.restaurant}
cover={<img alt={item.food} src={`http://localhost:5000/${item.image}`} width={100} height={200} />}
extra={
<>
<Button type="link" onClick={() => showEditModal(item)}>Edit</Button>
<Button type="link" onClick={() => handleDelete(item._id)}>Delete</Button>
</>
}
>
<p>{item.location}</p>
<p>{item.food}</p>
<p>{item.price}</p>
</Card>
))}

{editingItem && (
<Modal
title="Edit Food Item"
visible={isModalVisible}
onCancel={() => setIsModalVisible(false)}
footer={null}
destroyOnClose
>
<Form
initialValues={editingItem}
onFinish={handleEdit}
>
<Form.Item name="restaurant" label="Restaurant Name" rules={[{ required: true }]}>
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
<Form.Item name="image" label="Image">
<Upload fileList={fileList} onChange={handleUpload} beforeUpload={() => false} maxCount={1}>
<Button icon={<UploadOutlined />}>Upload</Button>
</Upload>
</Form.Item>
<Form.Item>
<Button type="primary" htmlType="submit">Save</Button>
</Form.Item>
</Form>
</Modal>
)}
</div>
);
};

export default AdminDashboard;