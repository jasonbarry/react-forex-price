// @flow
import React from 'react';

import Price from '../../src/Price.jsx';
import { getCurrencyFromBrowserLocale } from '../../src/utils';
import CURRENCY from '../../src/json/currencies.json';


type State = {
  amount: number,
  baseCurrency: string,
  displayCurrency: string,
  hideCents: boolean,
  rounding: string,
  roundingFn: number => number,
};

export default class Demo extends React.Component<{}, State> {
  state = {
    amount: 100,
    baseCurrency: getCurrencyFromBrowserLocale(),
    displayCurrency: '',
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

  select = (currency: string) => {
    if (currency === this.state.displayCurrency) {
      this.setState({ displayCurrency: '' });
    } else {
      this.setState({ displayCurrency: currency });
    }
  }

  render() {
    return (
      <section>
        <h1><a href="https://github.com/jasonbarry/react-forex-price#react-forex-price">react-forex-price</a></h1>
        <aside>An automatic currency conversion component for React</aside>
        <div class="badges center">
          <a href="https://www.npmjs.com/package/react-forex-price">
            <img src="https://img.shields.io/npm/v/react-forex-price.svg" alt="npm" />
          </a>
          <a>
            <img src="https://img.shields.io/badge/gzipped-3.5kB-brightgreen.svg" alt="size 3.5kB gzipped" />
          </a>
          <a>
            <img src="https://circleci.com/gh/jasonbarry/react-forex-price.svg?&style=shield" alt="circleci passing" />
          </a>
          <a href="https://david-dm.org/jasonbarry/react-forex-price">
            <img src="https://img.shields.io/david/jasonbarry/react-forex-price.svg" alt="David" />
          </a>
          <a href="https://www.npmjs.com/package/react-forex-price">
            <img src="https://img.shields.io/npm/dm/react-forex-price.svg" alt="npm" />
          </a>
          <iframe src="https://ghbtns.com/github-btn.html?user=jasonbarry&repo=react-forex-price&type=star&count=true&size=small" frameborder="0" scrolling="0" width="80px" height="20px"></iframe>
        </div>
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
            <p 
              class={`center ${currencyCode === this.state.displayCurrency ? 'highlight' : ''}`} 
              onClick={() => {
                this.select(currencyCode);
              }}
            >
              <Price 
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
        <div class="jsx background center">
          <pre>
            <span class="teal">&lt;</span><span class="pink">Price </span>
            <span class="purple">amount</span><span class="teal">=&#123;</span>
            <span class="orange">{this.state.amount || 0}</span><span class="teal">&#125;</span>
            {this.state.baseCurrency !== 'USD' &&
              <span>
                <span class="purple"> baseCurrency</span>
                <span class="teal">=&quot;</span>
                <span class="lightgreen">{this.state.baseCurrency}</span>
                <span class="teal">&quot;</span>
              </span>
            }
            {this.state.displayCurrency &&
              <span>
                <span class="purple"> displayCurrency</span>
                <span class="teal">=&quot;</span>
                <span class="lightgreen">{this.state.displayCurrency}</span>
                <span class="teal">&quot;</span>
              </span>
            }
            {this.state.hideCents &&
              <span class="purple"> hideCents</span>
            }
            {this.state.rounding !== 'round' &&
              <span>
                <span class="purple"> rounding</span>
                <span class="teal">=&#123;</span>
                <span class="yellow">Math</span>
                <span class="teal">.</span>
                <span class="white">{this.state.rounding}</span>
                <span class="teal">&#125;</span>
              </span>
            }
            <span class="teal">&nbsp;/&gt;</span>
          </pre>
        </div>
        <footer class="center">
          <a href="https://github.com/jasonbarry/react-forex-price#react-forex-price">
            <img src="dist/gh.png" width="32" height="32" alt="View react-forex-price on GitHub" />
          </a>
        </footer>
      </section>
    );
  }
}
  

