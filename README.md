# react-forex-price

[![npm](https://img.shields.io/npm/v/react-forex-price.svg)](https://www.npmjs.com/package/react-forex-price)
![size 3.5kB gzipped](https://img.shields.io/badge/gzipped-3.5kB-brightgreen.svg)
![circleci passing](https://circleci.com/gh/jasonbarry/react-forex-price.svg?&style=shield)
[![David](https://img.shields.io/david/jasonbarry/react-forex-price.svg)](https://david-dm.org/jasonbarry/react-forex-price)
[![npm](https://img.shields.io/npm/dm/react-forex-price.svg)](https://www.npmjs.com/package/react-forex-price)

An automatic currency conversion component for React, perfect as a drop-in replacement for displaying monetary values in your users' home currency.

✨ [Try it for yourself with this demo](https://jasonbarry.github.io/react-forex-price) ✨

Note: This component is intended for *displaying estimated prices* &mdash; you should not transact based on the values received from this component.


## Features

- **Accurate.** Daily foreign exchange [rates](#data) from the European Central Bank, for free.
- **Easy.** Dead-simple [usage](#usage). No API key required.
- **Efficient.** Multiple instances incur only one network request per user per day, [cached](#data) automatically.
- **Formatted.** Locale-aware, so prices are displayed the way users [expect](#examples).
- **Worldwide.** 32 currencies [supported](#currencies).
- **Compatible.** Works in all major browsers, React 0.14 and up, 8.9kB minified, 3.5kB minified + gzipped.

## Installation

Add it to your project:

    yarn add react-forex-price

(**Note:** You'll need a promise polyfill if you're not using one already for this to work in browsers that don't support promises natively. I recommend [promise-polyfill](https://github.com/taylorhakes/promise-polyfill).)

Import it anywhere:

```JSX
import Price from 'react-forex-price';
```

<a name="usage"></a>
## Usage

If your base currency is USD, all you need to do is plug your values into the `amount` prop as a number.

```JSX
<p>I bought a dress for <Price amount={123.45} />.</p>
```

### Props

Only the `amount` prop is required.

Prop | Description
--------- | -----------
`amount` | (*Number. Required. No default value*) <br /> The amount you are converting.
`baseCurrency` | (*String. Optional. Default value: `USD`*) <br /> The currency you are converting from. This should be the same value for all instances so that prices are normalized.
`displayCurrency` | (*String. Optional. Default value: Determined by user's locale, fallback to `USD`*) <br /> The currency you are converting to. The user's browser language (i.e. `navigator.language`) is consulted to determine a default value. <br /> **Note:** If you already know the user's preferred currency (based on data you collect), it is recommended to supply it.
`dropCents` | (*Boolean. Optional. Default value: `false`*) <br /> Whether to omit digits after the decimal point, if they exist. See [Rounding](#rounding).
`rounding` | (*Function. Optional. Default value: `Math.round`*) <br /> Rounding function. See [Rounding](#rounding).
`unwrap` | (*Boolean. Optional. Default value: `false`*) <br /> Whether to unwrap the outputted `<span>` element. See [Output](#output).

<!--
### Errors

In any case of error, the `unwrap` prop will be respected.

In the event that `amount` is not a number, the output will be the same as `amount`. A console error will be thrown if no number can be parsed from the amount.

If either the base / display currency value is not [supported](#currencies), the output will fallback to `amount`. The `dropCents` and `rounding` props will be respected. A console error will be thrown.

If the Fixer API cannot be reached, the output will be formatted in the base currency (not converted). All props will be respected. No console error will be thrown.
-->

<a name="data"></a>
## Data

Exchange rate data comes from [Fixer](https://github.com/fixerAPI/fixer), an open-source, simple, and lightweight API for current and historical foreign exchange (forex) rates published by the European Central Bank.

The Fixer API will only be consulted once per user per unique base currency per day, no matter how many `Price` instances you have per page. 

The data is cached via localStorage if available, falling back to memory.

If the API cannot be reached, the amount is displayed in the base currency (formatted based on user locale, but not converted).

<a name="currencies"></a>
### Supported currencies

The following currencies are currently supported: 

- `AUD`: Australian dollar
- `BGN`: Bulgarian lev
- `BRL`: Brazilian real 
- `CAD`: Canadian dollar
- `CHF`: Swiss franc
- `CNY`: Chinese yuan renminbi
- `CZK`: Czech koruna 
- `DKK`: Danish krone 
- `EUR`: Euro 
- `GBP`: Pound sterling 
- `HKD`: Hong Kong dollar 
- `HRK`: Croatian kuna
- `HUF`: Hungarian forint 
- `IDR`: Indonesian rupiah
- `ILS`: Israeli shekel 
- `INR`: Indian rupee 
- `ISK`: Icelandic krona
- `JPY`: Japanese yen 
- `KRW`: South Korean won 
- `MXN`: Mexican peso 
- `MYR`: Malaysian ringgit
- `NOK`: Norwegian krone
- `NZD`: New Zealand dollar 
- `PHP`: Philippine piso
- `PLN`: Polish zloty 
- `RON`: Romanian leu 
- `RUB`: Russian rouble 
- `SEK`: Swedish krona
- `SGD`: Singapore dollar 
- `THB`: Thai baht
- `TRY`: Turkish lira 
- `USD`: US dollar

There may be plans to support other currencies in the future. There are no plans to support cryptocurrencies.

<a name="examples"></a>
## Examples

If `displayCurrency` is not specified, the display currency is estimated by the user's locale. For `<Price amount={8675.309} />`, a user in the USA would see a value of approximately "$8,675.31", and a user in Germany would see a value of approximately "€6.944,67".

If `displayCurrency` is specified, then the conversion is forced. For `<Price amount={8675.309} displayCurrency="EUR" />`, a user in the USA would see a value of approximately "€6,944.67", and a user in Germany would see a value of approximately "€6.944,67" (notice thousands separator and decimal point).

<a name="rounding"></a>
### Rounding

For e.g. the `en-US` locale, 

- `<Price amount={8675.309} rounding={Math.floor} />` results in $8,675.30
- `<Price amount={8675.309} rounding={Math.floor} dropCents />` results in $8,675
- `<Price amount={8675.309} rounding={Math.ceil} />` results in $8,675.31
- `<Price amount={8675.309} rounding={Math.ceil} dropCents />` results in $8,676

<a name="output"></a>
## Output

By default, prices are wrapped in a `<span>` element. For example, 

```JSX
<Price amount={123.45} displayCurrency="EUR" />
```

translates to 

```JSX
<span title="$123.45 USD">€99.08</span>
```

If you would like to simply return an unwrapped string, pass the `unwrap` prop. That makes 

```JSX
<Price amount={123.45} displayCurrency="EUR" unwrap />
```

translate to 

```
€99.08
```

## Testing

- Run `yarn lint` to lint with eslint
- Run `yarn flow` for static type analysis with flow
- Run `yarn test` to run unit tests with jest
- Run `yarn test:full` for all of the above

All tests are run on each pull request via CircleCI. 

## Contributing

Want to improve something? Feel free to file an issue or open a pull request 😁