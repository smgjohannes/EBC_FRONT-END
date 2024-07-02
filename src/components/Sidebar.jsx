import React from 'react';
import {
  BiBookAlt,
  BiHelpCircle,
  BiHome,
  BiListUl,
  BiMessage,
  BiStats,
} from 'react-icons/bi';
import '../style/sidebar.css';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className='menu'>
      <div className='logo'>
        <BiBookAlt className='icon' />

        <h2>Otjomuise EBC</h2>
      </div>
      <div className='menu--list'>
        <Link to='/dashboard' href='#' className='item active'>
          <BiHome className='icon' />
          Dashboard
        </Link>
        <Link to='/churchmembers' className='item'>
          <BiListUl className='icon' />
          Member list
        </Link>
        <Link to='/financepage' className='item'>
          <BiStats className='icon' />
          Finance
        </Link>
        <a href='#' className='item'>
          <BiStats className='icon' />
          Stats
        </a>
        <a href='#' className='item'>
          <BiMessage className='icon' />
          Message
        </a>
        <a href='#' className='item'>
          <BiHelpCircle className='icon' />
          Help
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
