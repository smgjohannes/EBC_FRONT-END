import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Dashboard from './components/Dashboard';
import ChurchMembers from './components/ChurchMembers';
import Login from './components/Login';
import CreateMembers from './pages/createMember/Create.Member';
import UpdateMember from './pages/updateMember/UpdateMember';
import IndividualPayments from './pages/individualPayments/FinanceDetailsOfMember';
import FinanceMainPage from './pages/financeMainPage/FinanceMainPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/financepage'
          element={
            <PrivateRoute>
              <FinanceMainPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/churchmembers'
          element={
            <PrivateRoute>
              <ChurchMembers />
            </PrivateRoute>
          }
        />
        <Route
          path='/createmember'
          element={
            <PrivateRoute>
              <CreateMembers />
            </PrivateRoute>
          }
        />
        <Route
          path='/updateMember/:id'
          element={
            <PrivateRoute>
              <UpdateMember />
            </PrivateRoute>
          }
        />
        <Route
          path='/individualpayments'
          element={
            <PrivateRoute>
              <IndividualPayments />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
