# react-world-price

An automatic currency conversion component for React that Just Works™.

## Features

- Dead simple API
- Up-to-date currency exchange rates, cached locally
- Formatting based on user locale
- Original amount appears on hover via `title` attribute
- 32 currencies supported
- Small footprint: 16 kB minified, 5 kB gzip

## Options

All props are optional except for `amount`.

Name | Type | Default value | Description
-----|------|---------------|------------
`amount` | number |  | The amount you are converting.
`baseCurrency` | string | `USD` | The currency you are converting from. This should be the same value for all instances so that prices are normalized.
`displayCurrency` | string | Determined by user's locale, fallback to `USD` | The currency you are converting to. The user's browser language (i.e. `navigator.language`) is consulted to determine a default value. If you already know the user's preferred currency (based on data you collect), it is recommended to include it.
`hideCents` | boolean | `false` | Whether to omit digits after the decimal point, if they exist.
`rounding` | function | `Math.round` | Rounding function.

### Examples

```JSX
<WorldPrice amount={8675.309} />
```
    
For the `en-US` locale, outputs `$8,675.31`. For the `de-DE` locale, outputs `€6.944,67`.

```JSX
<WorldPrice amount={8675.309} displayCurrency="EUR" />
```
    
For the `en-US` locale, outputs `€6,944.67`. For the `de-DE` locale, outputs `€6.944,67`.

#### Rounding

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

## Why not just `toLocaleString()`?

TL;DR:

- Only formats strings, doesn't convert (no exchange rate data)
- Not supported in all browsers

With the right options, [`Number.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) can go pretty far when automatically formatting currencies in the user's preferred format. However, in my tests, the results fell flat when compared to `react-world-price`. 

`react-world-price` | `Number.prototype.toLocaleString`
------------------- | ---------------------------------

Under the hood, `react-world-price` uses `.toLocaleString()`, but without the `style` and `currency` options passed in.