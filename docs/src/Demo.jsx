// @flow
import React from 'react';

import WorldPrice from '../../src/WorldPrice.jsx';
import { getCurrencyFromBrowserLocale } from '../../src/utils';
import CURRENCY from '../../src/json/currencies.json';


type State = {
  amount: number,
  baseCurrency: string,
  hideCents: boolean,
  rounding: string,
  roundingFn: number => number,
};

export default class Demo extends React.Component<{}, State> {
  state = {
    amount: 100,
    baseCurrency: getCurrencyFromBrowserLocale(),
    hideCents: false,
    rounding: 'round',
    roundingFn: Math.round,
  };

  updateState = (event: SyntheticEvent<>) => {
    // flow-disable-next-line
    this.setState({ [event.target.id]: event.target.value });
  };

  changeHideCents = (event: SyntheticEvent<>) => {
    // flow-disable-next-line
    this.setState({ hideCents: event.target.checked });
  };

  changeRounding = (event: SyntheticEvent<>) => {
    // flow-disable-next-line
    const rounding = event.target.value;
    let roundingFn = Math.round;
    switch (rounding) {
      case 'ceil': roundingFn = Math.ceil; break;
      case 'floor': roundingFn = Math.floor; break;
    }
    this.setState({ rounding, roundingFn });
  };

  render() {
    return (
      <section>
        <h1>react-world-price</h1>
        <iframe src="https://ghbtns.com/github-btn.html?user=jasonbarry&repo=react-world-price&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
        <aside>An automatic currency conversion component for React that Just Works<sup>™</sup>.</aside>
        <div class="inputs background center">
          <div>
            <label for="amount">Amount</label>
            <input id="amount" type="text" value={this.state.amount} onChange={this.updateState} />
          </div>
          <div>
            <label for="baseCurrency">Base Currency</label>
            <select id="baseCurrency" type="text" value={this.state.baseCurrency} onChange={this.updateState}>
              {Object.keys(CURRENCY).map(currencyCode => (
                <option value={currencyCode}>{currencyCode}</option>
              ))}
            </select>
          </div>
          <div>
            <input id="hideCents" type="checkbox" checked={this.state.hideCents} onChange={this.changeHideCents} />
            <label for="hideCents">Hide Cents</label>
          </div>
          <div>
            <label for="rounding">Rounding</label>
            <select id="rounding" type="text" value={this.state.rounding} onChange={this.changeRounding}>
              <option value="ceil">Math.ceil</option>
              <option value="round">Math.round</option>
              <option value="floor">Math.floor</option>
            </select>
          </div>
        </div>
        <div class="prices">
          {Object.keys(CURRENCY).map(currencyCode => (
            <p class={`center ${currencyCode === this.state.baseCurrency ? 'highlight' : ''}`}>
              <WorldPrice 
                key={currencyCode}
                amount={this.state.amount || 0} 
                baseCurrency={this.state.baseCurrency} 
                displayCurrency={currencyCode}
                hideCents={this.state.hideCents} 
                rounding={this.state.roundingFn}
              />
            </p>
          ))}
        </div>
        <pre class="background center">
          <span class="red">$</span> <span class="green">yarn add react-world-price</span>
        </pre>
        <footer class="center">
          <a href="https://github.com/jasonbarry/react-world-price">
            <img src="dist/gh.png" width="32" height="32" alt="View react-world-price on GitHub" />
          </a>
        </footer>
      </section>
    );
  }
}
  

