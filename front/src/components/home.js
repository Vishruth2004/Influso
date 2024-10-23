import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You need to log in first.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/home', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response ? error.response.data : 'Server error');
      }
    };

    fetchData();
  }, []);

  return <div><b>{message}</b></div>;
};

export default Home;
