import React from 'react';
import MarketIndicators from '../components/MarketIndicators';

const HomePage = () => {

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Home</h1>
      <MarketIndicators />
    </div>
  );
};

export default HomePage;