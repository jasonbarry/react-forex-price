# Changelog

## 0.1.4 (2/11/18)

- Amount is formatted in base currency before API returns. If API cannot be reached, amount stays formatted in base currency.
- Added more language codes
- Enhanced demo
- Better compression of JSON dictionaries
- Added eslint

## 0.1.3 (2/8/18)

- Copying react and react-dom to peerDependencies

## 0.1.2 (2/8/18)

- Using local-storage instead of local-storage-fallback, since [browsers have supported native localStorage since 2009](https://caniuse.com/#search=localstorage)

## 0.1.1 (2/6/18)

- Better handling of when NaN is passed as an amount
- Calling Fixer over HTTPS when pulling exchange rates
- Added demo to repo

## 0.1.0 (2/4/18)

- Initial pre-release