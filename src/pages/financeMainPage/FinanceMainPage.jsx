import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import FinanceCard from '../../components/FinanceCard';
import Navbar from '../../components/Navbar';
import '../../style/financeMainPage.css';

const tabs = [
  'All',
  'Membership',
  'Pastoral Funds',
  'Offering',
  'Tithe',
  'Building Fund',
  'Contribution',
];

const FinanceMainPage = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [filterCriteria, setFilterCriteria] = useState({ date: '', id: '' });

  return (
    <div className='dashboard'>
      <Sidebar />

      <div className='finance-dashboard--content'>
        <Navbar
          tabs={tabs}
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          onFilterChange={setFilterCriteria}
        />
        <FinanceCard filter={selectedTab} filterCriteria={filterCriteria} />
      </div>
    </div>
  );
};

export default FinanceMainPage;
