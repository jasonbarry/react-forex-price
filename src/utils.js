// @flow
import LANGUAGE_CODES from './json/language_codes.json';

type Currency = {
  format: string,
  subunit: number,
};

export const getCurrencyFromBrowserLocale = (): string => {
  if (typeof window === 'undefined') return 'USD';
  const lang = window.navigator.language.toLowerCase();
  return LANGUAGE_CODES[lang] || 'USD';
};

export const formatAmountForCurrency = (
  amount: number,
  currency: Currency,
  rounding?: number => number = Math.round
): string => {
  const multiplier = Math.pow(10, currency.subunit);
  const price = rounding(amount * multiplier) / multiplier;
  const readablePrice = price.toLocaleString().replace(/(\.[\d]{1})$/, '$10');
  return currency.format.replace('{amount}', readablePrice);
};
