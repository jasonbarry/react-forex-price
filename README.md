# react-world-price

[![npm](https://img.shields.io/npm/v/react-world-price.svg)](https://www.npmjs.com/package/react-world-price)
![size 3.4kB gzipped](https://img.shields.io/badge/gzipped-3.4kB-brightgreen.svg)
[![David](https://img.shields.io/david/jasonbarry/react-world-price.svg)](https://david-dm.org/jasonbarry/react-world-price)
[![npm](https://img.shields.io/npm/dm/react-world-price.svg)](https://www.npmjs.com/package/react-world-price)


An automatic currency conversion component for React that Just Works<sup>™</sup>.

✨ [Try it for yourself with this demo](https://jasonbarry.github.io/react-world-price) ✨


## Features

- Dead simple API
- Always up-to-date currency exchange rates, cached locally
- Formatted the way users expect
- 32 currencies supported
- 8.6kB minified, 3.4kB gzipped, works in all major browsers, React 0.14 and up

## Installation and usage

Add it to your project:

	yarn add react-world-price

(**Note:** You'll need a promise polyfill if you're not using one already for this to work in browsers that don't support promises natively. I recommend [promise-polyfill](https://github.com/taylorhakes/promise-polyfill).)

Import it anywhere:

```JSX
import WorldPrice from 'react-world-price';
```

If the prices you're converting are already based in USD, then all you need to do is e.g.

```JSX
<p>The dress is on sale for <WorldPrice amount={123.45} />.</p>
```

to get prices displaying in the user's home currency.

## Props

Only the `amount` prop is required.

Prop | Description
--------- | -----------
`amount` | (*Number. Required. No default value*) <br /> The amount you are converting.
`baseCurrency` | (*String. Optional. Default value: `USD`*) <br /> The currency you are converting from. This should be the same value for all instances so that prices are normalized.
`displayCurrency` | (*String. Optional. Default value: Determined by user's locale, fallback to `USD`*) <br /> The currency you are converting to. The user's browser language (i.e. `navigator.language`) is consulted to determine a default value. <br /> **Note:** If you already know the user's preferred currency (based on data you collect), it is recommended to include it.
`hideCents` | (*Boolean. Optional. Default value: `false`*) <br /> Whether to omit digits after the decimal point, if they exist.
`rounding` | (*Function. Optional. Default value: `Math.round`*) <br /> Rounding function.
`unwrap` | (*Boolean. Optional. Default value: `false`*) <br /> When `false`, returns a pure string; when `true`, returns a `<span>` element with the original unconverted price set as its `title` attribute.

## Output

By default, a `<span>` element is outputted for every instance of `WorldPrice`. 

For example, 

```JSX
<WorldPrice amount={123.45} displayCurrency="EUR" />
```

translates to 

```JSX
<span title="$123.45 USD">€99.08</span>
```

## Examples

In the following examples, you'll see the output for a user in the United States, and for a user in Germany.

```JSX
<WorldPrice amount={8675.309} />
```
    
> User in the United States sees `$8,675.31`
> 
> User in Germany sees `€6.944,67`

```JSX
<WorldPrice amount={8675.309} displayCurrency="EUR" />
```
    
> User in the United States sees `€6,944.67`
> 
> User in Germany sees `€6.944,67`.

### Rounding

```JSX
<WorldPrice amount={8675.309} rounding={Math.floor} />
```
    
For the `en-US` locale, outputs `$8,675.30`.

```JSX
<WorldPrice amount={8675.309} rounding={Math.floor} hideCents />
```
    
For the `en-US` locale, outputs `$8,675`.

```JSX
<WorldPrice amount={8675.309} rounding={Math.ceil} />
```
    
For the `en-US` locale, outputs `$8,675.31`.

```JSX
<WorldPrice amount={8675.309} rounding={Math.ceil} hideCents />
```
    
For the `en-US` locale, outputs `$8,676`.

## Data

Exchange rate data comes from [Fixer](http://fixer.io). 

The Fixer API will only be consulted once per unique base currency per day, no matter how many `WorldPrice` instances you have per page. 

The data is cached via localStorage if available, falling back to cookies.

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

## Contributing

Want to improve something? Feel free to file an issue or open a pull request 😁