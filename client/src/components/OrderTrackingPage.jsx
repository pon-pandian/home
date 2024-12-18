import React, { useState, useEffect } from 'react';
import { Card, message } from 'antd';
import { useLocation } from 'react-router-dom';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 12.9716,
  lng: 77.5946,
};

const locations = [
  { name: "Chennai", position: { lat: 13.0827, lng: 80.2707 } },
  { name: "Coimbatore", position: { lat: 11.0168, lng: 76.9558 } },
  { name: "Madurai", position: { lat: 9.9252, lng: 78.1198 } },
  { name: "Erode", position: { lat: 11.3410, lng: 77.7172 } },
];

const OrderTrackingPage = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(location.state?.orderDetails || JSON.parse(localStorage.getItem('orderDetails')));
  const [status, setStatus] = useState('Out for Delivery');

  useEffect(() => {
    if (orderDetails) {
      const timer = setTimeout(() => {
        setStatus('Delivered');
        message.success('Order has been delivered!');
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [orderDetails]);

  if (!orderDetails) {
    return <div>No order details available.</div>;
  }

  const statusStyle = {
    color: status === 'Out for Delivery' ? 'red' : 'green',
  };

  const deliveryLocationMarker = locations.find(
    loc => loc.name.toLowerCase() === orderDetails.deliveryLocation.toLowerCase()
  );

  return (
    <div style={{ padding: '24px' }}>
      <h1>Order Tracking</h1>
      <Card>
        <p><strong>Total Amount:</strong> ₹ {orderDetails.totalPrice}</p>
        <p><strong>Payment Status:</strong> Paid</p>
        <p><strong>Tracking Status:</strong> <span style={statusStyle}>{status}</span></p>
        <p><strong>Delivery Location:</strong> {orderDetails.deliveryLocation}</p>
      </Card>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY_MAP}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={7}
        >
          {locations.map((location) => (
            <Marker key={location.name} position={location.position} label={location.name} />
          ))}
          {deliveryLocationMarker && (
            <Marker
              position={deliveryLocationMarker.position}
              label={`Delivery: ${deliveryLocationMarker.name}`}
              icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default OrderTrackingPage;
