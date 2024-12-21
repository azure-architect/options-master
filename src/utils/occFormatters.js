export const padRootSymbol = (symbol) => {
  if (!symbol) {
    throw new Error('Root symbol is required');
  }
  const trimmedSymbol = symbol.trim().toUpperCase();
  if (trimmedSymbol.length > 6) {
    throw new Error('Root symbol cannot be longer than 6 characters');
  }
  return trimmedSymbol.padEnd(6, ' ');
};

export const formatExpirationDate = (date) => {
  if (!date) {
    throw new Error('Expiration date is required');
  }
  const expDate = new Date(date);
  if (isNaN(expDate.getTime())) {
    throw new Error('Invalid expiration date');
  }
  const year = expDate.getFullYear().toString().slice(-2);
  const month = (expDate.getMonth() + 1).toString().padStart(2, '0');
  const day = expDate.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};

export const formatStrikePrice = (price) => {
  if (price === undefined || price === null || price === '') {
    throw new Error('Strike price is required');
  }
  const numPrice = Number(price);
  if (isNaN(numPrice) || numPrice < 0) {
    throw new Error('Invalid strike price');
  }
  const priceInt = Math.round(numPrice * 1000);
  return priceInt.toString().padStart(8, '0');
};

export const formatOCCSymbol = (root, expiration, type, strike) => {
  const normalizedType = type?.toUpperCase();
  if (normalizedType !== 'C' && normalizedType !== 'P') {
    throw new Error('Option type must be either "C" or "P"');
  }
  try {
    const paddedRoot = padRootSymbol(root);
    const formattedDate = formatExpirationDate(expiration);
    const formattedStrike = formatStrikePrice(strike);
    return `${paddedRoot}${formattedDate}${normalizedType}${formattedStrike}`;
  } catch (error) {
    throw new Error(`Failed to format OCC symbol: ${error.message}`);
  }
};
