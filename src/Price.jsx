// @flow
import * as React from 'react';
import * as Util from './utils';
import CURRENCY from './json/currencies.json';

type Props = {
  amount: number,
  baseCurrency: string,
  displayCurrency: string,
  dropCents: boolean,
  rounding: number => number,
  unwrap: boolean,
};

type State = {
  rates: Object,
};

export default class Price extends React.Component<Props, State> {
  static defaultProps = {
    baseCurrency: 'USD',
    displayCurrency: Util.getCurrencyFromBrowserLocale(),
    dropCents: false,
    rounding: Math.round,
    unwrap: false,
  };

  state = {
    rates: {},
  };

  componentDidMount() {
    this.fetchRates(this.props.baseCurrency);
  }

  // in case baseCurrency changes
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.baseCurrency !== this.props.baseCurrency) {
      this.fetchRates(nextProps.baseCurrency);
    }
  }

  fetchRates = (currency: string) => {
    // must check global variable so that multiple instances on same page
    // don't trigger their own fetch the first time the user loads the page that day
    if (window.__REACT_FOREX_PRICE_FETCHING__) {
      setTimeout(() => {
        this.fetchRates(currency);
      }, 50);
    } else {
      Util.fetchRates(currency).then(rates => { this.setState({ rates }); });
    }
  };

  convert = (amount: number) => (
    parseFloat(amount) * (this.state.rates[this.props.displayCurrency] || 1)
  );

  round = (amount: number) => (
    this.props.dropCents ? this.props.rounding(amount) : amount
  );

  wrap = (innerText: number | string, title?: string) => (
    this.props.unwrap ? innerText : <span title={title}>{innerText}</span>
  );

  render() {
    const { baseCurrency, displayCurrency, rounding } = this.props;
    const amount = parseFloat(this.props.amount);

    // invalid amount
    if (amount.toString() === 'NaN') return this.wrap(this.props.amount);
    // invalid currency
    if (!(baseCurrency in CURRENCY) || !(displayCurrency in CURRENCY)) {
      console.error('react-forex-price', this.props);
      return this.wrap(this.round(amount));
    }

    // if display currency rate doesn't exist, or fetch hasn't returned yet, don't convert
    const original = Util.format(this.round(amount), CURRENCY[baseCurrency], rounding);
    if (!this.state.rates[displayCurrency]) return this.wrap(original);

    const converted = Util.format(this.round(this.convert(amount)), CURRENCY[displayCurrency], rounding);
    return this.wrap(converted, `${original} ${baseCurrency}`);
  }
}
