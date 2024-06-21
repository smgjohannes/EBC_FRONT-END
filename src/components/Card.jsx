import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiBadge, BiMoney } from 'react-icons/bi';

const Card = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('http://127.0.0.1:4343/api/v1/members', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMembers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const admin_stats = [
    {
      title: 'Members',
      total: members.length,
      icon: <BiBadge />,
    },
    {
      title: 'Financial',
      icon: <BiMoney />,
    },
  ];

  return (
    <div className='card--container'>
      {admin_stats.map((item, index) => (
        <div className='card' key={index}>
          <div className='card--cover'>{item.icon}</div>
          <div className='card--title'>
            <h2>{item.title}</h2>
            <p className='card--title__paragraph'>
              {item.total !== undefined ? item.total : 'N/A'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
