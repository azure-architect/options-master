import React from 'react';
import OCCSymbolForm from '../components/OCCSymbolForm';

const OCCSymbolPage = () => {
  const handleSubmit = (data) => {
    console.log('Generated Symbol:', data);
    // Add your submission logic here
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">OCC Option Symbol Generator</h1>
      <OCCSymbolForm onSubmit={handleSubmit} />
    </div>
  );
};

export default OCCSymbolPage;
