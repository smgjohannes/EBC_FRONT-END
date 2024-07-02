import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiBadge, BiMoney } from 'react-icons/bi';
import MembershipTable from './MembershipTable';
import PastoralFundTable from './PastoralFundTable';
import '../style/financeCard.css';

const FinanceCard = ({ filter, filterCriteria }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('http://127.0.0.1:4343/api/v1/payments', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPayments(response.data);
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

  const filteredPayments = payments
    .filter(
      (payment) => filter === 'All' || payment.type === filter.toLowerCase()
    )
    .filter((payment) => {
      if (filterCriteria.date && filterCriteria.id) {
        return (
          payment.date.includes(filterCriteria.date) &&
          payment.id.includes(filterCriteria.id)
        );
      } else if (filterCriteria.date) {
        return payment.date.includes(filterCriteria.date);
      } else if (filterCriteria.id) {
        return payment.id.includes(filterCriteria.id);
      }
      return true;
    });

  // Calculate total amounts for each payment type
  const totals = filteredPayments.reduce((acc, payment) => {
    if (!acc[payment.type]) {
      acc[payment.type] = 0;
    }
    acc[payment.type] += payment.amount;
    return acc;
  }, {});

  const admin_stats = [
    {
      title: 'Pastoral Funds',
      total: totals['pastoralFunds'] || 0,
      icon: <BiBadge />,
    },
    {
      title: 'Membership',
      total: totals['membershipCard'] || 0,
      icon: <BiMoney />,
    },
    {
      title: 'Offering',
      total: totals['offering'] || 0,
      icon: <BiMoney />,
    },
    {
      title: 'Tithe',
      total: totals['tithe'] || 0,
      icon: <BiMoney />,
    },
    {
      title: 'Building Fund',
      total: totals['building fund'] || 0,
      icon: <BiMoney />,
    },
    {
      title: 'Contribution',
      total: totals['contribution'] || 0,
      icon: <BiMoney />,
    },
  ];

  return (
    <div className='card--container'>
      {filter === 'Membership' ? (
        <MembershipTable filterCriteria={filterCriteria} />
      ) : filter === 'Pastoral Funds' ? (
        <PastoralFundTable filterCriteria={filterCriteria} />
      ) : (
        admin_stats.map((item, index) => (
          <div className='card-finance' key={index}>
            <div className='card--cover'>{item.icon}</div>
            <div className='card--title'>
              <h2>{item.title}</h2>
              <p className='card--title__paragraph'>
                {item.total !== undefined ? item.total : 'N/A'}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FinanceCard;
