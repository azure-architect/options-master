import { useState, useCallback, useMemo } from 'react';
import { formatOCCSymbol, padRootSymbol, formatExpirationDate, formatStrikePrice } from '../utils/occFormatters';

export const useOCCSymbol = (initialValues = {}) => {
  const [rootSymbol, setRootSymbol] = useState(initialValues.rootSymbol || '');
  const [expirationDate, setExpirationDate] = useState(initialValues.expirationDate || '');
  const [optionType, setOptionType] = useState(initialValues.optionType || 'C');
  const [strikePrice, setStrikePrice] = useState(initialValues.strikePrice || '');
  
  const [errors, setErrors] = useState({
    rootSymbol: '',
    expirationDate: '',
    optionType: '',
    strikePrice: '',
    symbol: ''
  });

  const clearErrors = useCallback(() => {
    setErrors({
      rootSymbol: '',
      expirationDate: '',
      optionType: '',
      strikePrice: '',
      symbol: ''
    });
  }, []);

  const handleRootSymbolChange = useCallback((value) => {
    clearErrors();
    try {
      const processed = value.trim().toUpperCase();
      if (processed.length > 6) {
        throw new Error('Root symbol cannot exceed 6 characters');
      }
      setRootSymbol(processed);
    } catch (error) {
      setErrors(prev => ({ ...prev, rootSymbol: error.message }));
    }
  }, [clearErrors]);

  const handleExpirationDateChange = useCallback((value) => {
    clearErrors();
    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      setExpirationDate(value);
    } catch (error) {
      setErrors(prev => ({ ...prev, expirationDate: error.message }));
    }
  }, [clearErrors]);

  const handleOptionTypeChange = useCallback((value) => {
    clearErrors();
    const type = value.toUpperCase();
    if (type !== 'C' && type !== 'P') {
      setErrors(prev => ({ ...prev, optionType: 'Option type must be "C" or "P"' }));
      return;
    }
    setOptionType(type);
  }, [clearErrors]);

  const handleStrikePriceChange = useCallback((value) => {
    clearErrors();
    try {
      const numValue = Number(value);
      if (isNaN(numValue) || numValue < 0) {
        throw new Error('Strike price must be a positive number');
      }
      setStrikePrice(value);
    } catch (error) {
      setErrors(prev => ({ ...prev, strikePrice: error.message }));
    }
  }, [clearErrors]);

  const symbol = useMemo(() => {
    clearErrors();
    try {
      if (!rootSymbol || !expirationDate || !optionType || !strikePrice) {
        return '';
      }
      return formatOCCSymbol(rootSymbol, expirationDate, optionType, strikePrice);
    } catch (error) {
      setErrors(prev => ({ ...prev, symbol: error.message }));
      return '';
    }
  }, [rootSymbol, expirationDate, optionType, strikePrice, clearErrors]);

  const reset = useCallback(() => {
    setRootSymbol(initialValues.rootSymbol || '');
    setExpirationDate(initialValues.expirationDate || '');
    setOptionType(initialValues.optionType || 'C');
    setStrikePrice(initialValues.strikePrice || '');
    clearErrors();
  }, [initialValues, clearErrors]);

  const isValid = useMemo(() => {
    return Boolean(
      rootSymbol &&
      expirationDate &&
      (optionType === 'C' || optionType === 'P') &&
      strikePrice &&
      Object.values(errors).every(error => !error) &&
      symbol
    );
  }, [rootSymbol, expirationDate, optionType, strikePrice, errors, symbol]);

  return {
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
  };
};
