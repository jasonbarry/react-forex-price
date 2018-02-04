import { formatAmountForCurrency, getCurrencyFromBrowserLocale } from '../src/utils';

describe('utils', () => {
  describe('formatAmountForCurrency', () => {
    it('USD', () => {
      const price = formatAmountForCurrency(123, { format: '${amount}', subunit: 2 });
      expect(price).toEqual('$123');
    });
  });
  describe('getCurrencyFromBrowserLocale', () => {
    it('USD', () => {
      const currency = getCurrencyFromBrowserLocale();
      expect(currency).toEqual('USD');
    });
  });
});
