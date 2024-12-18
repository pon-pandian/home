// import React from 'react';
// import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { Button, Form, message } from 'antd';
// import { useHistory } from 'react-router-dom';

// const stripePromise = loadStripe('process.env.REACT_APP_API_KEY_PAYMENT');

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const history = useHistory();

//   const handleSubmit = async () => {
   
//     const loadingMessage = message.loading('Processing Payment...', 0);

//     if (!stripe || !elements) {
//       loadingMessage();
//       return;
//     }

   
//     setTimeout(() => {
//       loadingMessage(); 
//       message.success('Payment successful!');
//       history.push('/order-tracking'); 
//     }, 5000);
//   };

//   return (
//     <Form onFinish={handleSubmit}>
//       <Form.Item label="Card Details">
//         <CardElement />
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit" disabled={!stripe || !elements}>
//           Pay Now
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// const PaymentPage = () => (
//   <Elements stripe={stripePromise}>
//     <div style={{ padding: '24px' }}>
//       <h1>Payment</h1>
//       <PaymentForm />
//     </div>
//   </Elements>
// );

// export default PaymentPage;

import React, { useState } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button, Form, message } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const loadingMessage = message.loading('Processing Payment...', 0);

    if (!stripe || !elements) {
      loadingMessage();
      return;
    }

    try {
      const { data: { clientSecret } } = await axios.post('http://localhost:5000/create-payment-intent', {
        amount: 5000, 
      });

      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        loadingMessage();
        message.error('Payment failed: ' + error.message);
      } else if (paymentIntent.status === 'succeeded') {
        loadingMessage(); 
        message.success('Payment successful!');
        history.push('/order-tracking'); 
      }
    } catch (error) {
      loadingMessage();
      message.error('Payment failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Card Details">
        <CardElement />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={!stripe || !elements || loading}>
          {loading ? 'Processing Payment...' : 'Pay Now'}
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
