// @flow
import * as React from 'react';
import fetch from 'isomorphic-fetch';
import storage from 'local-storage-fallback';
import CURRENCY from './currencies.json';
import LANGUAGE_CODES from './language_codes.json';

const NAMESPACE = 'react-world-price';
const ONE_DAY_AGO = 1000 * 60 * 60 * 24;

type Currency = {
  format: string,
  subunit: number,
};

type Props = {
  amount: number,
  baseCurrency: string,
  displayCurrency: string,
  hideCents: boolean,
  rounding: number => number,
};

type State = {
  rates: Object,
};

const getCurrencyFromBrowserLocale = (): string => {
  if (typeof window === 'undefined') return 'USD';
  const lang = window.navigator.language.toLowerCase();
  return LANGUAGE_CODES[lang] || 'USD';
};

const formatAmountForCurrency = (amount: number, currency: Currency, rounding: number => number): string => {
  const multiplier = Math.pow(10, currency.subunit);
  const price = rounding(amount * multiplier) / multiplier;
  const readablePrice = price.toLocaleString().replace(/(\.[\d]{1})$/, '$10');
  return currency.format.replace('{amount}', readablePrice);
};

export default class Price extends React.Component<Props, State> { 
  static defaultProps = {
    baseCurrency: 'USD', 
    displayCurrency: getCurrencyFromBrowserLocale(), 
    hideCents: false,
    rounding: Math.round,
  };

  state = {
    rates: {},
  };

  componentDidMount() {
    this.fetchRates(this.props.baseCurrency);
  }

  // baseCurrency shouldn't change, but just in case
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.baseCurrency !== this.props.baseCurrency) {
      this.fetchRates(nextProps.baseCurrency);
    }
  }

  fetchRates(base: string) {
    const localDate = storage.getItem(`${NAMESPACE}-date-${base}`);
    if (localDate && new Date().getTime() - Number(localDate) < ONE_DAY_AGO) {
      const localRates = storage.getItem(`${NAMESPACE}-rates-${base}`);
      this.setState({ 
        rates: JSON.parse(localRates),
      });
    } else if (window.__REACT_AUTOCURRENCY_PREVENT_BULK_FETCH__) {
      // kinda whack, but better than firing an XHR for every instance on first load
      setTimeout(() => {
        this.fetchRates(base);
      }, 96);
    } else {
      // if this is the first instance to react out, prevent other instances from doing the same
      // they'll have to wait until this instance completes the fetch, then sets a global
      // while they are in a setTimeout loop
      window.__REACT_AUTOCURRENCY_PREVENT_BULK_FETCH__ = true;
      const url = `http://api.fixer.io/latest?base=${base}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          storage.setItem(`${NAMESPACE}-date-${base}`, new Date().getTime());
          storage.setItem(`${NAMESPACE}-rates-${base}`, JSON.stringify(data.rates));
          window.__REACT_AUTOCURRENCY_PREVENT_BULK_FETCH__ = false;
          this.setState({ 
            rates: data.rates
          });
        })
        .catch(() => {
          window.__REACT_AUTOCURRENCY_PREVENT_BULK_FETCH__ = false;
        });
    }
  }

  get amount(): number {
    const rate = this.state.rates[this.props.displayCurrency] || 1;
    let amount = this.props.amount * rate;
    if (this.props.hideCents) {
      amount = this.props.rounding(amount);
    }

    return amount;
  }

  render() {
    const { amount, baseCurrency, displayCurrency, rounding } = this.props;

    // check for validity
    const invalidAmount = typeof amount !== 'number';
    const invalidBaseCurrency = !(baseCurrency in CURRENCY);
    const invalidDisplayCurrency = !(displayCurrency in CURRENCY);
    if (invalidAmount || invalidBaseCurrency || invalidDisplayCurrency) {
      console.error(NAMESPACE, this.props);
      return (
        <span>{amount}</span>
      );
    }

    return (
      <span title={`${formatAmountForCurrency(amount, CURRENCY[baseCurrency], rounding)} ${baseCurrency}`}>
        {formatAmountForCurrency(this.amount, CURRENCY[displayCurrency], rounding)}
      </span>
    );
  }
}
