import * as Util from '../src/utils';

describe('utils', () => {
  describe('format', () => {
    it('USD', () => {
      const price = Util.format(123, { format: '${amount}', subunit: 2 });
      expect(price).toEqual('$123');
    });
  });
  describe('getCurrencyFromBrowserLocale', () => {
    it('USD', () => {
      const currency = Util.getCurrencyFromBrowserLocale();
      expect(currency).toEqual('USD');
    });
  });
});
