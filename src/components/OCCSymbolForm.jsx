import React from 'react';
import { useOCCSymbol } from '../hooks/useOCCSymbol';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Copy } from 'lucide-react';

const OCCSymbolForm = ({ onSubmit, initialValues }) => {
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
  } = useOCCSymbol(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && onSubmit) {
      onSubmit({
        rootSymbol,
        expirationDate,
        optionType,
        strikePrice,
        symbol
      });
    }
  };

  const copyToClipboard = async () => {
    if (symbol) {
      try {
        await navigator.clipboard.writeText(symbol);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>OCC Option Symbol Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            {errors.optionType && (
              <p className="text-sm text-red-500">{errors.optionType}</p>
            )}
          </div>

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

          {symbol && (
            <Alert className="mt-4">
              <div className="flex items-center justify-between">
                <AlertDescription className="font-mono text-lg">
                  {symbol}
                </AlertDescription>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </Alert>
          )}

          {errors.symbol && (
            <Alert variant="destructive">
              <AlertDescription>{errors.symbol}</AlertDescription>
            </Alert>
          )}

          <div className="flex space-x-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={!isValid}
            >
              Generate Symbol
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
  );
};

export default OCCSymbolForm;