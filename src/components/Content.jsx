import React from 'react';
import ContentHeader from './ContentHeader';
import Card from './Card';

import MemberList from './MemberList';
import '../style/content.css';
const Content = () => {
  return (
    <div className='content'>
      <ContentHeader />
      <Card />
      <MemberList />
    </div>
  );
};

export default Content;
