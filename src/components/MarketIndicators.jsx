import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { BarChart2, TrendingUp, Activity } from 'lucide-react';

const MarketIndicators = () => {
  const [healthData, setHealthData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://192.168.254.123:8000/health');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHealthData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching health data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
    const interval = setInterval(fetchHealthData, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderHealthData = () => {
    if (loading) {
      return <p className="text-sm text-gray-500 dark:text-gray-400">Loading health data...</p>;
    }
    if (error) {
      return (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>Error: {error}</AlertDescription>
        </Alert>
      );
    }
    if (healthData) {
      return (
        <div className="mt-2">
          <p className="text-sm font-medium">
            Status: {' '}
            <span className={`${
              healthData.status === 'healthy' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {healthData.status}
            </span>
          </p>
          {healthData.message && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {healthData.message}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const indicators = [
    {
      title: 'Fear & Greed Index',
      icon: <BarChart2 className="w-6 h-6" />,
      url: 'https://www.cnn.com/markets/fear-and-greed',
      description: 'CNN Market Fear & Greed Index',
      showHealth: true // Flag to show health data in this card
    },
    {
      title: 'Coin Market Cap Bitcoin',
      icon: <TrendingUp className="w-6 h-6" />,
      url: 'https://coinmarketcap.com/currencies/bitcoin',
      description: 'Comprehensive Bitcoin Analysis',
      showHealth: true // Flag to show health data in this card
    },
    {
      title: 'Barchart VIX Data',
      icon: <TrendingUp className="w-6 h-6" />,
      url: 'https://www.barchart.com/stocks/quotes/$VIX',
      description: 'CBOE Volatility Index ($VIX)',
      showHealth: false // This card won't show health data
    },
    {
      title: 'Barchart Futures Data',
      icon: <TrendingUp className="w-6 h-6" />,
      url: 'https://www.barchart.com/futures',
      description: 'Comprehensive Futures Analysis',
      showHealth: true // Flag to show health data in this card
    }
  ];

  return (
    <div className="w-full p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Market Indicators</h2>
      <div className="flex flex-col min-[920px]:flex-row gap-4">
        {indicators.map((indicator, index) => (
          <Card 
            key={index} 
            className="flex-1 hover:shadow-lg transition-shadow duration-300"
          >
            <a 
              href={indicator.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block"
            >
              <CardHeader className="flex flex-row items-center space-y-0 gap-4">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  {indicator.icon}
                </div>
                <CardTitle className="text-base">{indicator.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {indicator.description}
                </p>
                {indicator.showHealth && (
                  <div className="mt-2">
                    {renderHealthData()}
                  </div>
                )}
              </CardContent>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketIndicators;