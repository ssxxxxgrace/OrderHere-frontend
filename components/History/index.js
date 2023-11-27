import React from 'react';
import Nav from './nav';
import History from './history';
import Background from './background';

const OrderHistory = () => {
  return (
    <div className="combine">
      <Background />
      <Nav />
      <History />
    </div>
  );
};

export default OrderHistory;
