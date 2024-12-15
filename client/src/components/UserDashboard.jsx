import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, List, Input, InputNumber, message } from 'antd';
import axios from 'axios';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const UserDashboard = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:5000/api/foods')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    if (existingItem) {
      const updatedCart = cart.map(cartItem =>
        cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    message.success('Item added to cart');
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(cartItem => cartItem._id !== id);
    setCart(updatedCart);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    const updatedCart = cart.map(cartItem =>
      cartItem._id === id ? { ...cartItem, quantity } : cartItem
    );
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const confirmOrder = () => {
    if (cart.length === 0) {
         message.warning('Your cart is empty. Please add items to your cart before confirming the order.');
        } 
        else{
            history.push('/order', { cart });
        }
   
  
  };

  const filteredData = data.filter(item =>
    item.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.food.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.price.toString().includes(searchQuery)
  );

  return (
    <div style={{ padding: '24px' }}>
      <div className="h1">Order food online in Tamil Nadu</div>
      <Input
        placeholder="Search by restaurant, location, food, or price"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: '16px' }}
        icon={<ShoppingCartOutlined />}
      >
        View Cart
      </Button>
      <div className="row">
        {filteredData.map((item) => (
          <Card
            className="col-3 m-2 mw-100"
            style={{ width: '280px' }}
            key={item._id}
            title={item.restaurant}
            cover={<img alt={item.food} src={`http://localhost:5000/${item.image}`} width={100} height={200} />}
            actions={[<Button onClick={() => addToCart(item)}>Add to Cart</Button>]}
          >
            <p className="fw-bold">{item.location}</p>
            <p>{item.food}</p>
            <p>₹ {item.price}</p>
          </Card>
        ))}
      </div>

      <Modal
        title="Your Cart"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="confirm" type="primary" onClick={confirmOrder}>
            Confirm Order
          </Button>,
        ]}
      >
        <List
          dataSource={cart}
          renderItem={item => (
            <List.Item
              actions={[
                <Button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</Button>,
                <InputNumber
                  min={1}
                  value={item.quantity}
                  onChange={(value) => updateQuantity(item._id, value)}
                />,
                <Button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</Button>,
                <Button type="link" onClick={() => removeFromCart(item._id)}>Remove</Button>
              ]}
            >
              <List.Item.Meta
                title={item.food}
                description={`Price: ₹ ${item.price}`}
              />
              <div>Total: ₹ {item.price * item.quantity}</div>
            </List.Item>
          )}
        />
        <div style={{ marginTop: '16px', fontWeight: 'bold' }}>
          Total Price: ₹ {calculateTotalPrice()}
        </div>
      </Modal>
    </div>
  );
};

export default UserDashboard;
