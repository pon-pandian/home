import React, { useEffect, useState } from 'react';
import { Card, message, Input } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ScrollAnimationPage from '../components/ScrollAnimation';
import LoadingPage from '../components/LoadingPage';

const Foods = () => {
  const [data, setData] = useState([]);
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

  const filteredData = data.filter(item =>
    item.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.food.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.price.toString().includes(searchQuery)
  );

  return (
    <>
     <LoadingPage />
      {/* <ScrollAnimationPage /> */}
      <div className="h1">Order food online in Tamil Nadu</div>
      <Input
        placeholder="Search by restaurant, location, food, or price"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <div className="row" style={{ padding: '24px' }}>
        {filteredData.map((item) => (
          <Card
            className="col-3 m-2 mw-100"
            style={{ width: '280px' }}
            key={item._id}
            title={item.restaurant}
            cover={<img alt={item.food} src={`http://localhost:5000/${item.image}`} width={100} height={200} />}
            onClick={() => {
              history.push('/signin');
              message.error("Authentication is required. You need to sign in with your credentials!");
            }}
          >
            <p className="fw-bold">{item.location}</p>
            <p>{item.food}</p>
            <p>₹ {item.price}</p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Foods;
