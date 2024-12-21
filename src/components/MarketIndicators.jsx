import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { BarChart2, TrendingUp } from 'lucide-react';

const MarketIndicators = () => {
  const indicators = [
    {
      title: 'Fear & Greed Index',
      icon: <BarChart2 className="w-6 h-6" />,
      url: 'https://www.cnn.com/markets/fear-and-greed',
      description: 'CNN Market Fear & Greed Index'
    },
    {
      title: 'Barchart VIX Data',
      icon: <TrendingUp className="w-6 h-6" />,
      url: 'https://www.barchart.com/stocks/quotes/$VIX',
      description: 'Comprehensive Market Analysis'
    },
    {
      title: 'Barchart VIX Data',
      icon: <TrendingUp className="w-6 h-6" />,
      url: 'https://www.barchart.com/stocks/quotes/$VIX',
      description: 'Comprehensive Market Analysis'
    },
    {
      title: 'Barchart SPY Data',
      icon: <TrendingUp className="w-6 h-6" />,
      url: 'https://www.barchart.com/stocks/quotes/SPY',
      description: 'Comprehensive Market Analysis'
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
                {/* Placeholder for future scraped data */}
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Click to view current data
                </div>
              </CardContent>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketIndicators;