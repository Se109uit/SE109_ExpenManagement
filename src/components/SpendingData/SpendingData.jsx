import React from 'react';

const SpendingData = ({ spending }) => {
  return (
    <div>
      <p>Date: {spending.date.toDate().toLocaleDateString()}</p>
      <p>Money: {spending.money}</p>
      <p>Type: {spending.type}</p>
    </div>
  );
};

export default SpendingData;

