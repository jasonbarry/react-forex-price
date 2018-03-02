import ls from 'local-storage';
import 'jest-localstorage-mock';
import * as Util from '../src/utils';
import RATES from './rates.json';
import './setup';


beforeEach(() => {
  localStorage.clear();
});

describe('utils', () => {
  describe('format', () => {
    it('USD', () => {
      const price = Util.format(123, { format: '$#', fractional: true });
      expect(price).toEqual('$123');
    });
  });
  describe('getCurrencyFromBrowserLocale', () => {
    it('USD', () => {
      const currency = Util.getCurrencyFromBrowserLocale();
      expect(currency).toEqual('USD');
    });
  });
  describe('fetchRates', () => {
    const now = new Date().getTime();
    const key = 'react-forex-price-USD';
    const value = { date: now, rates: RATES.rates };
    it('fetches rates from localStorage', () => {
      ls(key, value);
      return Util.fetchRates('USD')
        .then(rates => {
          expect(Object.keys(rates).length).toEqual(32);
          expect(ls(key)).toEqual(value);
        });
    });
    it('fetches rates from mock API', async () => {
      return Util.fetchRates('USD')
        .then(rates => {
          expect(Object.keys(rates).length).toEqual(32);
          expect(ls(key)).toEqual(value);
        });
    });
  });
});
