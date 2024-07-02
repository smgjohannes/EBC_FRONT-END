import React, { useState } from 'react';
import '../style/navbar.css';
import '../style/churchMember.css';
import { Link } from 'react-router-dom';
const Navbar = ({ tabs, selectedTab, onSelectTab, onFilterChange }) => {
  const [filter, setFilter] = useState({ date: '', id: '' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilter = { ...filter, [name]: value };
    setFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <div className='navbar'>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`nav-tab ${selectedTab === tab ? 'active' : ''}`}
          onClick={() => onSelectTab(tab)}>
          {tab}
        </button>
      ))}
      <div className='filter'>
        <input
          type='date'
          name='date'
          value={filter.date}
          onChange={handleFilterChange}
          placeholder='Filter by Date'
        />
        <input
          type='text'
          name='id'
          value={filter.id}
          onChange={handleFilterChange}
          placeholder='Filter by ID'
        />
        <Link to={`/individualpayments`} className='payment-button'>
          Add Payments
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
