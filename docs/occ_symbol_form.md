# OCC Symbol Form Documentation

## Overview

The OCC Symbol Form is a React component suite for generating and validating OCC (Options Clearing Corporation) option symbols. It consists of three main parts:

1. OCCSymbolForm (React Component)
2. useOCCSymbol (Custom Hook)
3. occFormatters (Utility Functions)

## Installation

First, ensure you have the required shadcn/ui components installed:

```bash
npm install @radix-ui/react-label
npm install @radix-ui/react-radio-group
npm install lucide-react
```

Add the required shadcn/ui components:

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add label
npx shadcn-ui@latest add input
npx shadcn-ui@latest add button
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add alert
```

## Basic Usage

```jsx
import { OCCSymbolForm } from './components/OCCSymbolForm';

function App() {
  const handleSymbolGenerated = (symbolData) => {
    console.log('Generated Symbol:', symbolData.symbol);
    // symbolData includes:
    // - rootSymbol: The padded root symbol
    // - expirationDate: The selected expiration date
    // - optionType: 'C' for Call or 'P' for Put
    // - strikePrice: The selected strike price
    // - symbol: The complete OCC symbol
  };

  return (
    <div className="container mx-auto p-4">
      <OCCSymbolForm onSubmit={handleSymbolGenerated} />
    </div>
  );
}
```

## With Initial Values

```jsx
import { OCCSymbolForm } from './components/OCCSymbolForm';

function PrefilledForm() {
  const initialValues = {
    rootSymbol: 'AAPL',
    expirationDate: '2024-12-20',
    optionType: 'C',
    strikePrice: '150.00'
  };

  return (
    <OCCSymbolForm 
      initialValues={initialValues}
      onSubmit={(data) => console.log(data)}
    />
  );
}
```

## Using the Hook Directly

```jsx
import { useOCCSymbol } from './hooks/useOCCSymbol';

function CustomOptionForm() {
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
    isValid
  } = useOCCSymbol();

  // Custom form implementation...
}
```

## Using the Formatter Utilities

```jsx
import {
  formatOCCSymbol,
  padRootSymbol,
  formatExpirationDate,
  formatStrikePrice,
  isValidOCCSymbol
} from './utils/occFormatters';

// Pad root symbol
const paddedSymbol = padRootSymbol('AAPL');  // 'AAPL  '

// Format expiration date
const formattedDate = formatExpirationDate('2024-12-20');  // '241220'

// Format strike price
const formattedPrice = formatStrikePrice('150.00');  // '00150000'

// Generate complete symbol
const occSymbol = formatOCCSymbol('AAPL', '2024-12-20', 'C', '150.00');
// Result: 'AAPL  241220C00150000'

// Validate symbol
const isValid = isValidOCCSymbol('AAPL  241220C00150000');  // true
```

## Props Reference

### OCCSymbolForm

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| onSubmit | function | No | Callback function called when form is submitted. Receives object with symbol data. |
| initialValues | object | No | Initial values for the form fields. |

### initialValues Object Structure

```typescript
interface InitialValues {
  rootSymbol?: string;
  expirationDate?: string;  // YYYY-MM-DD format
  optionType?: 'C' | 'P';
  strikePrice?: string;
}
```

## Error Handling

The form handles several types of errors:

1. **Root Symbol Errors**:
   - Empty symbol
   - Symbol too long (> 6 characters)

2. **Expiration Date Errors**:
   - Invalid date format
   - Empty date

3. **Option Type Errors**:
   - Invalid option type (must be 'C' or 'P')

4. **Strike Price Errors**:
   - Invalid number format
   - Negative values
   - Empty value

Example error handling:

```jsx
function ErrorHandlingExample() {
  const handleSubmit = (data) => {
    try {
      // Process the OCC symbol
      processOption(data.symbol);
    } catch (error) {
      console.error('Error processing option:', error);
    }
  };

  return (
    <OCCSymbolForm
      onSubmit={handleSubmit}
      initialValues={{
        rootSymbol: 'AAPL',
        expirationDate: '2024-12-20',
        optionType: 'C',
        strikePrice: '150.00'
      }}
    />
  );
}
```

## Styling Customization

The form uses shadcn/ui components and Tailwind CSS for styling. You can customize the appearance by:

1. Modifying the shadcn/ui theme
2. Passing additional className props to the form component
3. Overriding Tailwind classes in your CSS

Example with custom styling:

```jsx
function CustomStyledForm() {
  return (
    <div className="dark:bg-gray-900">
      <OCCSymbolForm
        onSubmit={(data) => console.log(data)}
        className="max-w-lg mx-auto"
      />
    </div>
  );
}
```

## Best Practices

1. **Always validate the generated symbol**:
```jsx
import { isValidOCCSymbol } from './utils/occFormatters';

const handleSubmit = (data) => {
  if (!isValidOCCSymbol(data.symbol)) {
    console.error('Invalid OCC symbol generated');
    return;
  }
  // Process valid symbol
};
```

2. **Handle copy-to-clipboard failures**:
```jsx
const handleCopy = async (symbol) => {
  try {
    await navigator.clipboard.writeText(symbol);
    // Show success message
  } catch (error) {
    // Show error message
    console.error('Failed to copy:', error);
  }
};
```

3. **Implement proper date validation**:
```jsx
const isValidExpirationDate = (date) => {
  const expDate = new Date(date);
  const today = new Date();
  return expDate > today;
};
```

## Troubleshooting

Common issues and solutions:

1. **Symbol not generating**:
   - Check all required fields are filled
   - Verify date format is correct
   - Ensure strike price is a valid number

2. **Styling issues**:
   - Verify shadcn/ui components are properly installed
   - Check Tailwind configuration
   - Ensure dark mode is properly configured if used

3. **Validation errors**:
   - Verify input formats match expected formats
   - Check console for detailed error messages
   - Ensure all required fields are properly filled

## Contributing

When contributing to the OCC Symbol Form components:

1. Ensure all formatters are properly tested
2. Maintain backward compatibility
3. Update documentation for any new features
4. Follow the existing code style and conventions