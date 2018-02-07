// @flow
import * as React from 'react';
import fetch from 'unfetch';
import storage from 'local-storage-fallback';
import CURRENCY from './json/currencies.json';
import { getCurrencyFromBrowserLocale, formatAmountForCurrency } from './utils';

const NAMESPACE = 'react-world-price';
const ONE_DAY_AGO = 1000 * 60 * 60 * 24;

type Props = {
  amount: number,
  baseCurrency: string,
  displayCurrency: string,
  hideCents: boolean,
  rounding: number => number,
  unwrap: boolean,
};

type State = {
  rates: Object,
};

export default class Price extends React.Component<Props, State> {
  static defaultProps = {
    baseCurrency: 'USD',
    displayCurrency: getCurrencyFromBrowserLocale(),
    hideCents: false,
    rounding: Math.round,
    unwrap: false,
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
    const now = new Date().getTime();
    const dateKey = `${NAMESPACE}-date-${base}`;
    const rateKey = `${NAMESPACE}-rates-${base}`;
    const localDate = storage.getItem(dateKey);
    if (localDate && now - Number(localDate) < ONE_DAY_AGO) {
      const localRates = storage.getItem(rateKey);
      this.setState({ rates: JSON.parse(localRates) });
    } else if (window.__REACT_WORLD_PRICE_FETCHING__) {
      // kinda whack, but better than firing an XHR for every instance on first load
      setTimeout(() => {
        this.fetchRates(base);
      }, 50);
    } else {
      // if this is the first instance to react out, prevent other instances from doing the same
      // they'll have to wait until this instance completes the fetch, then sets a global
      // while they are in a setTimeout loop
      window.__REACT_WORLD_PRICE_FETCHING__ = true;
      fetch(`http://api.fixer.io/latest?base=${base}`)
        .then(response => response.json())
        .then(data => {
          storage.setItem(dateKey, now);
          storage.setItem(rateKey, JSON.stringify(data.rates));
          window.__REACT_WORLD_PRICE_FETCHING__ = false;
          this.setState({ rates: data.rates });
        })
        .catch(() => {
          window.__REACT_WORLD_PRICE_FETCHING__ = false;
        });
    }
  }

  get amount(): number {
    const converted = this.props.amount * (this.state.rates[this.props.displayCurrency] || 1);
    return this.props.hideCents ? this.props.rounding(converted) : converted;
  }

  render() {
    const { amount, baseCurrency, displayCurrency, rounding, unwrap } = this.props;

    // check for validity
    const invalidAmount = typeof amount !== 'number';
    const invalidBaseCurrency = !(baseCurrency in CURRENCY);
    const invalidDisplayCurrency = !(displayCurrency in CURRENCY);
    if (invalidAmount || invalidBaseCurrency || invalidDisplayCurrency) {
      console.error(NAMESPACE, this.props);
      return unwrap ? amount : <span>{amount}</span>;
    }

    const original = `${formatAmountForCurrency(amount, CURRENCY[baseCurrency], rounding)} ${baseCurrency}`;
    const converted = formatAmountForCurrency(this.amount, CURRENCY[displayCurrency], rounding);

    if (unwrap) return converted;
    return <span title={original}>{converted}</span>;
  }
}
