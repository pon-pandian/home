import React, { useEffect, useState } from 'react';
import { Table, Button, message, Modal, Form, Input } from 'antd';
import axios from 'axios';

const SuperAdminUser = () => {
const [users, setUsers] = useState([]);
const [isModalVisible, setIsModalVisible] = useState(false);
const [editingUser, setEditingUser] = useState(null);

useEffect(() => {
fetchUserData();
}, []);

const fetchUserData = () => {
axios.get('http://localhost:5000/api/users')
.then(response => {
setUsers(response.data);
})
.catch(error => {
message.error('Error fetching user data.');
});
};

const handleDelete = (id) => {
axios.delete(`http://localhost:5000/api/users/${id}`)
.then(() => {
message.success('User deleted successfully!');
fetchUserData();
})
.catch(error => {
message.error('Error deleting user.');
});
};

const showEditModal = (user) => {
setEditingUser(user);
setIsModalVisible(true);
};

console.log(editingUser)

const handleEdit = (values) => {
axios.put(`http://localhost:5000/api/users/${editingUser._id}`, values)
.then(response => {
message.success('User details updated successfully!');
setIsModalVisible(false);
fetchUserData();
})
.catch(error => {
message.error('Error updating user details.');
});
};

const columns = [
{
title: 'Name',
dataIndex: 'name',
key: 'name',
},
{
title: 'Email',
dataIndex: 'email',
key: 'email',
},
{
title: 'Phone',
dataIndex: 'phone',
key: 'phone',
},
{ title: 'Password', dataIndex: 'password', key: 'password', },
{
title: 'Actions',
key: 'actions',
render: (text, record) => (
<div>
<Button type="link" onClick={() => showEditModal(record)}>Edit</Button>
<Button type="link" onClick={() => handleDelete(record._id)}>Delete</Button>
</div>
),
},
];

return (
<div style={{ padding: '24px' }}>
<Table dataSource={users} columns={columns} rowKey="_id" />

{editingUser && (
<Modal
title="Edit User Details"
visible={isModalVisible}
onCancel={() => setIsModalVisible(false)}
footer={null}
destroyOnClose
>
<Form
initialValues={editingUser}
onFinish={handleEdit}
>
<Form.Item name="name" label="Name" rules={[{ required: true }]}>
<Input />
</Form.Item>
<Form.Item name="email" label="Email" rules={[{ required: true }]}>
<Input />
</Form.Item>
<Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
<Input />
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

export default SuperAdminUser;















