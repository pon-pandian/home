import React from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button, Form, message } from 'antd';
import { useHistory } from 'react-router-dom';

const stripePromise = loadStripe('');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const handleSubmit = async () => {
   
    const loadingMessage = message.loading('Processing Payment...', 0);

    if (!stripe || !elements) {
      loadingMessage();
      return;
    }

   
    setTimeout(() => {
      loadingMessage(); 
      message.success('Payment successful!');
      history.push('/order-tracking'); 
    }, 5000);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Card Details">
        <CardElement />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={!stripe || !elements}>
          Pay Now
        </Button>
      </Form.Item>
    </Form>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <div style={{ padding: '24px' }}>
      <h1>Payment</h1>
      <PaymentForm />
    </div>
  </Elements>
);

export default PaymentPage;
