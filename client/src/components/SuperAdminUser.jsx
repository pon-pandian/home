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
<Form.Item name="name" label="Name"   rules={[
          {
            required: true,
            message: "Name is Required"
          },
          {
            pattern: /^([a-zA-Z'-.]+(?: [a-zA-Z'-.]+)?)$/,
            message: "Enter Alphabets Only"
          }
        ]}>
<Input />
</Form.Item>
<Form.Item name="email" label="Email"
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
<Form.Item name="phone" label="Phone" 
rules={[
          { required: true, 
            message: "Phone Number is Required" },

          { pattern: /^[0-9]{10}$/, message: "Phone Number must be 10 digits!" },
        ]}
>
<Input />
</Form.Item>
<Form.Item name="password" label="Password" 
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















