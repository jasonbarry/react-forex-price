// @flow
import * as React from 'react';
import * as Util from './utils';
import CURRENCY from './json/currencies.json';

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
    displayCurrency: Util.getCurrencyFromBrowserLocale(),
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

  // in case baseCurrency changes
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.baseCurrency !== this.props.baseCurrency) {
      this.fetchRates(nextProps.baseCurrency);
    }
  }

  get amount(): number {
    const { amount, displayCurrency, hideCents, rounding } = this.props;
    const converted = parseFloat(amount) * (this.state.rates[displayCurrency] || 1);
    return hideCents ? rounding(converted) : converted;
  }

  fetchRates = (currency: string) => {
    // must check global variable so that multiple instances on same page
    // don't trigger their own fetch the first time the user loads the page that day
    if (window.__REACT_WORLD_PRICE_FETCHING__) {
      setTimeout(() => {
        this.fetchRates(currency);
      }, 50);
    } else {
      Util.fetchRates(currency).then(rates => { this.setState({ rates }); });
    }
  }

  render() {
    const { baseCurrency, displayCurrency, rounding, unwrap } = this.props;
    const amount = parseFloat(this.props.amount);

    // check for validity
    const invalidAmount = amount.toString() === 'NaN';
    const invalidBaseCurrency = !(baseCurrency in CURRENCY);
    const invalidDisplayCurrency = !(displayCurrency in CURRENCY);
    if (invalidAmount || invalidBaseCurrency || invalidDisplayCurrency) {
      console.error('react-world-price', this.props);
      return unwrap ? this.props.amount : <span>{this.props.amount}</span>;
    }

    const original = `${Util.formatAmountForCurrency(amount, CURRENCY[baseCurrency], rounding)} ${baseCurrency}`;
    const converted = Util.formatAmountForCurrency(this.amount, CURRENCY[displayCurrency], rounding);

    if (unwrap) return converted;
    return <span title={original}>{converted}</span>;
  }
}
