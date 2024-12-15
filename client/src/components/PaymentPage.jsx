import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import { createPaymentRequest, confirmPayment } from 'google-pay';

const PaymentPage = () => {
  const location = useLocation();
  const history = useHistory();
  const orderDetails = location.state?.orderDetails || {};

  useEffect(() => {
    if (!orderDetails.items) {
      message.error('No order details found.');
      history.push('/');
    }
  }, [orderDetails, history]);

  const handlePayment = async () => {
    try {
      const paymentRequest = createPaymentRequest({
        amount: orderDetails.totalPrice,
        currency: 'INR',
        displayItems: [
          {
            label: 'Total',
            amount: orderDetails.totalPrice,
          },
        ],
      });

      const paymentResponse = await confirmPayment(paymentRequest);
      message.success('Payment successful!');
      // Handle successful payment here
      history.push('/');
    } catch (error) {
      message.error('Payment failed. Please try again.');
      // Handle payment error here
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>Payment Page</h1>
      <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>
        Total Price: ₹ {orderDetails.totalPrice}
      </div>
      <Button
        type="primary"
        onClick={handlePayment}
      >
        Pay with Google Pay
      </Button>
    </div>
  );
};

export default PaymentPage;
