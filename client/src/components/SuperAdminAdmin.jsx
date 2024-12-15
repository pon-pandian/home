import React, { useEffect, useState } from 'react';
import { Table, Button, message, Modal, Form, Input } from 'antd';
import axios from 'axios';

const SuperAdminAdmin = () => {
const [admins, setAdmins] = useState([]);
const [isModalVisible, setIsModalVisible] = useState(false);
const [editingAdmin, setEditingAdmin] = useState(null);

useEffect(() => {
fetchAdminData();
}, []);

const fetchAdminData = () => {
axios.get('http://localhost:5000/api/admins')
.then(response => {
setAdmins(response.data);
})
.catch(error => {
message.error('Error fetching admin data.');
});
};

const handleDelete = (id) => {
axios.delete(`http://localhost:5000/api/admins/${id}`)
.then(() => {
message.success('Admin deleted successfully!');
fetchAdminData();
})
.catch(error => {
message.error('Error deleting admin.');
});
};

const showEditModal = (admin) => {
setEditingAdmin(admin);
setIsModalVisible(true);
};

const handleEdit = (values) => {
axios.put(`http://localhost:5000/api/admins/${editingAdmin._id}`, values)
.then(response => {
message.success('Admin details updated successfully!');
setIsModalVisible(false);
fetchAdminData();
})
.catch(error => {
message.error('Error updating admin details.');
});
};

const columns = [
{
title: 'Email',
dataIndex: 'email',
key: 'email',
},
{ 
title: 'Password', 
dataIndex: 'password',
key: 'password', },
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
<Table dataSource={admins} columns={columns} rowKey="_id" />

{editingAdmin && (
<Modal
title="Edit Admin Details"
visible={isModalVisible}
onCancel={() => setIsModalVisible(false)}
footer={null}
destroyOnClose
>
<Form
initialValues={editingAdmin}
onFinish={handleEdit}
>
<Form.Item name="email" label="Email" rules={[{ required: true }]}>
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

export default SuperAdminAdmin;



















