import React, { useEffect, useState } from 'react';
import { List, Button, Input, Form, message } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

const OrderPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [deliveryLocation, setDeliveryLocation] = useState(localStorage.getItem('deliveryLocation') || '');
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : location.state?.cart || [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('deliveryLocation', deliveryLocation);
  }, [deliveryLocation]);

  const handleOrderConfirmation = () => {
    const totalPrice = calculateTotalPrice();

    if (!deliveryLocation) {
      message.error('Please input your delivery location!');
      return;
    }

    if (totalPrice < 100) {
      message.error('Minimum order amount is ₹100.');
      return;
    }

    const orderDetails = {
      items: cart,
      deliveryLocation,
      totalPrice,
      orderDate: new Date(),
    };

    axios.post('http://localhost:5000/api/orders', orderDetails)
      .then(response => {
        message.success('Order confirmed successfully!');
        localStorage.removeItem('cart');
        localStorage.removeItem('deliveryLocation');
        history.push('/payment', { orderDetails });
      })
      .catch(error => {
        message.error('Error confirming order.');
      });
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>Order Confirmation</h1>
      <List
        dataSource={cart}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.food}
              description={`Price: ₹ ${item.price}`}
            />
            <div>Quantity: {item.quantity}</div>
            <div>Total: ₹ {item.price * item.quantity}</div>
          </List.Item>
        )}
      />
      <div style={{ marginTop: '16px', fontWeight: 'bold' }}>
        Total Price: ₹ {calculateTotalPrice()}
      </div>
      <Form
        onFinish={handleOrderConfirmation}
        style={{ marginTop: '16px' }}
      >
        <Form.Item
          label="Delivery Location"
          rules={[{ required: true, message: 'Please input your delivery location!' }]}
        >
          <Input
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Confirm Order
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderPage;
