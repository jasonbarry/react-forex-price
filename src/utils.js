// @flow
import fetch from 'unfetch';
import ls from 'local-storage';
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
  // eslint-disable-next-line no-restricted-properties
  const multiplier = Math.pow(10, currency.subunit);
  const price = rounding(amount * multiplier) / multiplier;
  const readablePrice = price.toLocaleString().replace(/(\.[\d]{1})$/, '$10');
  return currency.format.replace('{amount}', readablePrice);
};

export const fetchRates = (base: string): Promise<Object> => {
  const ONE_DAY_AGO = 1000 * 60 * 60 * 24;
  const now = new Date().getTime();
  const key = `react-world-price-rates-${base}`;
  const { date, rates } = ls(key) || {};

  // return localStorage values for rates, if present
  if (date && now - Number(date) < ONE_DAY_AGO) return Promise.resolve(rates);

  // otherwise, fetch
  window.__REACT_WORLD_PRICE_FETCHING__ = true;
  return fetch(`https://api.fixer.io/latest?base=${base}`)
    .then(response => response.json())
    .then(data => {
      ls(key, { date: now, rates: data.rates });
      window.__REACT_WORLD_PRICE_FETCHING__ = false;
      return data.rates;
    })
    .catch(() => {
      window.__REACT_WORLD_PRICE_FETCHING__ = false;
      return {};
    });
}
