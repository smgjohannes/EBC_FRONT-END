import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Dashboard from './components/Dashboard';
import ChurchMembers from './components/ChurchMembers';
import Login from './components/Login';
import CreateMembers from './pages/createMember/Create.Member';
import UpdateMember from './pages/updateMember/UpdateMember';
import IndividualPayments from './pages/individualPayments/FinanceDetailsOfMember';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/churchmembers' element={<ChurchMembers />} />
        <Route path='/createmember' element={<CreateMembers />} />
        <Route path='/updateMember/:id' element={<UpdateMember />} />
        <Route path='/individualpayments' element={<IndividualPayments />} />
      </Routes>
    </Router>
  );
};

export default App;
