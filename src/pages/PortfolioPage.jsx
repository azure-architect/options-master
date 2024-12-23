import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useOCCSymbol } from '../hooks/useOCCSymbol';

const PortfolioPage = () => {
  const [positions, setPositions] = useState([
    { id: 1, symbol: 'AAPL240119C00190000', type: 'Long', quantity: 1, price: 3.15, entryDate: '2024-01-05' },
    { id: 2, symbol: 'SPY240315P00470000', type: 'Short', quantity: 2, price: 2.45, entryDate: '2024-01-10' },
  ]);

  const {
    rootSymbol,
    expirationDate,
    optionType,
    strikePrice,
    symbol,
    errors,
    handleRootSymbolChange,
    handleExpirationDateChange,
    handleOptionTypeChange,
    handleStrikePriceChange,
    reset,
    isValid,
  } = useOCCSymbol();

  const [positionType, setPositionType] = useState('Long');
  const [quantity, setQuantity] = useState(1);

  const handleAddPosition = async (e) => {
    e.preventDefault();
    if (!isValid || !symbol) return;

    // Here you would typically make an API call to fetch contract data
    // const contractData = await fetchContractData(symbol);
    
    const newPosition = {
      id: Date.now(),
      symbol: symbol,
      type: positionType,
      quantity: quantity,
      entryDate: new Date().toISOString().split('T')[0],
      // Additional fields would come from API response
      price: 0, // This would come from API
    };

    setPositions([...positions, newPosition]);
    reset();
    setQuantity(1);
  };

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Portfolio Management</h1>
      
      {/* New Position Form */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Add New Position</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddPosition} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Root Symbol */}
              <div className="space-y-2">
                <Label htmlFor="rootSymbol">Root Symbol</Label>
                <Input
                  id="rootSymbol"
                  placeholder="e.g. AAPL"
                  value={rootSymbol}
                  onChange={(e) => handleRootSymbolChange(e.target.value)}
                  className={errors.rootSymbol ? 'border-red-500' : ''}
                  maxLength={6}
                />
                {errors.rootSymbol && (
                  <p className="text-sm text-red-500">{errors.rootSymbol}</p>
                )}
              </div>

              {/* Expiration Date */}
              <div className="space-y-2">
                <Label htmlFor="expirationDate">Expiration Date</Label>
                <Input
                  id="expirationDate"
                  type="date"
                  value={expirationDate}
                  onChange={(e) => handleExpirationDateChange(e.target.value)}
                  className={errors.expirationDate ? 'border-red-500' : ''}
                />
                {errors.expirationDate && (
                  <p className="text-sm text-red-500">{errors.expirationDate}</p>
                )}
              </div>

              {/* Strike Price */}
              <div className="space-y-2">
                <Label htmlFor="strikePrice">Strike Price</Label>
                <Input
                  id="strikePrice"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="e.g. 150.00"
                  value={strikePrice}
                  onChange={(e) => handleStrikePriceChange(e.target.value)}
                  className={errors.strikePrice ? 'border-red-500' : ''}
                />
                {errors.strikePrice && (
                  <p className="text-sm text-red-500">{errors.strikePrice}</p>
                )}
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  placeholder="# of contracts"
                />
              </div>
            </div>

            {/* Option Type and Position Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Option Type</Label>
                <RadioGroup
                  value={optionType}
                  onValueChange={handleOptionTypeChange}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="C" id="call" />
                    <Label htmlFor="call">Call</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="P" id="put" />
                    <Label htmlFor="put">Put</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Position Type</Label>
                <RadioGroup
                  value={positionType}
                  onValueChange={setPositionType}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Long" id="long" />
                    <Label htmlFor="long">Long</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Short" id="short" />
                    <Label htmlFor="short">Short</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Generated Symbol Display */}
            {symbol && (
              <Alert className="mt-4">
                <AlertDescription className="font-mono text-lg">
                  {symbol}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                type="submit"
                className="flex-1"
                disabled={!isValid}
              >
                Add Position
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={reset}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Positions List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Current Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr className="text-xs sm:text-sm">
                    <th className="px-2 py-3 text-left">Symbol</th>
                    <th className="px-2 py-3 text-left">Type</th>
                    <th className="px-2 py-3 text-right">Qty</th>
                    <th className="hidden sm:table-cell px-2 py-3 text-right">Price</th>
                    <th className="hidden sm:table-cell px-2 py-3 text-left">Entry Date</th>
                    <th className="px-2 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {positions.map((position) => (
                    <tr key={position.id} className="text-xs sm:text-sm">
                      <td className="px-2 py-3 font-mono whitespace-nowrap">{position.symbol}</td>
                      <td className="px-2 py-3">{position.type}</td>
                      <td className="px-2 py-3 text-right">{position.quantity}</td>
                      <td className="hidden sm:table-cell px-2 py-3 text-right">${position.price.toFixed(2)}</td>
                      <td className="hidden sm:table-cell px-2 py-3">{position.entryDate}</td>
                      <td className="px-2 py-3 text-right">
                        <Button variant="outline" size="sm">Close</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioPage;